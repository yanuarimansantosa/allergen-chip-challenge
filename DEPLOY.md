# 🚀 Allergen Chip Challenge - Complete Deployment Guide

## Overview

This guide covers deploying both:
1. **Flask ML API** to your VPS (allergen-chip-challenge.medinovatech.com)
2. **Next.js Frontend** to your VPS

## 🔧 Prerequisites

- VPS access: `ssh root@vps.medinovatech.com`
- Domain DNS: `allergen-chip-challenge.medinovatech.com` → VPS IP
- Winning models from AllergenChip repository
- Node.js 18+ and npm installed locally

---

## 📋 Part 1: Deploy Flask API (Backend)

### Step 1.1: Prepare Deployment Files

Copy the deployment script to your VPS:

```bash
# From your local machine
scp C:\tmp\vps-deploy.sh root@vps.medinovatech.com:/tmp/
```

### Step 1.2: Run Deployment Script

```bash
# SSH into VPS
ssh root@vps.medinovatech.com

# Make executable and run
chmod +x /tmp/vps-deploy.sh
/tmp/vps-deploy.sh
```

**What the script does:**
- Installs Python, Nginx, Certbot, Git
- Clones AllergenChip repository
- Installs ML dependencies (Flask, LightGBM, CatBoost, XGBoost)
- Configures Nginx reverse proxy
- Sets up SSL with Let's Encrypt
- Creates systemd service for auto-restart

**Estimated time:** 5-10 minutes

### Step 1.3: Verify API Deployment

```bash
# Check service status
systemctl status allergen-chip-challenge

# Check health endpoint
curl https://allergen-chip-challenge.medinovatech.com/health

# View logs if needed
journalctl -u allergen-chip-challenge -f
```

Expected response:
```json
{
  "status": "healthy",
  "models": ["1st", "2nd", "3rd"],
  "timestamp": "2024-05-12T10:30:00"
}
```

---

## 🎨 Part 2: Deploy Next.js Frontend

### Step 2.1: Prepare Environment Variables

Create `.env.local` in your Next.js project root:

```bash
# Windows PowerShell
echo "NEXT_PUBLIC_API_URL=https://allergen-chip-challenge.medinovatech.com" > .env.local
```

Or manually create the file with:
```
NEXT_PUBLIC_API_URL=https://allergen-chip-challenge.medinovatech.com
```

### Step 2.2: Build Frontend

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test locally (optional)
npm start
# Visit: http://localhost:3000
```

### Step 2.3: Deploy to VPS

Create deployment archive:

```bash
# Create tar.gz with all necessary files
tar -czf allergen-frontend.tar.gz .next package.json package-lock.json public

# Upload to VPS
scp allergen-frontend.tar.gz root@vps.medinovatech.com:/tmp/
```

### Step 2.4: Extract and Configure on VPS

```bash
# SSH to VPS
ssh root@vps.medinovatech.com

# Extract
mkdir -p /var/www/allergen-frontend
cd /var/www/allergen-frontend
tar -xzf /tmp/allergen-frontend.tar.gz

# Install production dependencies
npm install --production

# Set permissions
chown -R www-data:www-data /var/www/allergen-frontend
```

### Step 2.5: Create Nginx Config for Frontend

On VPS, create `/etc/nginx/sites-available/allergen-frontend`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name allergen-chip-challenge.medinovatech.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name allergen-chip-challenge.medinovatech.com;

    ssl_certificate /etc/letsencrypt/live/allergen-chip-challenge.medinovatech.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/allergen-chip-challenge.medinovatech.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    access_log /var/log/nginx/allergen-frontend-access.log combined;
    error_log /var/log/nginx/allergen-frontend-error.log;

    # Frontend static files
    location / {
        root /var/www/allergen-frontend/.next/standalone/public;
        try_files $uri $uri/ /404.html;
    }

    # Next.js server (for dynamic routes)
    location /_next {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API proxy to Flask
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Health check
    location /health {
        proxy_pass http://127.0.0.1:5000;
        access_log off;
    }
}
```

Enable the config:
```bash
ln -s /etc/nginx/sites-available/allergen-frontend /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Step 2.6: Run Frontend with PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start Next.js app
cd /var/www/allergen-frontend
pm2 start "npm start" --name allergen-frontend

# Make PM2 auto-restart on reboot
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs allergen-frontend
```

