import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kwikmart_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('kwikmart_token');
      localStorage.removeItem('kwikmart_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    console.log('API: Making login request to:', `${API_BASE_URL}/auth/login`);
    const response = await api.post('/auth/login', { email, password });
    console.log('API: Login response:', response.data);
    return response.data;
  },
  
  register: async (name, email, phone, password) => {
    console.log('API: Making register request to:', `${API_BASE_URL}/auth/register`);
    console.log('API: Register payload:', { name, email, phone, password: '***' });
    const response = await api.post('/auth/register', { name, email, phone, password });
    console.log('API: Register response:', response.data);
    return response.data;
  }
};

// Products API
export const productsAPI = {
  getAll: async (category = null, search = null, limit = 50) => {
    const params = {};
    if (category) params.category = category;
    if (search) params.search = search;
    if (limit) params.limit = limit;
    
    const response = await api.get('/products/', { params });
    return response.data;
  },
  
  getFeatured: async () => {
    const response = await api.get('/products/featured');
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },
  
  getById: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  }
};

// Wishlist API
export const wishlistAPI = {
  get: async () => {
    const response = await api.get('/wishlist/');
    return response.data;
  },
  
  add: async (productId) => {
    const response = await api.post('/wishlist/add', { product_id: productId });
    return response.data;
  },
  
  remove: async (productId) => {
    const response = await api.delete(`/wishlist/remove/${productId}`);
    return response.data;
  }
};

// Admin API
export const adminAPI = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
  
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },
  
  getProducts: async () => {
    const response = await api.get('/admin/products');
    return response.data;
  },
  
  // User CRUD
  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },
  
  updateUser: async (userId, userData) => {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  },
  
  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },
  
  // Product CRUD
  createProduct: async (productData) => {
    const response = await api.post('/admin/products', productData);
    return response.data;
  },
  
  updateProduct: async (productId, productData) => {
    const response = await api.put(`/admin/products/${productId}`, productData);
    return response.data;
  },
  
  deleteProduct: async (productId) => {
    const response = await api.delete(`/admin/products/${productId}`);
    return response.data;
  }
};

export default api;