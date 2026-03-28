/* ══ ZERO LABS SPLIT AUTH — script.js ══ */

document.addEventListener('DOMContentLoaded', () => {

    const auth = document.getElementById('auth');

    /* ── SLIDE TOGGLE ── */
    function goSignup() { auth.classList.add('signup'); }
    function goLogin() { auth.classList.remove('signup'); clearAll(); }

    document.getElementById('go-signup').addEventListener('click', goSignup);
    document.getElementById('go-login').addEventListener('click', goLogin);


    /* ── EYE TOGGLES ── */
    document.querySelectorAll('.eye').forEach(btn => {
        btn.addEventListener('click', () => {
            const inp = document.getElementById(btn.dataset.for);
            const show = btn.querySelector('.ico-show');
            const hide = btn.querySelector('.ico-hide');
            if (inp.type === 'password') {
                inp.type = 'text';
                show.style.display = 'none'; hide.style.display = 'block';
            } else {
                inp.type = 'password';
                show.style.display = 'block'; hide.style.display = 'none';
            }
        });
    });


    /* ── PASSWORD STRENGTH ── */
    const sPw = document.getElementById('s-pw');
    const fill = document.getElementById('str-fill');
    const lbl = document.getElementById('str-lbl');
    if (sPw && fill) {
        sPw.addEventListener('input', () => {
            const v = sPw.value;
            let s = 0;
            if (v.length >= 8) s++;
            if (v.length >= 12) s++;
            if (/[A-Z]/.test(v)) s++;
            if (/[0-9]/.test(v)) s++;
            if (/[^A-Za-z0-9]/.test(v)) s++;
            const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
            const colors = ['', '#f87171', '#fbbf24', '#fbbf24', '#6ee7b7', '#6ee7b7'];
            fill.style.width = (s * 20) + '%';
            fill.style.background = colors[s] || 'transparent';
            lbl.textContent = labels[s] || '';
            lbl.style.color = colors[s] || '';
        });
    }


    /* ── FORGOT PASSWORD ── */
    document.getElementById('forgot').addEventListener('click', () => {
        showAlert('l-alert', 'Reset link sent — check your inbox.', 'ok');
    });


    /* ── SOCIAL BUTTONS ── */
    document.querySelectorAll('.btn-social').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.closest('.form-box').id === 'login-box' ? 'l-alert' : 's-alert';
            showAlert(id, `Connecting to ${btn.dataset.p}… (demo only)`, 'ok');
            setTimeout(() => clearAlert(id), 3000);
        });
    });


    /* ── DYNAMIC API CONFIG ── */
    const API_URL = (window.ZERO_LABS_CONFIG) 
        ? window.ZERO_LABS_CONFIG.getEffectiveApiUrl() 
        : (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? 'http://localhost:8080' 
            : 'https://zero-labs-backend.onrender.com');

    /* ── LOGIN SUBMIT ── */
    document.getElementById('form-login').addEventListener('submit', async e => {
        e.preventDefault(); clearAll();
        const username = val('l-email'), password = val('l-pw');
        let ok = true;
        if (!username) { err('l-email', 'l-email-e', 'Enter username.'); ok = false; }
        if (!password || password.length < 6) { err('l-pw', 'l-pw-e', 'Min. 6 characters.'); ok = false; }
        if (!ok) return;

        const btn = e.target.querySelector('.btn-primary');
        await loading(btn, 1000);

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('zero_token', data.token);
                good('l-email'); good('l-pw');
                showAlert('l-alert', '✓ Signed in! Accessing secure link…', 'ok');
            } else {
                err('l-email', 'l-email-e', data.error || 'Login failed');
            }
        } catch (err) {
            showAlert('l-alert', 'Neural link disrupted (Backend Offline)', 'error');
        }
    });


    /* ── SIGNUP SUBMIT ── */
    document.getElementById('form-signup').addEventListener('submit', async e => {
        e.preventDefault(); clearAll();
        const username = val('s-fn'), password = val('s-pw');
        let ok = true;
        if (!username) { err('s-fn', 's-fn-e', 'Required.'); ok = false; }
        if (!password || password.length < 8) { err('s-pw', 's-pw-e', 'Min. 8 characters.'); ok = false; }
        if (!ok) return;

        const btn = e.target.querySelector('.btn-primary');
        await loading(btn, 1500);

        try {
            const res = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (res.ok) {
                showAlert('s-alert', `✓ Account Secured! You can now login.`, 'ok');
                e.target.reset();
                if (fill) { fill.style.width = '0%'; lbl.textContent = ''; }
            } else {
                err('s-fn', 's-fn-e', data.error || 'Signup failed');
            }
        } catch (err) {
            showAlert('s-alert', 'Backend Offline', 'error');
        }
    });


    /* ── HELPERS ── */
    function val(id) { return document.getElementById(id)?.value.trim() || ''; }
    function isEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

    function err(inputId, errId, msg) {
        const i = document.getElementById(inputId);
        const e = document.getElementById(errId);
        if (i) i.classList.add('bad');
        if (e) e.textContent = msg;
    }

    function good(inputId) {
        const i = document.getElementById(inputId);
        if (i) { i.classList.remove('bad'); i.classList.add('good'); }
    }

    function clearAll() {
        document.querySelectorAll('.err').forEach(e => e.textContent = '');
        document.querySelectorAll('input.bad, input.good').forEach(i => { i.classList.remove('bad', 'good'); });
        ['l-alert', 's-alert'].forEach(id => clearAlert(id));
    }

    function showAlert(id, msg, cls) {
        const b = document.getElementById(id);
        if (!b) return;
        b.textContent = msg; b.className = `alert show ${cls}`;
    }

    function clearAlert(id) {
        const b = document.getElementById(id);
        if (b) b.className = 'alert';
    }

    async function loading(btn, ms) {
        btn.disabled = true; btn.classList.add('loading');
        await new Promise(r => setTimeout(r, ms));
        btn.disabled = false; btn.classList.remove('loading');
    }

});
