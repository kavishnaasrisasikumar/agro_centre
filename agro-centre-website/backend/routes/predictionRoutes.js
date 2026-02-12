/**
 * Prediction Routes
 * Handles /api/predict endpoints
 */

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  uploadAndPredict,
  getUserPredictions,
  getPredictionById,
} = require('../controllers/predictionController');
const { authMiddleware } = require('../middleware/auth');

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR || './uploads');
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || 5242880), // 5MB
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Protected routes (require authentication)
router.post('/', authMiddleware, upload.single('image'), uploadAndPredict);
router.get('/', authMiddleware, getUserPredictions);
router.get('/:id', authMiddleware, getPredictionById);

module.exports = router;
