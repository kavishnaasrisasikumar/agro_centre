# Agro Centre - Complete Setup Checklist

## System Requirements
- Node.js v14+ (https://nodejs.org)
- MongoDB (local or MongoDB Atlas)
- Git (optional)
- Text Editor/IDE (VS Code recommended)

## Pre-Installation Steps

### 1. Install Node.js
```bash
# Download from https://nodejs.org
# Or on Windows using Chocolatey:
choco install nodejs

# Or on Mac using Homebrew:
brew install node

# Verify installation
node --version
npm --version
```

### 2. Install MongoDB

**Option A: Local MongoDB**
- Download from https://www.mongodb.com/try/download/community
- Install and run mongod service

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string

## Project Setup

### Step 1: Clone Repository
```bash
# Navigate to projects folder
cd Projects

# Clone repository (if using git)
git clone https://github.com/yourusername/agro-centre-website.git
cd agro-centre-website

# Or extract if downloaded as ZIP
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
# On Windows:
copy .env.example .env

# On Mac/Linux:
cp .env.example .env

# Edit .env with your settings
# Open in text editor and update:
# - MONGODB_URI
# - JWT_SECRET
# - PORT (optional)
```

### Step 3: Frontend Setup

```bash
# Navigate to frontend (new terminal/tab)
cd frontend

# Install dependencies
npm install

# Optional: Create .env file if backend on different port
echo REACT_APP_API_URL=http://localhost:5000/api > .env
```

## Running the Application

### Terminal 1: Start MongoDB (if local)
```bash
# Windows
# MongoDB should auto-start if installed as service

# Mac/Linux
mongod --dbpath /path/to/data
```

### Terminal 2: Start Backend
```bash
cd backend
npm start

# Expected output:
# ✓ MongoDB connected successfully
# 🌾 Agro Centre Server running on port 5000
# 📍 http://localhost:5000
```

### Terminal 3: Start Frontend
```bash
cd frontend
npm start

# Browser should open at http://localhost:3000
```

## Verify Installation

### Backend Health Check
```bash
curl http://localhost:5000/health
# Should return: { "success": true, "message": "Server is running" }
```

### Frontend Access
- Open http://localhost:3000 in browser
- Should see Agro Centre homepage

### Test Authentication Flow
1. Click "Register"
2. Fill in details and submit
3. Should redirect to home page
4. Check localStorage in DevTools (F12) for token

## Initial Data Setup

### Add Sample Products to Database

**Using MongoDB Compass (GUI):**
1. Download MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Create database: `agro-centre`
4. Create collection: `products`
5. Insert sample documents

**Using MongoDB Shell:**
```bash
# Start mongo shell
mongosh

# Switch to database
use agro-centre

# Insert sample products
db.products.insertMany([
  {
    name: "Tomato Seeds",
    description: "Hybrid F1 variety",
    price: 120,
    category: "seeds",
    stock: 100
  },
  {
    name: "DAP Fertilizer",
    description: "Di-Ammonium Phosphate",
    price: 450,
    category: "fertilizers",
    stock: 50
  },
  {
    name: "Hand Hoe",
    description: "Steel hand hoe for farming",
    price: 250,
    category: "tools",
    stock: 30
  },
  {
    name: "Fungicide",
    description: "Copper sulfate fungicide",
    price: 350,
    category: "pesticides",
    stock: 40
  }
])

# Verify insert
db.products.find()
```

## Directory Structure Created

```
agro-centre-website/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── ai_model/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env
│
├── README.md
├── API_TESTING.md
├── BACKEND_GUIDE.md
├── FRONTEND_GUIDE.md
└── SETUP.md (this file)
```

## Features Available

### ✅ User Management
- User registration with password hashing
- User login with JWT tokens
- Protected routes with authentication
- Token stored in browser localStorage

### ✅ Product Management
- Browse all products
- Filter by category (seeds, fertilizers, tools, pesticides)
- Product details page
- Responsive product grid

### ✅ Disease Detection
- Leaf image upload with drag-drop
- Image preview before submission
- AI prediction with confidence score
- Disease-specific solutions
- Prediction history

### ✅ Responsive UI
- Mobile-friendly design
- Hamburger menu on mobile
- Touch-friendly buttons
- Responsive grid layouts

### ✅ Database Integration
- MongoDB for data persistence
- User profiles and history
- Product catalog
- Prediction records

## Troubleshooting

### Issue: "Port 5000 is already in use"
```bash
# Find and kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### Issue: "Cannot find module 'express'"
```bash
# Navigate to backend and reinstall
cd backend
npm install
```

### Issue: "ENOENT: no such file or directory, open '.env'"
```bash
# Create .env from example
cp .env.example .env
# Edit with your values
```

### Issue: "MongoDB connection refused"
```bash
# Check if MongoDB is running
# Windows: Should be in Services
# Mac: brew services list
# Linux: systemctl status mongod

# Or start it:
mongod
```

### Issue: "Localhost refused to connect"
- Check if frontend/backend is actually running
- Check correct port numbers (3000 for frontend, 5000 for backend)
- Check for error messages in terminal

### Issue: "CORS error in browser console"
- Usually means backend is not running
- Check backend server logs
- Verify API_BASE_URL in frontend/src/services/api.js

## Next Steps

### 1. Customize the Application
- [ ] Change company branding (colors, logo, name)
- [ ] Add more products to database
- [ ] Customize disease solutions
- [ ] Add your own TensorFlow model

### 2. Add More Features
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Admin dashboard
- [ ] User profile management
- [ ] Product review system
- [ ] Wish list functionality

### 3. Deployment
- [ ] Deploy backend to Heroku/Render
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Set up MongoDB Atlas for production
- [ ] Configure domain names
- [ ] Set up SSL certificates

### 4. Security Hardening
- [ ] Add rate limiting
- [ ] Implement CSRF protection
- [ ] Add input validation
- [ ] Set security headers
- [ ] Enable HTTPS
- [ ] Set up logging and monitoring

## Development Workflow

### Daily Development
```bash
# Terminal 1: MongoDB (if local)
mongod

# Terminal 2: Backend
cd backend
npm run dev  # Uses nodemon for auto-reload

# Terminal 3: Frontend
cd frontend
npm start
```

### Making Changes
1. Edit files in your favorite editor
2. Backend: Auto-reloads with nodemon
3. Frontend: Hot-reloads automatically
4. Test in browser at http://localhost:3000
5. Check console for errors (F12)

### Committing Changes (if using Git)
```bash
# Stage changes
git add .

# Commit with message
git commit -m "Add feature or fix description"

# Push to repository
git push origin main
```

## Testing the Application

### Register New User
1. Click "Register"
2. Enter name, email, password
3. Click "Register" button
4. Should redirect to home

### Test Disease Detection
1. Log in
2. Go to "Disease Detection"
3. Upload a plant leaf image
4. View AI prediction results

### Test Product Browsing
1. Go to "Products"
2. Use category filters
3. View product details
4. Try different filters

## Performance Tips

### Backend
- Use MongoDB indexes for frequently queried fields
- Implement caching for product lists
- Compress images on upload
- Set up load balancing for production

### Frontend
- Enable gzip compression
- Minify CSS and JavaScript
- Optimize images
- Use lazy loading for images
- Code splitting with React.lazy

## Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MDN Web Docs](https://developer.mozilla.org)

## Support & Help

If you encounter issues:
1. Check the troubleshooting section above
2. Review error messages in console
3. Check network tab in DevTools
4. Read BACKEND_GUIDE.md or FRONTEND_GUIDE.md
5. Consult the README.md

## License

This project is for educational purposes.

---

**Congratulations! Your Agro Centre Website is ready to use! 🌾**

For questions or support, refer to the documentation files or check the code comments.
