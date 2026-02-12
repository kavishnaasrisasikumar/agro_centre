/**
 * Product Model
 * Stores product information like seeds, fertilizers, tools
 */

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0,
    },
    category: {
      type: String,
      enum: ['seeds', 'fertilizers', 'tools', 'pesticides'],
      required: true,
    },
    image: {
      type: String,
      default: '/images/default-product.png',
    },
    stock: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'products' }
);

module.exports = mongoose.model('Product', productSchema);
