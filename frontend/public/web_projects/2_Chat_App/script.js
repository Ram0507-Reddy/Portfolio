/* ── DYNAMIC API CONFIG ── */
const API_URL = (window.ZERO_LABS_CONFIG) 
    ? window.ZERO_LABS_CONFIG.getEffectiveApiUrl() 
    : (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:8080' 
        : 'https://portfolio-backend-brr6.onrender.com');

const socket = io(API_URL);

// DOM Elements
const setupContainer = document.getElementById('setup-container');
const chatContainer = document.getElementById('chat-container');
const usernameInput = document.getElementById('username');
const roomInput = document.getElementById('room-id');
const joinBtn = document.getElementById('join-btn');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const attachBtn = document.getElementById('attach-btn');
const fileInput = document.getElementById('file-input');
const filePreview = document.getElementById('file-preview');
const messagesBox = document.getElementById('messages-box');
const usersList = document.getElementById('users-list');
const headerAva = document.getElementById('header-ava');
const roomDisplay = document.getElementById('room-name-display');
const connStatus = document.getElementById('conn-status');
const connDot = document.getElementById('conn-dot');
const statusLog = document.getElementById('status-log');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

let myUsername = '';
let myRoomId = '';
let pendingFile = null;

// Helper to get nice avatar URL using Dicebear
function getAvatarUrl(seedName) {
    return `https://api.dicebear.com/7.x/notionists/svg?seed=${seedName}&backgroundColor=e5e7eb`;
}

// System logging (sidebar + main chat if sys msg)
function sysLog(msg) {
    const sideDiv = document.createElement('div');
    sideDiv.style.marginBottom = '5px';
    sideDiv.innerText = `> ${msg}`;
    statusLog.appendChild(sideDiv);
    statusLog.scrollTop = statusLog.scrollHeight;
}

// Join Logic
joinBtn.onclick = () => {
    myUsername = usernameInput.value.trim() || 'Anonymous_' + Math.floor(Math.random() * 1000);
    myRoomId = roomInput.value.trim() || 'lobby';

    // UI Transitions
    setupContainer.style.display = 'none';
    chatContainer.style.display = 'flex';

    // Set Header Avatar & Room ID
    headerAva.innerHTML = `<img src="${getAvatarUrl(myUsername)}" style="width:100%; height:100%; border-radius:inherit;" />`;
    roomDisplay.innerText = `Room: ${myRoomId}`;

    // Update Connection State
    connStatus.innerText = "Securing link...";
    connDot.classList.add('active');

    sysLog(`Connecting to Room ${myRoomId}...`);

    // Emit connect event with room context
    socket.emit('join', { username: myUsername, roomId: myRoomId });
    messageInput.focus();
};

usernameInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') joinBtn.click(); });
roomInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') joinBtn.click(); });

// Sidebar Mobile Toggle
menuToggle.onclick = () => { sidebar.classList.toggle('active'); };

// --- Socket Events --- //

socket.on('online users', (users) => {
    usersList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div style="width:8px; height:8px; border-radius:50%; background:#fff; box-shadow:0 0 5px #fff;"></div>
            ${user}
        `;
        if (user === myUsername) li.style.color = '#fff';
        usersList.appendChild(li);
    });
    sysLog("Routing table synchronized.");
    connStatus.innerText = "Connected";
});

socket.on('chat history', (history) => {
    messagesBox.innerHTML = '';
    sysLog("Fetching room history...");
    history.forEach(msg => { renderMessage(msg, false); });
    messagesBox.scrollTop = messagesBox.scrollHeight;
});

socket.on('chat message', (msg) => {
    renderMessage(msg, true);
});

// --- File Handling --- //
attachBtn.onclick = () => fileInput.click();

fileInput.onchange = (e) => {
    pendingFile = e.target.files[0];
    if (pendingFile) {
        filePreview.style.display = 'block';
        filePreview.innerText = `Attached: ${pendingFile.name}`;
    } else {
        filePreview.style.display = 'none';
    }
    messageInput.focus();
};

// --- Send Messages --- //
sendBtn.onclick = async () => {
    const text = messageInput.value.trim();
    if (!text && !pendingFile) return;

    // Optional: Lock UI during high-latency file uploads
    if (pendingFile) sendBtn.disabled = true;

    try {
        let fileData = null;

        if (pendingFile) {
            sysLog(`Uploading payload: ${pendingFile.name}...`);
            const formData = new FormData();
            formData.append('file', pendingFile);

            const res = await fetch(`${API_URL}/api/chat/upload`, { method: 'POST', body: formData });
            if (!res.ok) throw new Error('Network response was not ok');
            const result = await res.json();

            fileData = {
                fileUrl: result.url,
                fileName: result.filename,
                fileType: result.mimetype
            };
            sysLog("Payload successfully uploaded.");
        }

        // Transmit message with optional file payload
        socket.emit('chat message', {
            text: text,
            ...fileData
        });

        // Reset inputs
        messageInput.value = '';
        fileInput.value = '';
        pendingFile = null;
        filePreview.style.display = 'none';
        messageInput.focus();

    } catch (err) {
        sysLog(`Error uploading: ${err.message}`);
        console.error(err);
    } finally {
        sendBtn.disabled = false;
    }
};

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});

// --- Render Chat Messages --- //
function renderMessage(msg, smoothScroll = true) {
    if (msg.type === 'system') {
        const sysDiv = document.createElement('div');
        sysDiv.className = 'sys-message';
        sysDiv.innerText = `${msg.text} [${msg.time}]`;
        messagesBox.appendChild(sysDiv);
    } else {
        const isMine = msg.user === myUsername;
        const row = document.createElement('div');
        row.className = `message-row ${isMine ? 'me' : 'peer'}`;

        const ava = document.createElement('div');
        ava.className = 'avatar';
        ava.style.backgroundImage = `url('${getAvatarUrl(msg.user)}')`;

        const content = document.createElement('div');
        content.className = 'message-content';

        const auth = document.createElement('div');
        auth.className = 'message-author';
        auth.innerText = isMine ? 'You' : msg.user;

        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        // Check for File Attachment Rendering
        if (msg.fileUrl) {
            const attachDiv = document.createElement('div');
            attachDiv.className = 'chat-attachment';
            if (msg.fileType.startsWith('image/')) {
                attachDiv.innerHTML = `<img src="${msg.fileUrl}" alt="Attached Image" />`;
            } else if (msg.fileType.startsWith('video/')) {
                attachDiv.innerHTML = `<video controls src="${msg.fileUrl}"></video>`;
            } else {
                attachDiv.innerHTML = `
                    <a href="${msg.fileUrl}" target="_blank" download class="chat-file-link">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        ${msg.fileName}
                    </a>
                `;
            }
            bubble.appendChild(attachDiv);
        }

        // Render Text if present
        if (msg.text) {
            const txt = document.createElement('div');
            txt.innerText = msg.text;
            bubble.appendChild(txt);
        }

        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.innerText = msg.time;

        content.appendChild(auth);
        content.appendChild(bubble);
        content.appendChild(timeDiv);
        row.appendChild(ava);
        row.appendChild(content);

        messagesBox.appendChild(row);
    }

    if (smoothScroll) {
        messagesBox.scrollTo({ top: messagesBox.scrollHeight, behavior: 'smooth' });
    }
}
