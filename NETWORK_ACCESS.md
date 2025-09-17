# 📱 Mobile Network Access Guide

## 🔧 Setup Steps:

### 1. Find Your Computer's IP Address
```bash
# Windows Command Prompt
ipconfig

# Look for "IPv4 Address" under your network adapter
# Example: 192.168.1.100
```

### 2. Start Backend Server
```bash
cd Backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Start Frontend Server
```bash
cd Frontend
npm start -- --host 0.0.0.0
```

### 4. Access from Mobile
```
Frontend: http://YOUR_IP:3000
Backend API: http://YOUR_IP:8000

Example:
Frontend: http://192.168.1.100:3000
Backend: http://192.168.1.100:8000
```

## 🔍 Troubleshooting:

### If Login Still Fails:
1. **Check browser console** for CORS errors
2. **Verify both devices** are on same WiFi network
3. **Test backend directly**: Visit `http://YOUR_IP:8000` in mobile browser
4. **Check Windows Firewall** - may need to allow ports 3000 and 8000

### Common Issues:
- **Different WiFi networks** - Ensure both devices on same network
- **Firewall blocking** - Allow ports in Windows Firewall
- **Wrong IP address** - Use `ipconfig` to get correct IP
- **Backend not accessible** - Use `--host 0.0.0.0` flag

## 📱 Testing:
1. Open mobile browser
2. Go to `http://YOUR_IP:3000`
3. Try login with: `admin@123.com` / `admin123`
4. Should work without CORS errors