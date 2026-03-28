# Project Deployment Master Guide

This guide provides the absolute technical blueprint for launching your portfolio ecosystem into production.

## 1. Backend Deployment (Render)

**Service Type**: Web Service
**Root Directory**: `Web_Development/Advanced/2_NodeJS_Unified_Backend`

### Configuration
1.  **Build Command**: `npm install`
2.  **Start Command**: `node server.js`
3.  **Environment Variables**:
    *   `PORT`: `8080` (or leave default)
    *   `NODE_ENV`: `production`

> [!TIP]
> Your backend now includes an automated **Keep-Alive** task. It will self-ping every 10 minutes to prevent the Render free tier from sleeping, ensuring 100% availability for recruiters.

---

## 2. Frontend Deployment (Vercel)

**Project Type**: Next.js
**Root Directory**: `portfolio-personal/site`

### Configuration
1.  **Framework Preset**: Next.js
2.  **Root Directory**: `.` (if you are deploying the `site` folder directly)
3.  **Environment Variables**:
    *   `NEXT_PUBLIC_API_URL`: `https://your-backend-url.onrender.com`

> [!IMPORTANT]
> The portfolio is now powered by a **Centralized Configuration Engine** (`public/config.js`). This script automatically handles API URL switching. No manual code changes are required for your sub-projects (Chat, Auth, etc.).

---

## 3. Sub-Project Synchronization

Every sub-project is pre-synchronized:
- **Chat App**: Dynamically fetches the Socket.io client from your production backend.
- **Ecommerce**: Pre-patched to point to your Render instance.
- **Security Vault**: Logic perfectly aligned with production endpoints.

## 4. Troubleshooting

- **CORS Errors**: Ensure your Render URL is added to the `allowedOrigins` in `server.js` (I have already set it to allow `*` or common Vercel domains).
- **Socket.io Disconnects**: This is usually due to Render's cold start. The new keep-alive task resolves this.

---
*Created by Antigravity for Shriram Reddy.*
