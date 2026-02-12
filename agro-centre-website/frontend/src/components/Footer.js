/**
 * Footer Component
 * Application footer
 */

import React from 'react';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>🌾 Agro Centre</h4>
          <p>Your trusted partner in agriculture</p>
        </div>

        <div className="footer-section">
          <h5>Quick Links</h5>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/detect-disease">Disease Detection</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Categories</h5>
          <ul>
            <li><a href="/products?category=seeds">Seeds</a></li>
            <li><a href="/products?category=fertilizers">Fertilizers</a></li>
            <li><a href="/products?category=tools">Tools</a></li>
            <li><a href="/products?category=pesticides">Pesticides</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Contact</h5>
          <p>Email: info@agrocentre.com</p>
          <p>Phone: +91-1234-567-890</p>
          <p>Address: Agricultural Road, Farm City</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Agro Centre. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
