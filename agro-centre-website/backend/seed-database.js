/**
 * Database Seeding Script
 * Run this once to populate the database with sample products
 * Command: node seed-database.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Sample products data with image URLs
const sampleProducts = [
  // SEEDS
  {
    name: 'Tomato Seeds - Hybrid F1',
    description: 'High-yield hybrid tomato seeds, disease resistant variety perfect for all seasons',
    price: 120,
    category: 'seeds',
    image: 'https://via.placeholder.com/300x300?text=Tomato+Seeds',
    stock: 150,
  },
  {
    name: 'Wheat Seeds - Premium Quality',
    description: 'Premium quality wheat seeds with high germination rate, suitable for all soil types',
    price: 85,
    category: 'seeds',
    image: 'https://via.placeholder.com/300x300?text=Wheat+Seeds',
    stock: 200,
  },
  {
    name: 'Carrot Seeds',
    description: 'Orange carrot seeds, sweet variety, excellent for vegetables gardens',
    price: 45,
    category: 'seeds',
    image: 'https://via.placeholder.com/300x300?text=Carrot+Seeds',
    stock: 100,
  },
  {
    name: 'Onion Seeds',
    description: 'Golden onion seeds, high yielding variety with good storage quality',
    price: 95,
    category: 'seeds',
    image: 'https://via.placeholder.com/300x300?text=Onion+Seeds',
    stock: 120,
  },
  {
    name: 'Chilli Seeds - Hot Red',
    description: 'Spicy red chilli seeds, high pungency, perfect for spice gardens',
    price: 150,
    category: 'seeds',
    image: 'https://via.placeholder.com/300x300?text=Chilli+Seeds',
    stock: 80,
  },

  // FERTILIZERS
  {
    name: 'NPK Fertilizer 10-10-10',
    description: 'Balanced nutrient fertilizer for all types of crops, promotes healthy growth',
    price: 450,
    category: 'fertilizers',
    image: 'https://via.placeholder.com/300x300?text=NPK+Fertilizer',
    stock: 200,
  },
  {
    name: 'DAP (Di-Ammonium Phosphate)',
    description: 'High phosphorus content, excellent for root development and flowering',
    price: 520,
    category: 'fertilizers',
    image: 'https://via.placeholder.com/300x300?text=DAP+Fertilizer',
    stock: 180,
  },
  {
    name: 'Urea Fertilizer 46%',
    description: 'High nitrogen content, promotes leafy growth, ideal for vegetables',
    price: 380,
    category: 'fertilizers',
    image: 'https://via.placeholder.com/300x300?text=Urea+Fertilizer',
    stock: 220,
  },
  {
    name: 'Potassium Chloride (MOP)',
    description: 'Pure potassium fertilizer, improves fruit quality and disease resistance',
    price: 480,
    category: 'fertilizers',
    image: 'https://via.placeholder.com/300x300?text=Potassium+Chloride',
    stock: 150,
  },
  {
    name: 'Organic Compost 50kg',
    description: 'Rich organic compost made from decomposed plant material, improves soil health',
    price: 320,
    category: 'fertilizers',
    image: 'https://via.placeholder.com/300x300?text=Organic+Compost',
    stock: 100,
  },

  // TOOLS
  {
    name: 'Hand Hoe - Steel Blade',
    description: 'Durable steel hand hoe for weeding and soil preparation, lightweight design',
    price: 280,
    category: 'tools',
    image: 'https://via.placeholder.com/300x300?text=Hand+Hoe',
    stock: 75,
  },
  {
    name: 'Garden Spade - Stainless Steel',
    description: 'Professional grade stainless steel spade, rust-resistant, long handle for comfort',
    price: 850,
    category: 'tools',
    image: 'https://via.placeholder.com/300x300?text=Garden+Spade',
    stock: 50,
  },
  {
    name: 'Pruning Shears - Heavy Duty',
    description: 'Sharp pruning shears for cutting branches and plants, ergonomic handles',
    price: 420,
    category: 'tools',
    image: 'https://via.placeholder.com/300x300?text=Pruning+Shears',
    stock: 60,
  },
  {
    name: 'Garden Fork - 4 Prong',
    description: 'Four-prong garden fork for digging and aerating soil, wooden handle',
    price: 650,
    category: 'tools',
    image: 'https://via.placeholder.com/300x300?text=Garden+Fork',
    stock: 45,
  },
  {
    name: 'Watering Can - 10 Liter',
    description: 'Large capacity watering can with sprinkle head, rust-proof metal body',
    price: 380,
    category: 'tools',
    image: 'https://via.placeholder.com/300x300?text=Watering+Can',
    stock: 90,
  },

  // PESTICIDES
  {
    name: 'Copper Fungicide 50%',
    description: 'Effective fungicide for preventing fungal diseases, suitable for organic farming',
    price: 550,
    category: 'pesticides',
    image: 'https://via.placeholder.com/300x300?text=Copper+Fungicide',
    stock: 70,
  },
  {
    name: 'Neem Oil Insecticide',
    description: 'Natural neem oil based insecticide, controls pests and mites, safe for beneficial insects',
    price: 420,
    category: 'pesticides',
    image: 'https://via.placeholder.com/300x300?text=Neem+Oil',
    stock: 120,
  },
  {
    name: 'Carbendazim Fungicide',
    description: 'Broad spectrum fungicide for various plant diseases, systemic action',
    price: 480,
    category: 'pesticides',
    image: 'https://via.placeholder.com/300x300?text=Carbendazim',
    stock: 95,
  },
  {
    name: 'Mancozeb 75% WP',
    description: 'Protective fungicide, prevents early and late blight, good for vegetables',
    price: 520,
    category: 'pesticides',
    image: 'https://via.placeholder.com/300x300?text=Mancozeb',
    stock: 85,
  },
  {
    name: 'Sulfur Powder',
    description: 'Natural sulfur powder for controlling powdery mildew, safe and effective',
    price: 280,
    category: 'pesticides',
    image: 'https://via.placeholder.com/300x300?text=Sulfur+Powder',
    stock: 110,
  },
];

// Connect to database and seed data
const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agro-centre';

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ MongoDB connected successfully');

    // Clear existing products (optional - comment out if you want to keep existing)
    await Product.deleteMany({});
    console.log('✓ Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✓ Successfully inserted ${insertedProducts.length} products`);

    // Show products by category
    const categories = ['seeds', 'fertilizers', 'tools', 'pesticides'];
    for (const category of categories) {
      const count = await Product.countDocuments({ category });
      console.log(`  • ${category}: ${count} products`);
    }

    // Show sample product
    console.log('\n📦 Sample Product:');
    const sample = await Product.findOne();
    console.log(sample);

    console.log('\n✓ Database seeding completed successfully!');
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('✓ Database connection closed');
    process.exit(0);
  }
};

// Run seeding
seedDatabase();
