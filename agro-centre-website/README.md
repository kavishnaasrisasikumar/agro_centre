# 🌾 Agro Centre Website - AI Plant Disease Detection

A full-stack web application for agricultural product sales and AI-powered plant disease detection. The platform uses TensorFlow CNN models to analyze leaf images and detect plant diseases with personalized treatment recommendations.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [AI Model](#ai-model)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Frontend Features
- **Responsive React UI** - Mobile-friendly design for all devices
- **User Authentication** - Register and login with JWT tokens
- **Product Catalog** - Browse seeds, fertilizers, tools, and pesticides
- **Disease Detection** - Upload leaf images for AI analysis
- **Results Dashboard** - View prediction history and recommendations
- **Personalized Solutions** - Get treatment recommendations for detected diseases

### Backend Features
- **REST API** - Complete REST API with Express.js
- **JWT Authentication** - Secure token-based authentication
- **MongoDB Database** - NoSQL database for users and predictions
- **File Upload** - Multer integration for image uploads
- **Error Handling** - Comprehensive error handling and validation

### AI Features
- **CNN Model** - TensorFlow.js pre-trained model for disease detection
- **Image Preprocessing** - Automatic image resizing and normalization
- **Confidence Scoring** - Probability scores for each prediction
- **39 Disease Classes** - Supports detection of 39+ plant diseases
- **Treatment Database** - Built-in solutions for each disease

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Multer** - File upload handling
- **bcryptjs** - Password hashing

### AI & ML
- **TensorFlow.js** - Machine learning library
- **Sharp** - Image processing
- **Pre-trained CNN Model** - Plant disease detection model

## 📁 Project Structure

```
agro-centre-website/
├── backend/
│   ├── models/                 # MongoDB schemas
│   │   ├── User.js            # User model
│   │   ├── Product.js         # Product model
│   │   └── Prediction.js      # Prediction model
│   ├── routes/                # API routes
│   │   ├── authRoutes.js      # Authentication routes
│   │   ├── productRoutes.js   # Product routes
│   │   └── predictionRoutes.js # Prediction routes
│   ├── controllers/           # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── predictionController.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.js           # JWT verification
│   ├── ai_model/              # AI prediction module
│   │   └── diseasePredictor.js
│   ├── uploads/               # User uploaded images
│   ├── server.js              # Main server file
│   ├── package.json           # Dependencies
│   ├── .env.example           # Environment variables template
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Navbar.js
│   │   │   └── Footer.js
│   │   ├── pages/             # Page components
│   │   │   ├── Home.js
│   │   │   ├── Register.js
│   │   │   ├── Login.js
│   │   │   ├── Products.js
│   │   │   └── DiseaseDetection.js
│   │   ├── services/          # API services
│   │   │   └── api.js
│   │   ├── styles/            # CSS files
│   │   │   ├── global.css
│   │   │   ├── navbar.css
│   │   │   ├── footer.css
│   │   │   ├── auth.css
│   │   │   ├── pages.css
│   │   │   ├── products.css
│   │   │   └── disease-detection.css
│   │   ├── App.js             # Main app component
│   │   └── index.js           # Entry point
│   ├── public/                # Static files
│   │   └── index.html
│   └── package.json
│
└── README.md (this file)
```

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local or cloud - MongoDB Atlas)
- **Git** (optional)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (Edit `.env` file)
   ```env
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/agro-centre
   # OR for MongoDB Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agro-centre
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_key_here
   
   # Server
   PORT=5000
   NODE_ENV=development
   
   # Upload
   UPLOAD_DIR=./uploads
   MAX_FILE_SIZE=5242880
   ```

5. **Start MongoDB** (if local)
   ```bash
   mongod
   ```

### Frontend Setup

1. **Navigate to frontend directory** (in new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file** (optional)
   ```bash
   # Create .env file if backend is on different port
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## ▶️ Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

Output should show:
```
✓ MongoDB connected successfully

==================================================
🌾 Agro Centre Server running on port 5000
📍 http://localhost:5000
==================================================
```

### Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm start
```

The app will open at `http://localhost:3000`

### Testing the API

You can test the API using curl or Postman:

```bash
# Health check
curl http://localhost:5000/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123","confirmPassword":"password123"}'
```

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (Protected) |

**Register Request:**
```json
{
  "name": "John Farmer",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products?category=seeds` | Filter by category |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |

**Query Parameters:**
- `category` - Filter by category (seeds, fertilizers, tools, pesticides)

### Prediction Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/predict` | Upload image and predict disease |
| GET | `/api/predict` | Get user's predictions |
| GET | `/api/predict/:id` | Get specific prediction |

**Upload Image Request:**
- Method: POST
- URL: `/api/predict`
- Header: `Authorization: Bearer <token>`
- Body: FormData with `image` field

**Response:**
```json
{
  "success": true,
  "message": "Prediction successful",
  "prediction": {
    "id": "507f1f77bcf86cd799439011",
    "disease": "Tomato___Early_blight",
    "confidence": 92,
    "suggestion": "Remove lower leaves. Apply fungicide...",
    "imageUrl": "/uploads/1234567890-123456789.jpg",
    "allPredictions": [...]
  }
}
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  createdAt: Date
}
```

### Products Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  category: String (enum: ['seeds', 'fertilizers', 'tools', 'pesticides']),
  image: String,
  stock: Number,
  createdAt: Date
}
```

### Predictions Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  disease: String,
  confidence: Number (0-100),
  imageUrl: String,
  suggestion: String,
  createdAt: Date
}
```

