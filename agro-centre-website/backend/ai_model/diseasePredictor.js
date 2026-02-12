/**
 * AI Model Prediction Module
 * Loads TensorFlow model and performs plant disease prediction
 */

const tf = require('@tensorflow/tfjs');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Disease classes that the model can predict
const DISEASE_CLASSES = [
  'Apple___Apple_scab',
  'Apple___Black_rot',
  'Apple___Cedar_apple_rust',
  'Apple___healthy',
  'Blueberry___healthy',
  'Cherry___Powdery_mildew',
  'Cherry___healthy',
  'Corn___Cercospora_leaf_spot Gray_leaf_spot',
  'Corn___Common_rust',
  'Corn___Northern_Leaf_Blight',
  'Corn___healthy',
  'Grape___Black_rot',
  'Grape___Esca_(Black_Measles)',
  'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
  'Grape___healthy',
  'Orange___Haunglongbing_(Citrus_greening)',
  'Peach___Bacterial_spot',
  'Peach___healthy',
  'Pepper,_bell___Bacterial_spot',
  'Pepper,_bell___healthy',
  'Potato___Early_blight',
  'Potato___Late_blight',
  'Potato___healthy',
  'Raspberry___healthy',
  'Soybean___Septoria_brown_spot',
  'Soybean___healthy',
  'Squash___Powdery_mildew',
  'Strawberry___Leaf_scorch',
  'Strawberry___healthy',
  'Tomato___Bacterial_spot',
  'Tomato___Early_blight',
  'Tomato___Late_blight',
  'Tomato___Leaf_Mold',
  'Tomato___Septoria_leaf_spot',
  'Tomato___Spider_mites Two-spotted_spider_mite',
  'Tomato___Target_Spot',
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
  'Tomato___Tomato_mosaic_virus',
  'Tomato___healthy',
];

// Disease solutions mapping
const DISEASE_SOLUTIONS = {
  'Apple___Apple_scab': 'Apply fungicide spray. Remove infected leaves. Improve air circulation.',
  'Apple___Black_rot': 'Prune affected branches. Apply copper-based fungicide. Maintain sanitation.',
  'Apple___Cedar_apple_rust': 'Remove cedar trees nearby. Apply sulfur spray. Prune affected areas.',
  'Apple___healthy': 'No disease detected. Maintain regular care and monitoring.',
  'Blueberry___healthy': 'Plant is healthy. Continue regular maintenance.',
  'Cherry___Powdery_mildew': 'Apply sulfur or potassium bicarbonate. Improve air circulation. Reduce humidity.',
  'Cherry___healthy': 'Plant is in good health. Maintain care routine.',
  'Corn___Cercospora_leaf_spot': 'Apply fungicide. Remove affected leaves. Plant resistant varieties.',
  'Corn___Common_rust': 'Use resistant hybrid varieties. Apply fungicide if necessary.',
  'Corn___Northern_Leaf_Blight': 'Plant resistant varieties. Apply fungicide. Improve drainage.',
  'Corn___healthy': 'Corn plant is healthy. Continue monitoring.',
  'Grape___Black_rot': 'Remove affected berries. Apply fungicide. Improve pruning.',
  'Grape___Esca_(Black_Measles)': 'Prune infected vines. Remove dead wood. Apply copper fungicide.',
  'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)': 'Apply fungicide. Remove infected leaves. Improve air flow.',
  'Grape___healthy': 'Grapes are healthy. Maintain regular care.',
  'Orange___Haunglongbing_(Citrus_greening)': 'Remove infected trees. Control insect vectors. Plant disease-free trees.',
  'Peach___Bacterial_spot': 'Apply copper bactericide. Prune infected branches. Improve sanitation.',
  'Peach___healthy': 'Peach tree is healthy.',
  'Pepper,_bell___Bacterial_spot': 'Apply copper spray. Remove infected leaves. Improve air circulation.',
  'Pepper,_bell___healthy': 'Pepper plant is healthy.',
  'Potato___Early_blight': 'Remove lower infected leaves. Apply fungicide. Improve air circulation.',
  'Potato___Late_blight': 'Apply fungicide immediately. Remove infected plants. Improve drainage.',
  'Potato___healthy': 'Potato plant is healthy.',
  'Raspberry___healthy': 'Raspberry is healthy.',
  'Soybean___Septoria_brown_spot': 'Apply fungicide. Remove infected leaves. Crop rotation.',
  'Soybean___healthy': 'Soybean is healthy.',
  'Squash___Powdery_mildew': 'Apply sulfur spray. Improve air circulation. Remove affected leaves.',
  'Strawberry___Leaf_scorch': 'Remove infected leaves. Apply fungicide. Improve drainage.',
  'Strawberry___healthy': 'Strawberry is healthy.',
  'Tomato___Bacterial_spot': 'Apply copper bactericide. Remove infected leaves. Sanitize tools.',
  'Tomato___Early_blight': 'Remove lower leaves. Apply fungicide. Improve air circulation.',
  'Tomato___Late_blight': 'Apply fungicide immediately. Remove infected plants. Improve air flow.',
  'Tomato___Leaf_Mold': 'Reduce humidity. Improve air circulation. Apply fungicide.',
  'Tomato___Septoria_leaf_spot': 'Remove infected leaves. Apply fungicide. Sanitize tools between plants.',
  'Tomato___Spider_mites': 'Spray with neem oil. Increase humidity. Remove heavily infected leaves.',
  'Tomato___Target_Spot': 'Remove infected leaves. Apply fungicide. Improve air circulation.',
  'Tomato___Tomato_Yellow_Leaf_Curl_Virus': 'Remove infected plants. Control whiteflies. Use resistant varieties.',
  'Tomato___Tomato_mosaic_virus': 'Remove infected plants. Sanitize tools. Plant resistant varieties.',
  'Tomato___healthy': 'Tomato plant is healthy. Continue monitoring.',
};

