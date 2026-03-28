const express = require('express');
const http = require('http');
const https = require('https');
const { Server } = require("socket.io");
const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- FIREBASE INITIALIZATION ---
try {
    const rawVal = process.env.FIREBASE_SERVICE_ACCOUNT;
    const serviceAccount = rawVal ? JSON.parse(rawVal) : null;

    if (serviceAccount) {
        // Fix for private key newlines in different environments
        if (serviceAccount.private_key) {
            serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
        }

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            storageBucket: `${serviceAccount.project_id}.appspot.com`
        });
        console.log("✅ Firebase Admin Initialized (Production Mode)");
    } else {
        console.warn("⚠️ FIREBASE_SERVICE_ACCOUNT not found. Running in ephemeral local mode.");
    }
} catch (error) {
    console.error("❌ Firebase Init Failed:", error.message);
}

const db = admin.apps.length ? admin.firestore() : null;
const bucket = admin.apps.length ? admin.storage().bucket() : null;

const JWT_SECRET = process.env.JWT_SECRET || 'zero-labs-global-secret-2026';

// --- SHARED MULTER CONFIG (Memory Storage for Firebase) ---
const upload = multer({ 
    storage: multer.memoryStorage(), 
    limits: { fileSize: 50 * 1024 * 1024 } 
});

// --- 1. AUTH SUBSYSTEM ---
const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!db) return res.status(500).json({ error: "Database Offline" });

        const userRef = db.collection('users').doc(username);
        const doc = await userRef.get();
        if (doc.exists) return res.status(400).json({ error: "User exists" });
        
        const hashedPassword = await bcrypt.hash(password, 12);
        await userRef.set({ username, password: hashedPassword, createdAt: admin.firestore.FieldValue.serverTimestamp() });
        res.status(201).json({ message: "Account secured." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!db) return res.status(500).json({ error: "Database Offline" });

        const userRef = db.collection('users').doc(username);
        const doc = await userRef.get();
        if (!doc.exists || !(await bcrypt.compare(password, doc.data().password))) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }
        const token = jwt.sign({ username: doc.data().username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, username: doc.data().username });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use('/api/auth', authRouter);

// --- 2. CHAT SUBSYSTEM ---
const chatRouter = express.Router();

chatRouter.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file || !bucket) return res.status(400).json({ error: 'Payload error' });
    
    const fileName = `chat/${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(fileName);
    
    await file.save(req.file.buffer, { contentType: req.file.mimetype });
    await file.makePublic();
    
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    res.json({ url: publicUrl, filename: req.file.originalname });
});

app.use('/api/chat', chatRouter);

io.on('connection', (socket) => {
    socket.on('join', async (data) => {
        const { username, roomId } = data;
        socket.join(roomId);
        
        if (db) {
            const historySnap = await db.collection('messages')
                .where('roomId', '==', roomId)
                .orderBy('timestamp', 'asc')
                .limit(50)
                .get();
            const history = historySnap.docs.map(d => d.data());
            socket.emit('chat history', history);
        }
    });

    socket.on('chat message', async (data) => {
        const msg = { ...data, timestamp: admin.firestore.FieldValue.serverTimestamp() };
        if (db) await db.collection('messages').add(msg);
        io.to(data.roomId).emit('chat message', { ...data, time: new Date().toLocaleTimeString() }); 
    });
});

// --- 3. SECURE VAULT SUBSYSTEM ---
const vaultRouter = express.Router();

vaultRouter.post('/upload', upload.single('document'), async (req, res) => {
    try {
        const { password } = req.body;
        if (!req.file || !password || !bucket || !db) return res.status(400).json({ error: "Payload error" });
        
        const fileName = `vault/${Date.now()}-${req.file.originalname}`;
        const blob = bucket.file(fileName);
        await blob.save(req.file.buffer, { contentType: req.file.mimetype });

        const hashedPassword = await bcrypt.hash(password, 10);
        const vaultId = Date.now().toString();
        
        await db.collection('vault').doc(vaultId).set({
            fileName,
            originalName: req.file.originalname,
            password: hashedPassword,
            size: req.file.size
        });
        
        res.json({ fileId: vaultId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

vaultRouter.post('/download', async (req, res) => {
    try {
        const { fileId, password } = req.body;
        if (!db || !bucket) return res.status(500).json({ error: "Storage Offline" });

        const doc = await db.collection('vault').doc(fileId).get();
        if (!doc.exists || !(await bcrypt.compare(password, doc.data().password))) {
            return res.status(401).json({ error: "Vault access denied" });
        }

        const fileData = doc.data();
        const file = bucket.file(fileData.fileName);
        const [downloadUrl] = await file.getSignedUrl({ action: 'read', expires: Date.now() + 15 * 60 * 1000 });
        
        res.json({ url: downloadUrl, filename: fileData.originalName });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use('/api/vault', vaultRouter);

// Health Check
app.get('/health', (req, res) => res.send('Zero Labs Cloud Status: OPERATIONAL'));

// --- RENDER KEEP-ALIVE ---
const SELF_URL = process.env.RENDER_EXTERNAL_URL;
if (SELF_URL) {
    const requester = SELF_URL.startsWith('https') ? https : http;
    setInterval(() => {
        requester.get(`${SELF_URL}/health`, (res) => {
            console.log(`[Keep-Alive] Heartbeat: ${res.statusCode}`);
        }).on('error', (err) => {
            console.error(`[Keep-Alive] Failed: ${err.message}`);
        });
    }, 14 * 60 * 1000);
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`  ZERO LABS UNIFIED BACKEND LIVE`);
    console.log(`  Node: ${process.version} | Port: ${PORT}`);
    console.log(`  Persistence: ${db ? 'FIREBASE CLOUD' : 'LOCAL (EPHEMERAL)'}`);
    console.log(`========================================\n`);
});

module.exports = { app, server, io };

