# API Testing Guide

This guide helps you test the Agro Centre API endpoints.

## Using curl

### 1. Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Raj Farmer",
    "email": "raj@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Raj Farmer",
    "email": "raj@example.com"
  }
}
```

### 2. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "raj@example.com",
    "password": "password123"
  }'
```

### 3. Get Current User (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Get All Products
```bash
curl http://localhost:5000/api/products
```

### 5. Get Products by Category
```bash
curl "http://localhost:5000/api/products?category=seeds"
curl "http://localhost:5000/api/products?category=fertilizers"
curl "http://localhost:5000/api/products?category=tools"
curl "http://localhost:5000/api/products?category=pesticides"
```

### 6. Get Single Product
```bash
curl http://localhost:5000/api/products/PRODUCT_ID
```

### 7. Upload Image for Disease Detection (Protected)
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "image=@/path/to/leaf/image.jpg"
```

### 8. Get User's Predictions (Protected)
```bash
curl http://localhost:5000/api/predict \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 9. Get Specific Prediction (Protected)
```bash
curl http://localhost:5000/api/predict/PREDICTION_ID \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Using Postman

### Setup
1. Download and install [Postman](https://www.postman.com/downloads/)
2. Create a new collection called "Agro Centre API"
3. Set Base URL: `http://localhost:5000`

### Variables
1. Go to Collection Settings
2. Add variable: `token` = (leave empty, will be filled by script)
3. Add variable: `base_url` = `http://localhost:5000`

### Request Examples

**1. Register**
- Method: POST
- URL: `{{base_url}}/api/auth/register`
- Body (JSON):
```json
{
  "name": "John Farmer",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```
- Pre-request Script: (None)
- Tests:
```javascript
if (pm.response.code === 201) {
  pm.environment.set("token", pm.response.json().token);
}
```

**2. Login**
- Method: POST
- URL: `{{base_url}}/api/auth/login`
- Body (JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- Tests:
```javascript
if (pm.response.code === 200) {
  pm.environment.set("token", pm.response.json().token);
}
```

**3. Get Products**
- Method: GET
- URL: `{{base_url}}/api/products`
- Headers: (None needed)

**4. Upload Image for Prediction**
- Method: POST
- URL: `{{base_url}}/api/predict`
- Headers:
  - Authorization: `Bearer {{token}}`
- Body: form-data
  - Key: `image` (File)
  - Value: (Select an image file)

## Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Not authorized to access |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal server error |

## Error Response Examples

**Missing Token:**
```json
{
  "success": false,
  "message": "No token provided. Authorization denied."
}
```

**Invalid Credentials:**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**File Upload Error:**
```json
{
  "success": false,
  "message": "Only JPEG and PNG images are allowed"
}
```

## Tips

1. Always save the token after login/register
2. Include token in Authorization header for protected routes
3. Format: `Authorization: Bearer YOUR_TOKEN_HERE`
4. Tokens expire in 7 days
5. Keep sensitive data like passwords secure
6. Test on localhost first before deploying
