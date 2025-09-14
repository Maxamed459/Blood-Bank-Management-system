# Blood Bank Management System API

A comprehensive REST API for managing blood bank operations, user authentication, and blood inventory management. This documentation is designed for frontend developers to integrate with the API.

## 🌐 API Base URL

```
Production: https://your-api-domain.com
Development: http://localhost:3000
```

## 📋 API Overview

### Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Response Format
All API responses follow this consistent format:
```json
{
  "success": true|false,
  "message": "Description of the operation",
  "data": {}, // Response data (if applicable)
  "token": "jwt_token" // Only for auth endpoints
}
```

## 🔐 Authentication Endpoints

### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "password123",
  "blood_type": "O_POSITIVE",
  "gender": "MALE"
}
```

**Blood Types:** `A_POSITIVE`, `A_NEGATIVE`, `B_POSITIVE`, `B_NEGATIVE`, `O_POSITIVE`, `O_NEGATIVE`, `AB_POSITIVE`, `AB_NEGATIVE`

**Genders:** `MALE`, `FEMALE`

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "newUser": {
    "id": "user_id",
    "fullname": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "blood_type": "O_POSITIVE",
    "role": "USER",
    "gender": "MALE",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

**Status Codes:**
- `201` - User created successfully
- `400` - Missing required fields or user already exists
- `500` - Internal server error

---

### POST `/api/auth/login`
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "user": {
    "id": "user_id",
    "fullname": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "blood_type": "O_POSITIVE",
    "role": "USER",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

**Status Codes:**
- `200` - Login successful
- `400` - Invalid credentials
- `500` - Internal server error

---

### POST `/api/auth/register-admin`
Register a new admin account. **Requires authentication and admin role.**

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:** Same as user registration

**Response (201):** Same as user registration but with `"role": "ADMIN"`

**Status Codes:**
- `201` - Admin created successfully
- `400` - Missing required fields or user already exists
- `401` - Authentication required
- `403` - Admin access required
- `500` - Internal server error

---

### POST `/api/auth/register-staff`
Register a new staff account. **Requires authentication and admin role.**

**Headers:**
```
Authorization: Bearer <admin_jwt_token>
```

**Request Body:** Same as user registration

**Response (201):** Same as user registration but with `"role": "STAFF"`

**Status Codes:**
- `201` - Staff created successfully
- `400` - Missing required fields or user already exists
- `401` - Authentication required
- `403` - Admin access required
- `500` - Internal server error

---

### GET `/api/auth/profile`
Get current user's profile information. **Requires authentication.**

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "user": {
    "id": "user_id",
    "fullname": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "blood_type": "O_POSITIVE",
    "role": "USER",
    "gender": "MALE",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Profile retrieved successfully
- `401` - Authentication required
- `500` - Internal server error

---

### GET `/api/auth/users/stream`
Get all users (streaming response). **Requires authentication.**

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):** Streaming JSON response
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "users": [
    {
      "id": "user_id",
      "fullname": "John Doe",
      "email": "john@example.com",
      "username": "johndoe",
      "blood_type": "O_POSITIVE",
      "role": "USER",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Users retrieved successfully
- `401` - Authentication required
- `500` - Internal server error

## 🩸 Blood Management Endpoints

### POST `/api/blood`
Add new blood record to inventory. **Requires authentication and staff/admin role.**

**Headers:**
```
Authorization: Bearer <staff_or_admin_jwt_token>
```

**Request Body:**
```json
{
  "type": "O_POSITIVE",
  "quantity": 500.5,
  "donorId": "donor_user_id"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Blood added successfully",
  "data": {
    "id": "blood_record_id",
    "type": "O_POSITIVE",
    "quantity": 500.5,
    "donorId": "donor_user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status Codes:**
- `201` - Blood record created successfully
- `400` - Missing required fields
- `401` - Authentication required
- `403` - Staff/Admin access required
- `404` - Donor not found
- `500` - Internal server error

---

### GET `/api/blood/stream`
Get all blood records (streaming response). **Requires authentication and staff/admin role.**

**Headers:**
```
Authorization: Bearer <staff_or_admin_jwt_token>
```

**Response (200):** Streaming JSON response
```json
{
  "success": true,
  "message": "All blood records retrieved successfully",
  "data": [
    {
      "type": "O_POSITIVE",
      "quantity": 500.5,
      "donorId": "donor_user_id"
    }
  ]
}
```

**Status Codes:**
- `200` - Blood records retrieved successfully
- `401` - Authentication required
- `403` - Staff/Admin access required
- `404` - No blood records found
- `500` - Internal server error

---

### GET `/api/blood/:id`
Get specific blood record by ID. **Requires authentication and staff/admin role.**

**Headers:**
```
Authorization: Bearer <staff_or_admin_jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Blood record retrieved successfully",
  "data": {
    "id": "blood_record_id",
    "type": "O_POSITIVE",
    "quantity": 500.5,
    "donorId": "donor_user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Blood record retrieved successfully
- `401` - Authentication required
- `403` - Staff/Admin access required
- `404` - Blood record not found
- `500` - Internal server error

---

### GET `/api/blood/type/:type`
Get blood records by blood type. **Requires authentication and staff/admin role.**

**Headers:**
```
Authorization: Bearer <staff_or_admin_jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Blood records retrieved successfully",
  "data": [
    {
      "id": "blood_record_id",
      "type": "O_POSITIVE",
      "quantity": 500.5,
      "donorId": "donor_user_id",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Blood records retrieved successfully
- `400` - Blood type is required
- `401` - Authentication required
- `403` - Staff/Admin access required
- `404` - No blood records found for specified type
- `500` - Internal server error

---

### PUT `/api/blood/:id`
Update blood record. **Requires authentication and staff/admin role.**

**Headers:**
```
Authorization: Bearer <staff_or_admin_jwt_token>
```

**Request Body:**
```json
{
  "type": "O_POSITIVE",
  "quantity": 750.0,
  "donorId": "new_donor_user_id"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Blood record updated successfully",
  "data": {
    "id": "blood_record_id",
    "type": "O_POSITIVE",
    "quantity": 750.0,
    "donorId": "new_donor_user_id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Blood record updated successfully
- `400` - Missing required fields
- `401` - Authentication required
- `403` - Staff/Admin access required
- `404` - Blood record not found
- `500` - Internal server error

---

### DELETE `/api/blood/:id`
Delete blood record. **Requires authentication and staff/admin role.**

**Headers:**
```
Authorization: Bearer <staff_or_admin_jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Blood record deleted successfully"
}
```

**Status Codes:**
- `200` - Blood record deleted successfully
- `401` - Authentication required
- `403` - Staff/Admin access required
- `404` - Blood record not found
- `500` - Internal server error

## 📊 Data Models

### User Model
```typescript
{
  id: string;           // Unique identifier (CUID)
  fullname: string;     // User's full name
  email: string;        // Unique email address
  username: string;     // Unique username
  password: string;     // Hashed password
  blood_type: BloodType; // User's blood type
  gender: Gender;       // User's gender
  role: Role;          // User role (USER, ADMIN, STAFF)
  createdAt: DateTime;  // Account creation timestamp
  updatedAt: DateTime;  // Last update timestamp
}
```

### Blood Model
```typescript
{
  id: string;           // Unique identifier (CUID)
  type: BloodType;      // Blood type
  quantity: number;     // Blood quantity in units
  donorId: string;      // Reference to donor user
  donor: User;          // Donor user object
  createdAt: DateTime;  // Record creation timestamp
  updatedAt: DateTime;  // Last update timestamp
}
```

### Enums

**BloodType:**
- `A_POSITIVE`, `A_NEGATIVE`
- `B_POSITIVE`, `B_NEGATIVE`
- `O_POSITIVE`, `O_NEGATIVE`
- `AB_POSITIVE`, `AB_NEGATIVE`

**Gender:**
- `MALE`, `FEMALE`

**Role:**
- `USER` - Regular user (default)
- `ADMIN` - Administrator
- `STAFF` - Staff member

## 🔒 Authentication & Authorization

### JWT Token
- **Expiration:** 7 days
- **Algorithm:** HS256
- **Payload:** `{ userId: string }`

### Role-Based Access Control

| Endpoint | USER | STAFF | ADMIN |
|----------|------|-------|-------|
| `/api/auth/register` | ✅ | ✅ | ✅ |
| `/api/auth/login` | ✅ | ✅ | ✅ |
| `/api/auth/profile` | ✅ | ✅ | ✅ |
| `/api/auth/register-admin` | ❌ | ❌ | ✅ |
| `/api/auth/register-staff` | ❌ | ❌ | ✅ |
| `/api/auth/users/stream` | ✅ | ✅ | ✅ |
| `/api/blood/*` | ❌ | ✅ | ✅ |

## 📝 Error Handling

### Common Error Responses

**400 Bad Request**
```json
{
  "success": false,
  "message": "Missing required fields or validation error"
}
```

**401 Unauthorized**
```json
{
  "success": false,
  "message": "Access denied. No token provided. please login to get a token"
}
```

**403 Forbidden**
```json
{
  "success": false,
  "message": "Access denied. Admins only."
}
```

**404 Not Found**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Something went wrong!",
  "error": "Error details (development only)"
}
```

## 🧪 Frontend Integration Examples

### JavaScript/TypeScript Examples

**Register a new user:**
```javascript
const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullname: "John Doe",
      email: "john@example.com",
      username: "johndoe",
      password: "password123",
      blood_type: "O_POSITIVE",
      gender: "MALE"
    })
  });
  
  const data = await response.json();
  if (data.success) {
    // Store token in localStorage or state management
    localStorage.setItem('token', data.token);
    return data;
  }
  throw new Error(data.message);
};
```

**Login:**
```javascript
const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  if (data.success) {
    localStorage.setItem('token', data.token);
    return data;
  }
  throw new Error(data.message);
};
```

**Get user profile (with authentication):**
```javascript
const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
  
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  return data;
};
```

**Add blood record (staff/admin only):**
```javascript
const addBloodRecord = async (bloodData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE_URL}/api/blood`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: "O_POSITIVE",
      quantity: 500.5,
      donorId: "donor_user_id"
    })
  });
  
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.message);
  }
  return data;
};
```

### React Hook Example

```javascript
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserProfile()
        .then(data => setUser(data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, login, logout, loading };
};
```

## 🔧 Frontend Configuration

### Environment Variables
Set up your frontend environment variables:
```env
REACT_APP_API_URL=https://your-api-domain.com
# or for development
REACT_APP_API_URL=http://localhost:3000
```

### Axios Configuration Example
```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## 📱 Mobile App Integration

### React Native Example
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://your-api-domain.com';

const apiCall = async (endpoint, options = {}) => {
  const token = await AsyncStorage.getItem('token');
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'API call failed');
  }
  
  return data;
};

// Usage
const loginUser = async (email, password) => {
  const data = await apiCall('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  if (data.success) {
    await AsyncStorage.setItem('token', data.token);
  }
  
  return data;
};
```

## 🎯 Best Practices for Frontend Integration

### 1. Error Handling
```javascript
const handleApiError = (error) => {
  if (error.response?.status === 401) {
    // Redirect to login
    router.push('/login');
  } else if (error.response?.status === 403) {
    // Show access denied message
    toast.error('Access denied. Insufficient permissions.');
  } else if (error.response?.status >= 500) {
    // Show server error message
    toast.error('Server error. Please try again later.');
  } else {
    // Show specific error message
    toast.error(error.message || 'An error occurred');
  }
};
```

### 2. Loading States
```javascript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await api.get('/api/blood/stream');
    setBloodRecords(data.data);
  } catch (error) {
    handleApiError(error);
  } finally {
    setLoading(false);
  }
};
```

### 3. Form Validation
```javascript
const validateBloodType = (type) => {
  const validTypes = [
    'A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE',
    'O_POSITIVE', 'O_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE'
  ];
  return validTypes.includes(type);
};

const validateUserForm = (formData) => {
  const errors = {};
  
  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Valid email is required';
  }
  
  if (!formData.blood_type || !validateBloodType(formData.blood_type)) {
    errors.blood_type = 'Valid blood type is required';
  }
  
  return errors;
};
```

## 📊 Data Flow Examples

### User Registration Flow
```javascript
const registrationFlow = async (userData) => {
  try {
    // 1. Validate form data
    const errors = validateUserForm(userData);
    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }
    
    // 2. Call API
    const response = await api.post('/api/auth/register', userData);
    
    // 3. Store token and user data
    localStorage.setItem('token', response.token);
    setUser(response.newUser);
    
    // 4. Redirect to dashboard
    router.push('/dashboard');
    
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

### Blood Inventory Management Flow
```javascript
const bloodManagementFlow = {
  // Get all blood records
  getAllBlood: async () => {
    const response = await api.get('/api/blood/stream');
    return response.data;
  },
  
  // Add new blood record
  addBlood: async (bloodData) => {
    const response = await api.post('/api/blood', bloodData);
    return response.data;
  },
  
  // Update blood record
  updateBlood: async (id, bloodData) => {
    const response = await api.put(`/api/blood/${id}`, bloodData);
    return response.data;
  },
  
  // Delete blood record
  deleteBlood: async (id) => {
    const response = await api.delete(`/api/blood/${id}`);
    return response;
  }
};
```

---

**API Version:** 2.0.0  
**Last Updated:** January 2025  
**Target Audience:** Frontend Developers
