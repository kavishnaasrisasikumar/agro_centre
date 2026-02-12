/**
 * Main App Component
 * Routes and layout for the application
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import DiseaseDetection from './pages/DiseaseDetection';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/detect-disease" element={<DiseaseDetection />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
