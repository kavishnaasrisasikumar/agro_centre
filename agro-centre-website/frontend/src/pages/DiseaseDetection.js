/**
 * Disease Detection Page
 * Upload leaf image and detect disease
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadAndPredict } from '../services/api';
import '../styles/disease-detection.css';

function DiseaseDetection() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState(null);

  // Check if user is logged in
  const token = localStorage.getItem('token');
  if (!token) {
    return (
      <div className="auth-required">
        <div className="auth-message">
          <h2>Please Login First</h2>
          <p>You need to log in to use the plant disease detection feature</p>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5242880) {
        setError('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setError('');

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file drop
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      handleFileSelect({ target: { files: dataTransfer.files } });
    }
  };

  // Handle prediction
  const handlePredict = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select an image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await uploadAndPredict(selectedFile);
      setPrediction(response.data.prediction);
      setSelectedFile(null);
      setPreview(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="disease-detection-page">
      <div className="detection-header">
        <h1>🔬 Plant Disease Detection</h1>
        <p>Upload a leaf image and let AI analyze it for diseases</p>
      </div>

      <div className="detection-container">
        {!prediction ? (
          <div className="detection-form">
            {/* File Upload Area */}
            <div
              className="upload-area"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
            >
              <div className="upload-content">
                <div className="upload-icon">📸</div>
                <h3>Upload Leaf Image</h3>
                <p>Drag and drop your image here or click to browse</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="file-input"
                  id="file-input"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="alert alert-error">{error}</div>}

            {/* Image Preview */}
            {preview && (
              <div className="preview-section">
                <h4>Preview</h4>
                <img src={preview} alt="Preview" className="preview-image" />
              </div>
            )}

            {/* Instructions */}
            <div className="instructions">
              <h4>Tips for Best Results:</h4>
              <ul>
                <li>📷 Use a clear, well-lit photo of the affected leaf</li>
                <li>🎯 Ensure the leaf takes up most of the image</li>
                <li>✨ Avoid shadows and glare on the leaf</li>
                <li>📐 Supported formats: JPEG, PNG (Max 5MB)</li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              className="btn btn-primary btn-block btn-large"
              onClick={handlePredict}
              disabled={!selectedFile || loading}
            >
              {loading ? '⏳ Analyzing...' : '🔍 Detect Disease'}
            </button>
          </div>
        ) : (
          <div className="result-section">
            {/* Disease Result */}
            <div className="result-card">
              <div className="result-header">
                <h2>🎯 Analysis Result</h2>
              </div>

              <div className="result-image">
                <img src={prediction.imageUrl} alt="Analyzed" />
              </div>

              <div className="result-details">
                {/* Disease Name */}
                <div className="detail-item">
                  <label>Disease Detected:</label>
                  <h3>{prediction.disease.replace(/_/g, ' ')}</h3>
                </div>

                {/* Confidence */}
                <div className="detail-item">
                  <label>Confidence:</label>
                  <div className="confidence-bar">
                    <div
                      className="confidence-fill"
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                  <p>{prediction.confidence}%</p>
                </div>

                {/* Suggestion */}
                <div className="detail-item">
                  <label>Recommended Solution:</label>
                  <p className="suggestion">{prediction.suggestion}</p>
                </div>
              </div>

              {/* Related Products */}
              <div className="related-products">
                <h4>Related Products</h4>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate('/products?category=pesticides')}
                >
                  View Pesticides
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate('/products?category=fertilizers')}
                >
                  View Fertilizers
                </button>
              </div>

              {/* Action Buttons */}
              <div className="result-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setPrediction(null);
                    setSelectedFile(null);
                    setPreview(null);
                  }}
                >
                  Analyze Another Leaf
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiseaseDetection;
