# QGenz Deployment Guide

This guide covers multiple deployment options for your QGenz application.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Frontend) + Railway (Backend) - Recommended

#### Frontend Deployment (Vercel)

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your `QGenz` repository
   - Set the root directory to `Frontend`

2. **Configure Build Settings:**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables:**
   - Add `VITE_API_URL` pointing to your backend URL

4. **Deploy:**
   - Click "Deploy"
   - Your frontend will be live at `https://your-app.vercel.app`

#### Backend Deployment (Railway)

1. **Connect to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `QGenz` repository
   - Set the root directory to `Backend`

2. **Environment Variables:**
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   SENDGRID_API_KEY=your_sendgrid_api_key
   GROQ_API_KEY=your_groq_api_key
   ```

3. **Deploy:**
   - Railway will automatically detect the Node.js app
   - Your backend will be live at `https://your-app.railway.app`

### Option 2: Render (Full Stack)

1. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Sign up/Login with GitHub
   - Click "New +" → "Web Service"
   - Connect your `QGenz` repository

2. **Configure Service:**
   - Name: `qgenz-backend`
   - Root Directory: `Backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables:**
   - Add all the same environment variables as above

4. **Deploy Frontend:**
   - Create another Web Service
   - Root Directory: `Frontend`
   - Build Command: `npm run build`
   - Start Command: `npm run preview`

### Option 3: Heroku (Legacy but Reliable)

#### Backend on Heroku

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku App:**
   ```bash
   cd Backend
   heroku create qgenz-backend
   ```

3. **Set Environment Variables:**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_jwt_secret
   heroku config:set GOOGLE_CLIENT_ID=your_google_oauth_client_id
   heroku config:set GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   heroku config:set SENDGRID_API_KEY=your_sendgrid_api_key
   heroku config:set GROQ_API_KEY=your_groq_api_key
   ```

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

#### Frontend on Vercel (Same as Option 1)

## 🔧 Required Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/qgenz
JWT_SECRET=your_super_secret_jwt_key_here
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
SENDGRID_API_KEY=your_sendgrid_api_key
GROQ_API_KEY=your_groq_api_key
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.railway.app
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account:**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create free account
   - Create new cluster

2. **Configure Database:**
   - Create database named `qgenz`
   - Create collections: `users`, `support_messages`, `feedback`, `activities`, `stats`, `resumes`

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

## 🔑 API Keys Setup

### 1. Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (development)
   - `https://your-domain.com/auth/google/callback` (production)

### 2. SendGrid (Email)
1. Go to [sendgrid.com](https://sendgrid.com)
2. Create account
3. Go to Settings → API Keys
4. Create new API key
5. Copy the key

### 3. Groq (AI Questions)
1. Go to [console.groq.com](https://console.groq.com)
2. Create account
3. Generate API key
4. Copy the key

## 📝 Pre-deployment Checklist

- [ ] All environment variables are set
- [ ] Database is configured and accessible
- [ ] API keys are valid and have proper permissions
- [ ] Frontend API URL points to correct backend
- [ ] CORS is properly configured
- [ ] All dependencies are in package.json
- [ ] Build scripts are working locally
- [ ] Environment variables are added to deployment platform

## 🚨 Common Issues & Solutions

### 1. CORS Errors
**Solution:** Ensure your backend CORS configuration includes your frontend domain:
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### 2. Environment Variables Not Loading
**Solution:** 
- Check variable names match exactly
- Restart deployment after adding variables
- Use platform-specific variable setting methods

### 3. Build Failures
**Solution:**
- Check all dependencies are in package.json
- Ensure Node.js version is compatible
- Review build logs for specific errors

### 4. Database Connection Issues
**Solution:**
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has proper permissions

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: railway/deploy@v1
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📊 Monitoring & Analytics

### Recommended Tools:
- **Vercel Analytics** (Frontend)
- **Railway Metrics** (Backend)
- **MongoDB Atlas Monitoring** (Database)
- **Sentry** (Error tracking)

## 🆘 Support

If you encounter issues:
1. Check deployment platform logs
2. Verify all environment variables
3. Test locally with production environment variables
4. Check platform-specific documentation

## 🎉 Success!

Once deployed, your QGenz application will be live and accessible to users worldwide! 