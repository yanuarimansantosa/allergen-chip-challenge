#!/bin/bash

# Allergen Chip Challenge Deployment Script
# Deploy to allergen-chip-challenge.medinovatech.com

set -e

echo "🚀 Starting deployment to allergen-chip-challenge.medinovatech.com..."

# Build
echo "📦 Building Next.js application..."
npm run build

# Create deployment archive
echo "📦 Creating deployment package..."
tar -czf build.tar.gz .next package.json package-lock.json public

# Deploy to VPS
echo "📤 Uploading to VPS..."
scp build.tar.gz root@allergen-chip-challenge.medinovatech.com:/var/www/allergen/

# Extract and restart on VPS
echo "🔄 Extracting and restarting service..."
ssh root@allergen-chip-challenge.medinovatech.com << 'EOF'
  cd /var/www/allergen
  tar -xzf build.tar.gz
  npm install --production
  systemctl restart allergen-chip-challenge
  echo "✅ Deployment successful!"
EOF

# Cleanup
rm build.tar.gz

echo "✅ Deployment completed successfully!"
echo "🌐 Visit: https://allergen-chip-challenge.medinovatech.com"
