/**
 * API Service
 * Handles all API calls to backend
 */

import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const registerUser = (userData) => {
  return apiClient.post('/auth/register', userData);
};

export const loginUser = (credentials) => {
  return apiClient.post('/auth/login', credentials);
};

export const getCurrentUser = () => {
  return apiClient.get('/auth/me');
};

// Product API calls
export const getAllProducts = (category = null) => {
  const url = category ? `/products?category=${category}` : '/products';
  return apiClient.get(url);
};

export const getProductById = (id) => {
  return apiClient.get(`/products/${id}`);
};

// Prediction API calls
export const uploadAndPredict = (file) => {
  const formData = new FormData();
  formData.append('image', file);

  return apiClient.post('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getUserPredictions = () => {
  return apiClient.get('/predict');
};

export const getPredictionById = (id) => {
  return apiClient.get(`/predict/${id}`);
};

export default apiClient;