let model = null;
let modelLoaded = false;

/**
 * Load the pre-trained TensorFlow model
 * Note: Download the model from: https://github.com/arpitjain099/plant-disease-detection
 */
const loadModel = async () => {
  try {
    if (modelLoaded) {
      console.log('Model already loaded');
      return model;
    }

    const modelPath = process.env.MODEL_PATH || './ai_model/plant_disease_model.h5';
    
    // Check if model file exists
    if (!fs.existsSync(modelPath)) {
      console.warn(`Model file not found at ${modelPath}`);
      console.warn('Using mock model for demonstration');
      modelLoaded = true;
      return null; // Return null to indicate using mock
    }

    console.log(`Loading model from ${modelPath}...`);
    model = await tf.loadLayersModel(`file://${modelPath}`);
    modelLoaded = true;
    console.log('Model loaded successfully');

    return model;
  } catch (error) {
    console.error('Error loading model:', error.message);
    modelLoaded = true;
    return null;
  }
};

/**
 * Preprocess image for model input
 * Resize to 224x224 and normalize pixel values
 */
const preprocessImage = async (imagePath) => {
  try {
    // Read and resize image
    const imageBuffer = await sharp(imagePath)
      .resize(224, 224, {
        fit: 'cover',
        position: 'center',
      })
      .raw()
      .toBuffer();

    // Convert to tensor and normalize
    let tensor = tf.tensor3d(
      new Uint8Array(imageBuffer),
      [224, 224, 3],
      'int32'
    );

    // Normalize pixel values to [0, 1]
    tensor = tensor.cast('float32').div(tf.scalar(255));

    // Add batch dimension
    tensor = tensor.expandDims(0);

    return tensor;
  } catch (error) {
    console.error('Error preprocessing image:', error.message);
    throw error;
  }
};

/**
 * Predict plant disease from leaf image
 * Returns disease name and confidence score
 */
const predictDisease = async (imagePath) => {
  try {
    // Load model if not already loaded
    if (!modelLoaded) {
      await loadModel();
    }

    // If model is not available, use mock prediction
    if (!model) {
      console.log('Using mock prediction (model not available)');
      return getMockPrediction();
    }

    // Preprocess image
    const inputTensor = await preprocessImage(imagePath);

    // Make prediction
    const predictions = model.predict(inputTensor);
    const predictionsData = await predictions.data();

    // Clean up tensors
    inputTensor.dispose();
    predictions.dispose();

    // Find disease with highest confidence
    let maxConfidence = 0;
    let predictedDiseaseIndex = 0;

    for (let i = 0; i < predictionsData.length; i++) {
      if (predictionsData[i] > maxConfidence) {
        maxConfidence = predictionsData[i];
        predictedDiseaseIndex = i;
      }
    }

    const disease = DISEASE_CLASSES[predictedDiseaseIndex];
    const confidence = Math.round(maxConfidence * 100);
    const suggestion = DISEASE_SOLUTIONS[disease] || 'Consult agricultural expert.';

    return {
      disease,
      confidence,
      suggestion,
      allPredictions: Array.from(predictionsData).map((conf, idx) => ({
        disease: DISEASE_CLASSES[idx],
        confidence: Math.round(conf * 100),
      })),
    };
  } catch (error) {
    console.error('Error during prediction:', error.message);
    throw error;
  }
};

/**
 * Mock prediction for demonstration when model is not available
 */
const getMockPrediction = () => {
  const diseases = [
    { disease: 'Tomato___Early_blight', confidence: 92, suggestion: 'Remove lower leaves. Apply fungicide. Improve air circulation.' },
    { disease: 'Tomato___Bacterial_spot', confidence: 85, suggestion: 'Apply copper bactericide. Remove infected leaves. Sanitize tools.' },
    { disease: 'Apple___healthy', confidence: 88, suggestion: 'No disease detected. Maintain regular care and monitoring.' },
  ];

  const randomIndex = Math.floor(Math.random() * diseases.length);
  return diseases[randomIndex];
};

module.exports = {
  loadModel,
  predictDisease,
  DISEASE_CLASSES,
  DISEASE_SOLUTIONS,
};
