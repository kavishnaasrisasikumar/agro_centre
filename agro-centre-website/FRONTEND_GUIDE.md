# Frontend Development Guide

## Component Structure

### Page Components
Each page component is in `src/pages/` and represents a full page route.

**Home.js**
- Hero section with call-to-action
- Services showcase
- Features list
- Getting started section

**Register.js & Login.js**
- Form validation
- API integration
- Token storage
- Redirect on success

**Products.js**
- Category filtering
- Product grid display
- Error handling
- Loading states

**DiseaseDetection.js**
- Drag & drop file upload
- Image preview
- AI prediction display
- Recommendation system

### Reusable Components
Located in `src/components/`

**Navbar.js**
- Navigation links
- User menu with logout
- Mobile hamburger menu
- Logo

**Footer.js**
- Quick links
- Product categories
- Contact information
- Copyright

## State Management

The app uses React's built-in `useState` hook for state management.

Example from Products.js:
```javascript
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
```

## API Integration

All API calls go through `src/services/api.js`.

Example:
```javascript
import { loginUser } from '../services/api';

// In component
const handleLogin = async (credentials) => {
  try {
    const response = await loginUser(credentials);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

## Authentication Flow

1. **User logs in** → Credentials sent to backend
2. **Token received** → Stored in localStorage
3. **Protected routes** → Token sent in Authorization header
4. **Auto attach** → Axios interceptor adds token automatically
5. **Logout** → Token removed from localStorage

## Adding New Pages

1. Create file in `src/pages/NewPage.js`
2. Add route in `src/App.js`:
   ```javascript
   import NewPage from './pages/NewPage';
   
   // In Routes
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Add navigation link in `Navbar.js`
4. Create styles in `src/styles/newpage.css`

## Adding New API Calls

1. Add function in `src/services/api.js`:
   ```javascript
   export const getNewData = () => {
     return apiClient.get('/new-endpoint');
   };
   ```

2. Use in component:
   ```javascript
   import { getNewData } from '../services/api';
   
   useEffect(() => {
     const fetchData = async () => {
       const response = await getNewData();
     };
     fetchData();
   }, []);
   ```

## Styling

- Global styles: `src/styles/global.css`
- Component-specific styles: `src/styles/[component].css`
- CSS variables for colors: `:root { --primary-color: ... }`
- Mobile-first responsive design with media queries

## Common Components Structure

### Form Component
```javascript
function MyForm() {
  const [formData, setFormData] = useState({ /* ... */ });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleInputChange = (e) => {
    // Update form state
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate and submit
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### List Component
```javascript
function MyList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Fetch items
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  
  return (
    <div>
      {items.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}
```

## Build for Production

```bash
cd frontend
npm run build
```

Creates optimized build in `build/` folder.

## Debugging Tips

1. **Check Browser Console** - F12 or Right-click → Inspect → Console
2. **React DevTools** - Install browser extension for React debugging
3. **Network Tab** - Check API requests and responses
4. **localStorage** - Check stored token: `localStorage.getItem('token')`
5. **Redux DevTools** - Can be added for advanced state management

## Performance Tips

1. Use `React.memo` for expensive components
2. Implement lazy loading for images
3. Code splitting with `React.lazy`
4. Optimize re-renders with `useCallback`
5. Use `useEffect` cleanup functions

## Best Practices

1. Keep components small and focused
2. Use meaningful variable names
3. Add comments for complex logic
4. Handle loading and error states
5. Validate user input
6. Use semantic HTML
7. Make forms accessible
8. Test on mobile devices

## Troubleshooting

**Pages not loading:**
- Check console for errors
- Verify route path matches
- Check if component imports correctly

**API calls failing:**
- Check backend is running
- Verify API_BASE_URL in api.js
- Check network tab in DevTools
- Verify token is being sent

**Styling issues:**
- Check CSS file is imported
- Verify class names match
- Use DevTools element inspector
- Check media queries for mobile

**State not updating:**
- Ensure useState is imported
- Don't mutate state directly
- Use setState function
- Check useEffect dependencies
