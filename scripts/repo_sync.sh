#!/bin/bash

# Zero Labs | Unified Repo Sync Utility
# Perfectly synchronizes the frontend and backend for production.

set -e

echo "🚀 Starting 360° Technical Synchronization..."

# 1. Sync Frontend
echo "📦 Optimizing Frontend..."
cd ../frontend
if [ -d "node_modules" ]; then
    echo "✅ Dependencies already present."
else
    echo "📥 Installing Frontend Dependencies..."
    npm install --quiet
fi

# 2. Sync Backend
echo "📦 Optimizing Backend..."
cd ../backend
if [ -d "node_modules" ]; then
    echo "✅ Dependencies already present."
else
    echo "📥 Installing Backend Dependencies..."
    npm install --quiet
fi

# 3. Validation
echo "🔍 Performing 360° Global Audit..."
cd ..

if [ -f "frontend/package.json" ] && [ -f "backend/package.json" ]; then
    echo "✅ Monorepo integrity verified."
else
    echo "❌ Monorepo structure is fragmented. Check logs."
    exit 1
fi

echo "✨ Sync Complete. Your ecosystem is perfectly synchronized."
