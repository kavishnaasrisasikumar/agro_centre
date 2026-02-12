/**
 * Prediction Controller
 * Handles image upload and disease prediction
 */

const Prediction = require('../models/Prediction');
const { predictDisease } = require('../ai_model/diseasePredictor');
const fs = require('fs');
const path = require('path');

/**
 * Upload leaf image and predict disease
 * POST /api/predict
 */
const uploadAndPredict = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded',
      });
    }

    // Validate file type
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedMimes.includes(req.file.mimetype)) {
      // Delete uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Only JPEG and PNG images are allowed',
      });
    }

    const imagePath = req.file.path;
    const imageUrl = `/uploads/${req.file.filename}`;

    // Perform prediction
    const predictionResult = await predictDisease(imagePath);

    // Save prediction to database
    const prediction = await Prediction.create({
      userId: req.user._id,
      disease: predictionResult.disease,
      confidence: predictionResult.confidence,
      imageUrl,
      suggestion: predictionResult.suggestion,
    });

    return res.status(200).json({
      success: true,
      message: 'Prediction successful',
      prediction: {
        id: prediction._id,
        disease: predictionResult.disease,
        confidence: predictionResult.confidence,
        suggestion: predictionResult.suggestion,
        imageUrl,
        allPredictions: predictionResult.allPredictions,
      },
    });
  } catch (error) {
    console.error('Prediction error:', error.message);

    // Delete uploaded file if error occurs
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: 'Error during prediction',
      error: error.message,
    });
  }
};

/**
 * Get user's prediction history
 * GET /api/predictions
 */
const getUserPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    return res.status(200).json({
      success: true,
      count: predictions.length,
      predictions,
    });
  } catch (error) {
    console.error('Error fetching predictions:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error fetching predictions',
      error: error.message,
    });
  }
};

/**
 * Get prediction by ID
 * GET /api/predictions/:id
 */
const getPredictionById = async (req, res) => {
  try {
    const { id } = req.params;

    const prediction = await Prediction.findById(id).populate('userId', 'name email');

    if (!prediction) {
      return res.status(404).json({
        success: false,
        message: 'Prediction not found',
      });
    }

    // Check if user owns this prediction
    if (prediction.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this prediction',
      });
    }

    return res.status(200).json({
      success: true,
      prediction,
    });
  } catch (error) {
    console.error('Error fetching prediction:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error fetching prediction',
      error: error.message,
    });
  }
};

module.exports = {
  uploadAndPredict,
  getUserPredictions,
  getPredictionById,
};
