# Backend Development Guide

## Project Organization

### Controllers
Located in `backend/controllers/`, handles business logic.

**authController.js**
- User registration with password hashing
- User login with JWT generation
- Current user retrieval

**productController.js**
- Fetch all products with filtering
- Get single product details
- Create new products (admin)

**predictionController.js**
- Handle image upload with Multer
- Call AI prediction model
- Save predictions to database
- Retrieve prediction history

### Models
Located in `backend/models/`, defines MongoDB schemas.

**User.js**
- name, email, password
- Password auto-hashing before save
- Password comparison method

**Product.js**
- name, description, price
- Category enum (seeds, fertilizers, tools, pesticides)
- Stock tracking

**Prediction.js**
- userId reference
- Disease name and confidence
- Image URL and suggestions
- Timestamps

### Routes
Located in `backend/routes/`, defines API endpoints.

Each route file imports controllers and middleware, then defines routes:
```javascript
router.post('/endpoint', controller.function);
router.get('/endpoint', authMiddleware, controller.function);
```

### Middleware
Custom middleware for cross-cutting concerns.

**auth.js**
- Extracts JWT from Authorization header
- Verifies token validity
- Attaches user to request object
- Returns 401 if invalid

## Adding New Routes

1. Create controller function in `controllers/`:
```javascript
const myController = async (req, res) => {
  try {
    // Business logic
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

2. Create route in `routes/`:
```javascript
const router = express.Router();
const { myController } = require('../controllers/myController');
const { authMiddleware } = require('../middleware/auth');

router.post('/my-endpoint', authMiddleware, myController);
module.exports = router;
```

3. Import in `server.js`:
```javascript
const myRoutes = require('./routes/myRoutes');
app.use('/api/my', myRoutes);
```

## Database Operations

### Connect to Database
Already done in `server.js`, but for reference:
```javascript
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

### Create Document
```javascript
const user = await User.create({
  name: 'John',
  email: 'john@example.com',
  password: 'hashedPassword'
});
```

### Find Documents
```javascript
// Find all
const users = await User.find();

// Find with filter
const user = await User.findOne({ email: 'john@example.com' });

// Find by ID
const user = await User.findById(userId);

// Find with projection
const user = await User.findOne({ email }, 'name email');
```

### Update Document
```javascript
const user = await User.findByIdAndUpdate(
  userId,
  { name: 'Jane' },
  { new: true } // Returns updated document
);
```

### Delete Document
```javascript
await User.findByIdAndDelete(userId);
```

### Population (Joins)
```javascript
const prediction = await Prediction.findById(id)
  .populate('userId', 'name email');
```

## Error Handling

### Standard Error Response
```javascript
res.status(400).json({
  success: false,
  message: 'Error message here'
});
```

### Common Status Codes
- 200: Success
- 201: Created
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 500: Server error

### Try-Catch Pattern
```javascript
try {
  // Attempt operation
} catch (error) {
  console.error('Error:', error.message);
  res.status(500).json({
    success: false,
    message: error.message
  });
}
```

## File Upload with Multer

Configured in `predictionRoutes.js`:

```javascript
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random()}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  }
});

router.post('/', upload.single('image'), controller);
```

Access uploaded file:
```javascript
const imagePath = req.file.path;
const filename = req.file.filename;
const mimetype = req.file.mimetype;
```

## AI Model Integration

The `diseasePredictor.js` module handles:

1. **Load Model**
```javascript
const model = await tf.loadLayersModel('file://path/to/model.h5');
```

2. **Preprocess Image**
```javascript
const tensor = tf.tensor3d(imageBuffer, [224, 224, 3]);
const normalized = tensor.div(tf.scalar(255));
const batched = normalized.expandDims(0);
```

3. **Predict**
```javascript
const predictions = model.predict(inputTensor);
const data = await predictions.data();
const maxConfidence = Math.max(...data);
const diseaseIndex = data.indexOf(maxConfidence);
```

## Environment Variables

Create `.env` file with:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/agro-centre

# Security
JWT_SECRET=your_super_secret_key_here

# Server
PORT=5000
NODE_ENV=development

# Files
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

## Running Development Server with Auto-Reload

Install nodemon:
```bash
npm install --save-dev nodemon
```

Update `package.json`:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Run:
```bash
npm run dev
```

## Testing API Endpoints

### Using curl
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"pass"}'
```

### Using Postman
1. Download Postman
2. Create requests for each endpoint
3. Save in collections
4. Use environment variables for base URL and token

## Common Issues & Solutions

**Port already in use:**
```bash
# Find process on port 5000
lsof -i :5000
# Kill process
kill -9 <PID>
```

**MongoDB connection failed:**
- Check MongoDB is running
- Verify connection string in .env
- For MongoDB Atlas, ensure IP whitelist is correct

**CORS errors:**
- CORS middleware is already enabled
- Check frontend is on different port (3000 vs 5000)

**File upload errors:**
- Check uploads/ directory exists
- Verify file size < 5MB
- Ensure image format is supported

**JWT token errors:**
- Verify token is in Authorization header
- Format: `Bearer <token>`
- Check JWT_SECRET matches

## Performance Tips

1. **Index Database Fields**
```javascript
userSchema.index({ email: 1 }); // For frequent lookups
```

2. **Pagination for Large Datasets**
```javascript
const products = await Product.find()
  .skip((page - 1) * limit)
  .limit(limit);
```

3. **Projection to Select Fields**
```javascript
const users = await User.find({}, 'name email -password');
```

4. **Caching**
```javascript
const cache = {};
if (cache[key]) return cache[key];
// ... fetch and cache
```

5. **Image Optimization**
- Compress before storing
- Resize to standard dimensions
- Use WebP format

## Security Best Practices

1. **Hash Passwords**
```javascript
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(password, salt);
```

2. **Validate Input**
```javascript
if (!email || !password) {
  throw new Error('Missing fields');
}
```

3. **Protect Routes**
```javascript
router.post('/protected', authMiddleware, controller);
```

4. **Rate Limiting** (optional)
```bash
npm install express-rate-limit
```

5. **HTTPS in Production**
- Use environment-specific configs
- Enable CORS only for trusted origins
- Set secure cookie flags

## Debugging

1. **Console Logs**
```javascript
console.log('Debug:', variable);
console.error('Error:', error.message);
```

2. **Morgan HTTP Logger** (optional)
```bash
npm install morgan
app.use(morgan('dev'));
```

3. **VS Code Debugger**
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/server.js"
    }
  ]
}
```

## Deployment Checklist

- [ ] Set production environment variables
- [ ] Enable HTTPS
- [ ] Configure MongoDB Atlas
- [ ] Add rate limiting
- [ ] Set up logging
- [ ] Enable CORS for frontend URL only
- [ ] Use environment-specific configs
- [ ] Add error tracking (Sentry)
- [ ] Set up backup strategy
- [ ] Configure CI/CD pipeline
