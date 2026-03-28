// Zero Labs Unified Production Config
// This file synchronizes all static sub-projects (Chat, Vault, Auth) with your Render Backend.

window.ZERO_LABS_CONFIG = {
    // REPLACE THIS with your Render URL after deployment (e.g., "https://zero-labs-backend.onrender.com")
    API_URL: "https://portfolio-backend-brr6.onrender.com",
    
    // Automatic switching logic (Optional)
    getEffectiveApiUrl: function() {
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
            return "http://localhost:8080";
        }
        return this.API_URL;
    }
};
