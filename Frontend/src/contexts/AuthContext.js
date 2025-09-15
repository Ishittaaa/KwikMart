import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app start
    const token = localStorage.getItem('kwikmart_token');
    const savedUser = localStorage.getItem('kwikmart_user');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('kwikmart_token');
        localStorage.removeItem('kwikmart_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      
      localStorage.setItem('kwikmart_token', response.access_token);
      localStorage.setItem('kwikmart_user', JSON.stringify(response.user));
      
      setUser(response.user);
      return { success: true, user: response.user };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  const register = async (name, email, phone, password) => {
    console.log('AuthContext register called with:', { name, email, phone });
    try {
      console.log('Making API call to register...');
      const response = await authAPI.register(name, email, phone, password);
      console.log('API response:', response);
      
      localStorage.setItem('kwikmart_token', response.access_token);
      
      // For register, we need to create user object since backend doesn't return it
      const userData = { name, email, phone, role: 'user' };
      localStorage.setItem('kwikmart_user', JSON.stringify(userData));
      
      setUser(userData);
      console.log('User set in context:', userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Registration API error:', error);
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('kwikmart_token');
    localStorage.removeItem('kwikmart_user');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};