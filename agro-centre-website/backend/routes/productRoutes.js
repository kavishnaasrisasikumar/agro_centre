/**
 * Product Routes
 * Handles /api/products endpoints
 */

const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct } = require('../controllers/productController');

// Get all products with optional category filter
router.get('/', getAllProducts);

// Get single product by ID
router.get('/:id', getProductById);

// Create new product (can be protected with admin middleware)
router.post('/', createProduct);

module.exports = router;
