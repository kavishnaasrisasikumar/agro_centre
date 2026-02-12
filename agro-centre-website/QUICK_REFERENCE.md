# Quick Reference - Database & Products

## Database Connection

```javascript
// Database Name: agro-centre
// Collections: users, products, predictions

// Connection String
mongodb://localhost:27017/agro-centre

// MongoDB Atlas
mongodb+srv://username:password@cluster.mongodb.net/agro-centre
```

## Add Products - 30 Second Setup

```bash
# 1. Start MongoDB (keep running)
mongod

# 2. Go to backend
cd backend

# 3. Run seed script - ADDS ALL PRODUCTS INSTANTLY
npm run seed

# 4. Done! Check frontend
# Frontend will show all products with images
```

## Product Data Structure

```javascript
{
  name: "Tomato Seeds",                          // Product name
  description: "Hybrid F1 variety",              // Details
  price: 120,                                     // In rupees (₹)
  category: "seeds",                              // seeds|fertilizers|tools|pesticides
  image: "https://via.placeholder.com/...",     // Image URL
  stock: 150,                                     // Available quantity
  createdAt: "2024-02-05T..."                   // Auto timestamp
}
```

## Valid Categories

| Category | Icon | Examples |
|----------|------|----------|
| seeds | 🌱 | Tomato, Wheat, Carrot, Onion, Chilli |
| fertilizers | 🧪 | NPK, DAP, Urea, Potassium, Compost |
| tools | 🔧 | Hoe, Spade, Pruning Shears, Fork, Watering Can |
| pesticides | 🚫 | Fungicide, Insecticide, Neem Oil, Sulfur |

## API Endpoints

```bash
# Get all products
GET http://localhost:5000/api/products

# Filter by category
GET http://localhost:5000/api/products?category=seeds
GET http://localhost:5000/api/products?category=fertilizers
GET http://localhost:5000/api/products?category=tools
GET http://localhost:5000/api/products?category=pesticides

# Get single product
GET http://localhost:5000/api/products/{product_id}
```

## Sample cURL Commands

```bash
# Get all products
curl http://localhost:5000/api/products | jq

# Get only seeds
curl "http://localhost:5000/api/products?category=seeds" | jq

# Count products by category
curl "http://localhost:5000/api/products?category=fertilizers" | jq '.count'
```

## MongoDB Shell Commands

```bash
mongosh
use agro-centre

# Count products
db.products.countDocuments()

# Count by category
db.products.countDocuments({ category: "seeds" })

# View all products
db.products.find()

# View with nice formatting
db.products.find().pretty()

# Find one product
db.products.findOne({ category: "seeds" })

# Find all seeds
db.products.find({ category: "seeds" })

# Add new product
db.products.insertOne({
  name: "Pepper Seeds",
  description: "Sweet pepper seeds",
  price: 130,
  category: "seeds",
  image: "https://via.placeholder.com/300x300?text=Pepper",
  stock: 80
})

# Update product price
db.products.updateOne(
  { name: "Tomato Seeds" },
  { $set: { price: 140 } }
)

# Delete product
db.products.deleteOne({ name: "Tomato Seeds" })

# Delete all products
db.products.deleteMany({})

# Clear database
db.dropDatabase()
```

## Filtering in Frontend

```javascript
// React Component Example
const [selectedCategory, setSelectedCategory] = useState('');

// Automatic filtering
<button onClick={() => setSelectedCategory('seeds')}>Seeds</button>
<button onClick={() => setSelectedCategory('fertilizers')}>Fertilizers</button>
<button onClick={() => setSelectedCategory('tools')}>Tools</button>
<button onClick={() => setSelectedCategory('pesticides')}>Pesticides</button>
<button onClick={() => setSelectedCategory('')}>All Products</button>

// API call with filter
const response = await getAllProducts(selectedCategory);
// Calls: GET /api/products?category=seeds
```

## Image URLs

```javascript
// Using Placeholder.com (Works everywhere)
"https://via.placeholder.com/300x300?text=Tomato+Seeds"
"https://via.placeholder.com/300x300?text=NPK+Fertilizer"
"https://via.placeholder.com/300x300?text=Hand+Hoe"

// Using Local Uploads
"/uploads/products/tomato-seeds.jpg"

// Using Cloudinary
"https://res.cloudinary.com/your-cloud/image/upload/v123/..."

// Using Data URI (Base64)
"data:image/jpeg;base64,/9j/4AAQSkZJRgABA..."
```

## What the Seed Script Does

When you run `npm run seed`:

1. ✅ Connects to MongoDB
2. ✅ Clears old products (prevents duplicates)
3. ✅ Inserts 20 sample products
   - 5 Seeds products
   - 5 Fertilizer products
   - 5 Tools products
   - 5 Pesticide products
4. ✅ Displays summary with counts
5. ✅ Shows sample product data

**All with one command!**

## Frontend Display

Products appear as cards with:
- 📸 Image (top)
- 📝 Product name
- 🏷️ Category badge
- 📄 Description
- 🔢 Stock status
- 💰 Price
- 🛒 Add to Cart button

All with responsive design and proper filtering!

## Useful Links

- MongoDB: https://www.mongodb.com/
- MongoDB Compass: https://www.mongodb.com/products/tools/compass
- Placeholder Images: https://placeholder.com/
- Cloudinary (Image Hosting): https://cloudinary.com/

---

**Everything Ready? Start here:**
```bash
npm run seed     # Add all products
npm start        # Start backend
# In another terminal:
npm start        # Start frontend
# Visit: http://localhost:3000/products
```
