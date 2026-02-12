/**
 * Products Page
 * Display list of products with category filter
 */

import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../services/api';
import '../styles/products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch products on component mount or category change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts(selectedCategory);
        setProducts(response.data.products);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  // Categories for filter
  const categories = ['seeds', 'fertilizers', 'tools', 'pesticides'];

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>🛒 Our Products</h1>
        <p>High-quality agricultural products for all your farming needs</p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        <button
          className={`filter-btn ${selectedCategory === '' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('')}
        >
          All Products
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-error">{error}</div>}

      {/* Loading State */}
      {loading && <div className="loading">Loading products...</div>}

      {/* Products Grid */}
      {!loading && (
        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                    }}
                  />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category.toUpperCase()}</p>
                  <p className="product-description">{product.description}</p>
                  <div className="product-stock">
                    <span className="stock-status">
                      {product.stock > 0 ? `✓ ${product.stock} in stock` : '✗ Out of Stock'}
                    </span>
                  </div>
                  <div className="product-footer">
                    <span className="product-price">₹{product.price}</span>
                    <button 
                      className="btn btn-sm btn-primary" 
                      disabled={product.stock === 0}
                    >
                      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No products found in this category</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Products;
