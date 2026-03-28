document.addEventListener('DOMContentLoaded', () => {
    /* ── DYNAMIC API CONFIG ── */
    const API_URL = (window.ZERO_LABS_CONFIG) 
        ? window.ZERO_LABS_CONFIG.getEffectiveApiUrl() 
        : (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? 'http://localhost:8080' 
            : 'https://zero-labs-backend.onrender.com');

    // UI Interaction
    const tabUpload = document.getElementById('tab-upload');
    const tabDownload = document.getElementById('tab-download');
    const secUpload = document.getElementById('section-upload');
    const secDownload = document.getElementById('section-download');

    tabUpload.onclick = () => {
        tabUpload.classList.add('active'); tabDownload.classList.remove('active');
        secUpload.classList.add('active'); secDownload.classList.remove('active');
    };
    tabDownload.onclick = () => {
        tabDownload.classList.add('active'); tabUpload.classList.remove('active');
        secDownload.classList.add('active'); secUpload.classList.remove('active');
    };

    // File Drop UI
    const fileInput = document.getElementById('file-input');
    const fakeBtn = document.querySelector('.fake-btn');
    const dropArea = document.getElementById('drop-area');

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            fakeBtn.innerText = e.target.files[0].name;
            dropArea.style.borderColor = '#4ade80';
        } else {
            fakeBtn.innerText = 'Choose secure payload';
            dropArea.style.borderColor = '#555';
        }
    });

    // Upload Logic
    document.getElementById('upload-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const file = fileInput.files[0];
        const key = document.getElementById('encrypt-key').value;
        const btn = document.getElementById('upload-btn');
        const feedback = document.getElementById('upload-feedback');

        if (!file || !key) return;

        btn.innerText = 'ENCRYPTING & UPLOADING...';

        const formData = new FormData();
        formData.append('document', file);
        formData.append('password', key);

        try {
            const res = await fetch(`${API_URL}/api/vault/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (res.ok) {
                feedback.className = 'feedback success';
                feedback.innerText = "Payload accepted.";

                // Show modal with signature
                document.getElementById('signature-output').innerText = data.fileId;
                document.getElementById('result-modal').classList.remove('hidden');

                // Reset form
                fileInput.value = '';
                document.getElementById('encrypt-key').value = '';
                fakeBtn.innerText = 'Choose secure payload';
                dropArea.style.borderColor = '#555';
            } else {
                feedback.className = 'feedback error';
                feedback.innerText = data.error || 'Encryption failed.';
            }
        } catch (e) {
            feedback.className = 'feedback error';
            feedback.innerText = 'Neural link disrupted.';
        }
        btn.innerText = 'LOCK PAYLOAD';
    });

    // Modal Close
    document.getElementById('close-modal').onclick = () => {
        document.getElementById('result-modal').classList.add('hidden');
        tabDownload.click(); // Auto switch to download to test
    };

    // Download Logic (Sending POST instead of GET to allow body)
    document.getElementById('download-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const fileId = document.getElementById('file-id').value.trim();
        const key = document.getElementById('decrypt-key').value;
        const btn = document.getElementById('download-btn');
        const feedback = document.getElementById('download-feedback');

        if (!fileId || !key) return;

        btn.innerText = 'DECRYPTING...';

        try {
            const res = await fetch(`${API_URL}/api/vault/download`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileId: fileId, password: key })
            });

            if (res.ok) {
                // If OK to download, we need to handle the blob
                const blob = await res.blob();
                // Get filename from header if possible, else use ID
                const disposition = res.headers.get('Content-Disposition');
                let filename = fileId;
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
                }

                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                link.remove();

                feedback.className = 'feedback success';
                feedback.innerText = "Payload fetched and decrypted successfully.";
            } else {
                const data = await res.json();
                feedback.className = 'feedback error';
                feedback.innerText = data.error || "Decryption failed.";
            }
        } catch (err) {
            feedback.className = 'feedback error';
            feedback.innerText = 'Network architecture error.';
        }
        btn.innerText = 'FETCH PAYLOAD';
    });
});
