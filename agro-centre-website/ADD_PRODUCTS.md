# Adding Products to Database

This guide explains how to populate the database with products and images.

## Quick Start - Automatic Seeding

### Step 1: Ensure Backend Dependencies are Installed
```bash
cd backend
npm install
```

### Step 2: Configure MongoDB Connection
Edit `backend/.env` and ensure MongoDB URI is set:
```env
MONGODB_URI=mongodb://localhost:27017/agro-centre
```

### Step 3: Run Seed Script
```bash
npm run seed
```

This will automatically:
- ✓ Connect to MongoDB
- ✓ Clear existing products (to avoid duplicates)
- ✓ Insert 20 sample products with 5 categories
- ✓ Display seeding results

**Expected Output:**
```
✓ MongoDB connected successfully
✓ Cleared existing products
✓ Successfully inserted 20 products
  • seeds: 5 products
  • fertilizers: 5 products
  • tools: 5 products
  • pesticides: 5 products
✓ Database seeding completed successfully!
```

## What Gets Added

### 🌱 Seeds (5 products)
- Tomato Seeds - Hybrid F1 (₹120)
- Wheat Seeds - Premium Quality (₹85)
- Carrot Seeds (₹45)
- Onion Seeds (₹95)
- Chilli Seeds - Hot Red (₹150)

### 🧪 Fertilizers (5 products)
- NPK Fertilizer 10-10-10 (₹450)
- DAP - Di-Ammonium Phosphate (₹520)
- Urea Fertilizer 46% (₹380)
- Potassium Chloride (₹480)
- Organic Compost 50kg (₹320)

### 🔧 Tools (5 products)
- Hand Hoe - Steel Blade (₹280)
- Garden Spade - Stainless Steel (₹850)
- Pruning Shears - Heavy Duty (₹420)
- Garden Fork - 4 Prong (₹650)
- Watering Can - 10 Liter (₹380)

### 🚫 Pesticides (5 products)
- Copper Fungicide 50% (₹550)
- Neem Oil Insecticide (₹420)
- Carbendazim Fungicide (₹480)
- Mancozeb 75% WP (₹520)
- Sulfur Powder (₹280)

## Manual Addition - Using MongoDB

### Option 1: Using MongoDB Compass (GUI)

1. Download and install [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
2. Connect to `mongodb://localhost:27017`
3. Navigate to `agro-centre` → `products` collection
4. Click "Insert Document"
5. Paste this template:

```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 500,
  "category": "seeds",
  "image": "https://via.placeholder.com/300x300?text=Product+Name",
  "stock": 100
}
```

6. Update the values and click Insert

**Valid Categories:** `seeds`, `fertilizers`, `tools`, `pesticides`

### Option 2: Using MongoDB Shell

```bash
# Start MongoDB shell
mongosh

# Switch to database
use agro-centre

# Insert single product
db.products.insertOne({
  name: "Tomato Seeds",
  description: "Hybrid tomato seeds",
  price: 120,
  category: "seeds",
  image: "https://via.placeholder.com/300x300?text=Tomato+Seeds",
  stock: 100
})

# Insert multiple products
db.products.insertMany([
  {
    name: "Product 1",
    description: "Description 1",
    price: 100,
    category: "seeds",
    image: "https://via.placeholder.com/300x300?text=Product1",
    stock: 50
  },
  {
    name: "Product 2",
    description: "Description 2",
    price: 200,
    category: "fertilizers",
    image: "https://via.placeholder.com/300x300?text=Product2",
    stock: 75
  }
])

# View all products
db.products.find()

# View by category
db.products.find({ category: "seeds" })

# Update a product
db.products.updateOne(
  { _id: ObjectId("...") },
  { $set: { price: 150 } }
)

# Delete a product
db.products.deleteOne({ _id: ObjectId("...") })
```

## Image URLs

We're using placeholder images from **https://placeholder.com**

Format: `https://via.placeholder.com/300x300?text=Product+Name`

### To Use Real Images:

**Option 1: Upload to Cloud**
- Use [Cloudinary](https://cloudinary.com) (free tier available)
- Or [Imgur](https://imgur.com)
- Get the image URL and use in product

**Option 2: Local Upload**
1. Place images in `backend/uploads/products/`
2. Use path: `/uploads/products/image-name.jpg`
3. Configure in Product model

**Option 3: Data URI (Small Images)**
- Convert image to base64
- Store directly in database
- Use `data:image/jpeg;base64,...`

## Verify Products in Frontend

1. Start backend: `npm start` (in backend folder)
2. Start frontend: `npm start` (in frontend folder)
3. Navigate to http://localhost:3000/products
4. Try filtering by category:
   - All Products
   - Seeds
   - Fertilizers
   - Tools
   - Pesticides

All products should appear with images and details!

## Troubleshooting

### Products not showing
```bash
# Check if products are in database
mongosh
use agro-centre
db.products.find().count()  # Should show 20
```

### Images not loading
- Check image URL is valid (try in new tab)
- Use placeholder.com URLs (guaranteed to work)
- Check browser console for errors (F12)

### Filter not working
- Ensure category is exactly: `seeds`, `fertilizers`, `tools`, or `pesticides`
- Check backend is running on port 5000
- Check frontend console for API errors

### Database connection error
- Ensure MongoDB is running
- Check MONGODB_URI in `.env`
- For MongoDB Atlas, verify connection string and IP whitelist

## Adding More Categories

Edit `backend/models/Product.js`:

```javascript
category: {
  type: String,
  enum: ['seeds', 'fertilizers', 'tools', 'pesticides', 'new_category'],
  required: true,
},
```

Then update filter buttons in `frontend/src/pages/Products.js`:

```javascript
const categories = ['seeds', 'fertilizers', 'tools', 'pesticides', 'new_category'];
```

## API Endpoints

```bash
# Get all products
curl http://localhost:5000/api/products

# Get products by category
curl "http://localhost:5000/api/products?category=seeds"

# Response:
{
  "success": true,
  "count": 5,
  "products": [
    {
      "_id": "...",
      "name": "Tomato Seeds",
      "description": "...",
      "price": 120,
      "category": "seeds",
      "image": "...",
      "stock": 100,
      "createdAt": "2024-..."
    }
  ]
}
```

## Next Steps

1. ✓ Run seed script: `npm run seed`
2. ✓ Start backend: `npm start`
3. ✓ Start frontend: `npm start`
4. ✓ Visit http://localhost:3000/products
5. ✓ Test category filters
6. ✓ Try adding more products manually if needed

Your Agro Centre products are now ready! 🌾
