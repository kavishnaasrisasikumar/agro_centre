/**
 * Home Page
 * Displays information about Agro Centre and services
 */

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages.css';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>🌾 Welcome to Agro Centre</h1>
          <p>Your one-stop solution for agriculture products and AI-powered plant health monitoring</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Shop Products
            </Link>
            <Link to="/detect-disease" className="btn btn-secondary">
              Detect Plant Disease
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="services-grid">
          {/* Service Card 1 */}
          <div className="service-card">
            <div className="service-icon">🌱</div>
            <h3>Quality Products</h3>
            <p>Wide range of seeds, fertilizers, and agricultural tools for all types of crops</p>
          </div>

          {/* Service Card 2 */}
          <div className="service-card">
            <div className="service-icon">🤖</div>
            <h3>AI Disease Detection</h3>
            <p>Upload leaf images and detect plant diseases using advanced AI technology</p>
          </div>

          {/* Service Card 3 */}
          <div className="service-card">
            <div className="service-icon">💡</div>
            <h3>Expert Solutions</h3>
            <p>Get personalized recommendations for disease treatment and prevention</p>
          </div>

          {/* Service Card 4 */}
          <div className="service-card">
            <div className="service-icon">📦</div>
            <h3>Fast Delivery</h3>
            <p>Quick delivery of agricultural products to your doorstep</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <ul className="features-list">
          <li>✓ Certified and high-quality agricultural products</li>
          <li>✓ AI-powered plant disease detection with high accuracy</li>
          <li>✓ Expert agricultural advice and solutions</li>
          <li>✓ Affordable prices and seasonal discounts</li>
          <li>✓ Easy online ordering and fast delivery</li>
          <li>✓ Customer support 24/7</li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Get Started Today</h2>
        <p>Join thousands of farmers using Agro Centre for their agricultural needs</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">
            Create Account
          </Link>
          <Link to="/products" className="btn btn-outline">
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
