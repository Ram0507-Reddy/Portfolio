# Zero Labs Unified Free Backend (Render.com)

This is the consolidated, high-performance Node.js backend for your Web Development portfolio. It is designed to run 100% for free on Render.com using the included Dockerfile.

## Features
- **Auth Subsystem**: Secure JWT-based identity at `/api/auth`
- **Chat Subsystem**: Real-time Socket.io messaging at `/api/chat`
- **Vault Subsystem**: Encrypted file storage at `/api/vault`

## 🚀 Easy Free Deployment (Render.com)
To go live for free, follow these 3 steps:

### Step 1: Push to GitHub
Run these commands in your `zero-labs-backend` folder to upload your code:

```bash
git init
git add .
git commit -m "Initial commit of unified backend"
git branch -M main
# Add your own GitHub repo here:
# git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
# git push -u origin main
```

### Step 2: Connect to Render
1. Go to [Dashboard.render.com](https://dashboard.render.com).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository.
4. Render will automatically detect the **Dockerfile** and set the environment.
5. Set `Environment Variables` (optional):
   - `JWT_SECRET`: Any long random string for security.

### Step 3: Use your Cloud URL
Once deployed, Render will give you a URL like `https://zero-labs-api.onrender.com`. Use this in your Portfolio's environment variables.

## Local Development
1. `npm install`
2. `npm start`
3. Access at: `http://localhost:8080`
