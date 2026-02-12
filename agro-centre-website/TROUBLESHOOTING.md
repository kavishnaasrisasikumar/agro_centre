# Products & Filtering - Troubleshooting Guide

## Issue: "No products found in this category"

### Cause 1: Products Not in Database
**Check:** Run in MongoDB shell:
```bash
mongosh
use agro-centre
db.products.find().count()
```

**Fix:** Add products using seed script:
```bash
cd backend
npm run seed
```

### Cause 2: Wrong Category Name
**Problem:** Filter buttons use category names that don't match database

**Check:** View category values:
```bash
mongosh
use agro-centre
db.products.find({}, { category: 1 })
```

**Fix:** Ensure exactly these categories (lowercase):
- `seeds`
- `fertilizers`
- `tools`
- `pesticides`

---

## Issue: Products Show But Images Don't Load

### Cause: Invalid Image URL
**Check:** Browser console (F12 → Console tab)
Look for 404 errors or failed image requests

**Fix Options:**

1. **Use placeholder URLs (recommended):**
   ```javascript
   image: "https://via.placeholder.com/300x300?text=Product+Name"
   ```

2. **Check image URL is valid:**
   - Copy URL to new browser tab
   - Should display an image, not 404

3. **Use local images:**
   - Place image in `backend/uploads/products/`
   - Use path: `/uploads/products/image.jpg`

---

## Issue: Frontend Can't Connect to Backend

### Check Backend is Running
```bash
# Terminal should show:
# ✓ MongoDB connected successfully
# 🌾 Agro Centre Server running on port 5000
```

### Check Port 5000 is Available
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
```

If already in use:
```bash
# Kill process on port 5000
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

### Check API URL in Frontend
File: `frontend/src/services/api.js`
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

Should be `http://localhost:5000/api` if backend on port 5000

### Check Browser Console
F12 → Network tab → Try filtering products
- Look for request to `/api/products?category=seeds`
- Check Status: should be 200, not 404 or 500

---

## Issue: Filtering Not Working

### Cause 1: MongoDB Connection Issue
**Check:** Backend console shows MongoDB connected
```
✓ MongoDB connected successfully
```

**Fix:** Ensure MongoDB is running and connection string is correct in `.env`

### Cause 2: Category Parameter Not Sent
**Check:** Browser → F12 → Network tab → Click filter button
Look at request URL:
- ✅ Correct: `http://localhost:5000/api/products?category=seeds`
- ❌ Wrong: `http://localhost:5000/api/products` (no category)

**Fix:** Check Products.js filtering code works

### Cause 3: Empty Collection
**Check:** Count products in MongoDB:
```bash
mongosh
use agro-centre
db.products.find({ category: "seeds" }).count()
```

**Fix:** Run seed script to add products:
```bash
npm run seed
```

---

## Issue: API Returns Error 500

### Check Backend Error Logs
Look at terminal running `npm start`
Should show error message

### Common Errors:

**"Cannot find module 'mongodb'"**
```bash
cd backend
npm install
```

**"ECONNREFUSED - MongoDB connection failed"**
```bash
# Start MongoDB
mongod
```

**"Category filter not working"**
Ensure category in database matches filter value (lowercase)

---

## Issue: Product Added But Not Visible

### Check Product in Database
```bash
mongosh
use agro-centre
db.products.find({ name: "Your Product Name" })
```

**Should show your product**

### Reload Frontend
1. Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
2. Or clear localStorage: F12 → Application → Storage → Clear All

---

## Quick Debugging Steps

### Step 1: Verify MongoDB
```bash
mongosh
use agro-centre
db.products.countDocuments()  # Should be > 0
```

### Step 2: Check API Directly
```bash
# Get all products
curl http://localhost:5000/api/products

# Get seeds only
curl "http://localhost:5000/api/products?category=seeds"
```

### Step 3: Check Frontend Console
F12 → Console tab
Should NOT show errors when loading `/products`

### Step 4: Verify Data Format
API response should be:
```json
{
  "success": true,
  "count": 5,
  "products": [
    {
      "_id": "...",
      "name": "...",
      "price": 120,
      "category": "seeds",
      "image": "...",
      "stock": 100
    }
  ]
}
```

---

## Complete Fresh Start

If everything is broken, start over:

```bash
# 1. Stop all servers (Ctrl+C in terminals)

# 2. Clear database
mongosh
use agro-centre
db.dropDatabase()
exit

# 3. Reinstall dependencies
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install

# 4. Seed fresh data
cd ../backend
npm run seed

# 5. Start backend
npm start

# 6. In new terminal, start frontend
cd ../frontend
npm start

# 7. Check http://localhost:3000/products
```

---

## Test Cases - Verify Everything Works

### ✅ Test 1: All Products Load
1. Visit http://localhost:3000/products
2. Click "All Products"
3. Should show 20 products

### ✅ Test 2: Filter by Seeds
1. Click "Seeds" button
2. Should show 5 seed products
3. All cards should have proper images

### ✅ Test 3: Filter by Fertilizers
1. Click "Fertilizers"
2. Should show 5 fertilizer products
3. Check prices are correct (450-520)

### ✅ Test 4: Filter by Tools
1. Click "Tools"
2. Should show 5 tool products
3. Check tool names and images

### ✅ Test 5: Filter by Pesticides
1. Click "Pesticides"
2. Should show 5 pesticide products
3. All images should load

### ✅ Test 6: Image Fallback
1. If image fails, should show placeholder
2. Check by intentionally breaking URL in database

---

## Performance Tips

### Speed Up Image Loading
```javascript
// Use WebP format
image: "image.webp"

// Use CDN instead of placeholder
image: "https://cdn.example.com/image.jpg"

// Compress images
// Use TinyPNG, ImageOptim, etc.
```

### Speed Up Database Queries
```javascript
// Add index in Product model
productSchema.index({ category: 1 });

// Then queries will be faster
db.products.find({ category: "seeds" })
```

---

## Still Not Working?

1. **Check All Three Running:**
   - MongoDB: `mongosh` should connect
   - Backend: Terminal shows "Server running on port 5000"
   - Frontend: Browser shows http://localhost:3000

2. **Check Network Tab (F12):**
   - All requests should be 200
   - No 404 or 500 errors

3. **Check Console (F12):**
   - No red error messages
   - Check API calls are being made

4. **Check Database:**
   - `db.products.find().count()` should be 20
   - Each product should have all fields

5. **Restart Everything:**
   ```bash
   # Stop all (Ctrl+C)
   # Then npm run seed && npm start (backend)
   # Then npm start (frontend in new terminal)
   ```

---

**All checks passed? Your products are ready to display! 🌾**
