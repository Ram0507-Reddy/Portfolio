const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- SHARED STORAGE & DATABASE ---
const STORAGE_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(STORAGE_DIR, 'uploads');
const DB_FILE = path.join(STORAGE_DIR, 'database.json');

fs.ensureDirSync(UPLOADS_DIR);
if (!fs.existsSync(DB_FILE)) {
    fs.writeJsonSync(DB_FILE, { users: [], chatHistory: [], vaultFiles: [] });
}

const getDB = () => fs.readJsonSync(DB_FILE);
const saveDB = (data) => fs.writeJsonSync(DB_FILE, data, { spaces: 2 });

const JWT_SECRET = process.env.JWT_SECRET || 'zero-labs-global-secret-2026';

// --- SHARED MULTER CONFIG ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
    }
});
const upload = multer({ storage: storage, limits: { fileSize: 100 * 1024 * 1024 } });

// --- 1. AUTH SUBSYSTEM ---
const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const db = getDB();
    if (db.users.find(u => u.username === username)) return res.status(400).json({ error: "User exists" });
    
    const hashedPassword = await bcrypt.hash(password, 12);
    db.users.push({ id: Date.now(), username, password: hashedPassword });
    saveDB(db);
    res.status(201).json({ message: "Account secured." });
});

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = getDB();
    const user = db.users.find(u => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, username: user.username });
});

app.use('/api/auth', authRouter);

// --- 2. CHAT SUBSYSTEM ---
const chatRouter = express.Router();

chatRouter.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No payload' });
    res.json({ url: `/api/vault/raw/${req.file.filename}`, filename: req.file.originalname });
});

app.use('/api/chat', chatRouter);

const rooms = {};
io.on('connection', (socket) => {
    socket.on('join', (data) => {
        const { username, roomId } = data;
        socket.join(roomId);
        if (!rooms[roomId]) rooms[roomId] = { users: {}, history: [] };
        rooms[roomId].users[socket.id] = username;
        socket.emit('chat history', rooms[roomId].history);
        io.to(roomId).emit('online users', Object.values(rooms[roomId].users));
    });

    socket.on('chat message', (data) => {
        const msg = { ...data, time: new Date().toLocaleTimeString() };
        // Simple history persistence in-memory for this run
        // In production, we'd save to the DB_FILE
        io.emit('chat message', msg); 
    });

    socket.on('disconnect', () => {
        // Cleanup logic simplified for unified server
    });
});

// --- 3. SECURE VAULT SUBSYSTEM ---
const vaultRouter = express.Router();

vaultRouter.post('/upload', upload.single('document'), async (req, res) => {
    const { password } = req.body;
    if (!req.file || !password) return res.status(400).json({ error: "Incomplete vault payload" });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const db = getDB();
    const entry = {
        id: req.file.filename,
        originalName: req.file.originalname,
        password: hashedPassword,
        size: req.file.size
    };
    db.vaultFiles.push(entry);
    saveDB(db);
    res.json({ fileId: entry.id });
});

vaultRouter.post('/download', async (req, res) => {
    const { fileId, password } = req.body;
    const db = getDB();
    const entry = db.vaultFiles.find(f => f.id === fileId);
    if (!entry || !(await bcrypt.compare(password, entry.password))) {
        return res.status(401).json({ error: "Vault access denied" });
    }
    res.download(path.join(UPLOADS_DIR, entry.id), entry.originalName);
});

// Raw access for chat files
vaultRouter.get('/raw/:id', (req, res) => {
    res.sendFile(path.join(UPLOADS_DIR, req.params.id));
});

app.use('/api/vault', vaultRouter);

// Health Check
app.get('/health', (req, res) => res.send('Zero Labs Cloud Status: OPERATIONAL'));

// --- RENDER KEEP-ALIVE (Free Tier Persistence) ---
// Self-ping to prevent Render service from sleeping (every 14 minutes)
const SELF_URL = process.env.RENDER_EXTERNAL_URL;
if (SELF_URL) {
    setInterval(() => {
        http.get(`${SELF_URL}/health`, (res) => {
            console.log(`[Keep-Alive] Heartbeat pulse sent: ${res.statusCode}`);
        }).on('error', (err) => {
            console.error(`[Keep-Alive] Heartbeat failed: ${err.message}`);
        });
    }, 14 * 60 * 1000); // 14 minutes
}

const PORT = process.env.PORT || 8080;
if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`\n========================================`);
        console.log(`  ZERO LABS UNIFIED BACKEND LIVE`);
        console.log(`  Listening on port: ${PORT}`);
        console.log(`  Keep-Alive Context: ${SELF_URL ? 'ACTIVE' : 'INACTIVE (Local)'}`);
        console.log(`========================================\n`);
    });
}

// Export for standalone server
module.exports = { app, server, io };