## 🤖 AI Model

### Model Information
- **Framework:** TensorFlow.js
- **Architecture:** Convolutional Neural Network (CNN)
- **Input Size:** 224x224 pixels
- **Classes:** 39 plant disease classes
- **Pre-training:** PlantVillage Dataset

### Supported Diseases

The model can detect diseases for:
- Apple (scab, black rot, cedar apple rust)
- Blueberry
- Cherry (powdery mildew)
- Corn (cercospora, common rust, leaf blight)
- Grape (black rot, esca, leaf blight)
- Orange (citrus greening)
- Peach (bacterial spot)
- Pepper (bacterial spot)
- Potato (early/late blight)
- Raspberry
- Soybean (brown spot)
- Squash (powdery mildew)
- Strawberry (leaf scorch)
- Tomato (bacterial spot, early/late blight, leaf mold, septoria, spider mites, target spot, viruses)

### How to Use Your Own Model

1. **Obtain a trained model** (format: .h5 or TensorFlow.js format)
2. **Place in** `backend/ai_model/` directory
3. **Update** `diseasePredictor.js`:
   - Update `DISEASE_CLASSES` array
   - Update `DISEASE_SOLUTIONS` mapping
   - Update model loading path

## 🔐 Authentication Flow

1. **User Registration**
   - Submit name, email, password
   - Password is hashed with bcrypt
   - JWT token is generated and returned

2. **User Login**
   - Submit email and password
   - Password is verified against hash
   - JWT token is returned

3. **Protected Routes**
   - Include token in `Authorization` header: `Bearer <token>`
   - Middleware validates token
   - Request proceeds if valid

## 🐛 Troubleshooting

### MongoDB Connection Error
**Problem:** `Error: MongoDB connection failed`
**Solution:**
- Ensure MongoDB is running (`mongod` command)
- Check MONGODB_URI in `.env` file
- For MongoDB Atlas, verify internet connection

### CORS Error
**Problem:** `Access to XMLHttpRequest has been blocked by CORS policy`
**Solution:**
- The backend already has CORS enabled
- Make sure backend is running on port 5000
- Check frontend API_BASE_URL in `api.js`

### Model Loading Error
**Problem:** `Error loading model: Model file not found`
**Solution:**
- Place `.h5` model file in `backend/ai_model/`
- The app uses mock predictions if model is not found
- Download PlantVillage model from: https://github.com/arpitjain099/plant-disease-detection

### Image Upload Error
**Problem:** `File size must be less than 5MB`
**Solution:**
- Resize image before uploading
- Use online tools to compress JPEG/PNG
- Supported formats: JPEG, PNG only

### Token Expired
**Problem:** `Invalid token. Authorization denied.`
**Solution:**
- Re-login to get a new token
- Token expires in 7 days
- Check browser localStorage for token

## 📝 Sample Data

To populate your database with sample products:

```bash
# Use MongoDB Compass or Mongo Shell
use agro-centre

db.products.insertMany([
  {
    name: "Tomato Seeds",
    description: "High-yield hybrid tomato seeds",
    price: 150,
    category: "seeds",
    image: "/images/tomato-seeds.jpg",
    stock: 100
  },
  {
    name: "NPK Fertilizer",
    description: "Balanced nutrient fertilizer",
    price: 500,
    category: "fertilizers",
    image: "/images/npk.jpg",
    stock: 50
  },
  {
    name: "Garden Spade",
    description: "Stainless steel garden spade",
    price: 800,
    category: "tools",
    image: "/images/spade.jpg",
    stock: 30
  }
])
```

## 🚀 Deployment

### Deploy Backend (Heroku/Render)
1. Create account on Heroku or Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Deploy Frontend (Vercel/Netlify)
1. Build frontend: `npm run build`
2. Connect GitHub to Vercel/Netlify
3. Deploy from `frontend` directory

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual)
- [TensorFlow.js Documentation](https://js.tensorflow.org)
- [JWT Introduction](https://jwt.io/introduction)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created for educational and agricultural improvement purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

---

**Happy Farming! 🌾**

For questions or support, please raise an issue in the repository.