---

## ✅ Verify Complete Deployment

Test the entire application:

```bash
# Check both services running
systemctl status allergen-chip-challenge
pm2 status

# Test health endpoints
curl https://allergen-chip-challenge.medinovatech.com/health
curl https://allergen-chip-challenge.medinovatech.com/api/models

# Test frontend
curl -I https://allergen-chip-challenge.medinovatech.com/
```

Expected:
- Flask API returns health check ✅
- Next.js frontend loads at subdomain ✅
- Prediction form displays ✅

---

## 🔄 Update Workflow

### Updating Flask API

```bash
# SSH to VPS
ssh root@vps.medinovatech.com

# Update models
cd /var/www/allergen-chip-challenge/models
# Replace model files

# Restart service
systemctl restart allergen-chip-challenge

# Check logs
journalctl -u allergen-chip-challenge -f
```

### Updating Frontend

```bash
# Build locally
npm run build
tar -czf allergen-frontend.tar.gz .next package.json package-lock.json public

# Deploy
scp allergen-frontend.tar.gz root@vps.medinovatech.com:/tmp/

# On VPS
ssh root@vps.medinovatech.com
cd /var/www/allergen-frontend
tar -xzf /tmp/allergen-frontend.tar.gz
npm install --production
pm2 restart allergen-frontend

# Verify
pm2 logs allergen-frontend
```

---

## 📊 Monitoring

### Check API Logs

```bash
journalctl -u allergen-chip-challenge -f
journalctl -u allergen-chip-challenge --since "1 hour ago"
journalctl -u allergen-chip-challenge -p err
```

### Check Frontend Logs

```bash
pm2 logs allergen-frontend
pm2 logs allergen-frontend --lines 100
```

### Check Nginx Logs

```bash
tail -f /var/log/nginx/allergen-frontend-access.log
tail -f /var/log/nginx/allergen-frontend-error.log
```

### System Resources

```bash
# Check disk space
df -h /var/www

# Check memory
free -h

# Check running processes
ps aux | grep python
ps aux | grep node
```

---

## 🐛 Troubleshooting

### API Not Responding

```bash
# Check service
systemctl status allergen-chip-challenge

# Check if port 5000 is listening
netstat -tlnp | grep 5000

# Check Python errors
journalctl -u allergen-chip-challenge -n 50

# Manually test Python
python3 -c "import flask, lightgbm, catboost, xgboost; print('✅ Imports OK')"
```

### Frontend Not Loading

```bash
# Check PM2 status
pm2 status

# Check Node process
ps aux | grep node

# Check port 3000
netstat -tlnp | grep 3000

# View logs
pm2 logs allergen-frontend --lines 50
```

### SSL Certificate Issues

```bash
# Check certificate validity
certbot certificates

# Renewal (automatic, but can force)
certbot renew --force-renewal

# Check certificate expiry
openssl x509 -in /etc/letsencrypt/live/allergen-chip-challenge.medinovatech.com/fullchain.pem -text -noout | grep -A 2 "Validity"
```

### Nginx Configuration Error

```bash
# Test config syntax
nginx -t

# Reload if OK
systemctl reload nginx

# Check error log
tail -f /var/log/nginx/allergen-frontend-error.log
```

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| View API logs | `journalctl -u allergen-chip-challenge -f` |
| View Frontend logs | `pm2 logs allergen-frontend` |
| Restart API | `systemctl restart allergen-chip-challenge` |
| Restart Frontend | `pm2 restart allergen-frontend` |
| Check Health | `curl https://allergen-chip-challenge.medinovatech.com/health` |
| View Status | `systemctl status allergen-chip-challenge` |
| View Processes | `pm2 status` |

---

## 🎯 Summary

✅ **Deployed:**
- Flask ML API serving predictions
- Next.js frontend with prediction form
- Nginx reverse proxy routing traffic
- SSL/TLS with Let's Encrypt
- Auto-restart services with systemd/PM2

🌐 **Access:**
- Main app: https://allergen-chip-challenge.medinovatech.com
- API: https://allergen-chip-challenge.medinovatech.com/api/predict
- Health: https://allergen-chip-challenge.medinovatech.com/health

---

**Deployment created:** 2024-05-12
**Last updated:** 2024-05-12
