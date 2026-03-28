# 🚀 Zero Labs | Unified Deployment Guide

This guide ensures your frontend and backend are perfectly environmentalized and ready for their global debut on Vercel and Render.

## 📦 Frontend: Vercel

1. **GitHub Import**: Select `Portfolio.git`.
2. **Root Directory**: Set to `frontend`.
3. **Framework Preset**: Next.js.
4. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: `https://your-render-app-url.onrender.com`
   - `NEXT_PUBLIC_PROFILE_ID`: `shriram_reddy`
5. **Deployment**: Automatic deployments on every `git push`.

## 📦 Backend: Render (Dockerized)

1. **New Web Service**: Select the `Portfolio.git` repository.
2. **Root Directory**: Set to `backend`.
3. **Runtime**: Docker.
4. **Environment Variables (CRITICAL)**:
   - `PORT`: `8080` (or leave as default).
   - `JWT_SECRET`: Any secure random string.
   - `RENDER_EXTERNAL_URL`: Your actual Render service URL.
   - `FIREBASE_SERVICE_ACCOUNT`: Copy the **entire JSON** from your Firebase Service Account key file.
5. **How to get Firebase Key**:
   - Go to **Firebase Console** > Project Settings > Service Accounts.
   - Click **Generate New Private Key**.
   - Open the `.json` file, copy everything, and paste it into the Render variable.
6. **Deployment**: Automatic deployments on every `git push`.

## 📦 Local Optimization (Optional)

Run the included `repo_sync.sh` to keep your environment perfectly synchronized:

```bash
cd scripts
./repo_sync.sh
```

---
© 2026 Shriram Reddy | Zero Labs
