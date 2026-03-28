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
3. **Runtime**: Docker (Automatically detected from `backend/Dockerfile`).
4. **Environment**:
   - Port: `5000` (Make sure your `backend/index.js` listens on `process.env.PORT || 5000`).
5. **Connect**: Link to your Firebase/Firestore service account if needed.

## 📦 Local Optimization (Optional)

Run the included `repo_sync.sh` to keep your environment perfectly synchronized:

```bash
cd scripts
./repo_sync.sh
```

---
© 2026 Shriram Reddy | Zero Labs
