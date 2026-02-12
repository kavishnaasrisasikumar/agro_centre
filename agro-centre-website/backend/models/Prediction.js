/**
 * Prediction Model
 * Stores AI prediction results for plant diseases
 */

const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    disease: {
      type: String,
      required: [true, 'Disease name is required'],
      trim: true,
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    suggestion: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'predictions' }
);

module.exports = mongoose.model('Prediction', predictionSchema);
