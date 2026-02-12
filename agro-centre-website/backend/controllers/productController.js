/**
 * Product Controller
 * Handles product listing and details
 */

const Product = require('../models/Product');

/**
 * Get all products with optional filtering by category
 * GET /api/products
 */
const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;

    // Build filter object
    const filter = {};
    if (category) {
      filter.category = category;
    }

    // Fetch products
    const products = await Product.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    });
  }
};

/**
 * Get product by ID
 * GET /api/products/:id
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('Error fetching product:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message,
    });
  }
};

/**
 * Create new product (Admin only)
 * POST /api/products
 */
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, image } = req.body;

    // Validation
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, price, and category',
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error('Error creating product:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};
