import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomeScreen from './components/HomeScreen';
import ProductListScreen from './components/ProductListScreen';
import CartScreen from './components/CartScreen';
import ProfileScreen from './components/ProfileScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import AdminDashboard from './components/AdminDashboard';
import { useMediaQuery } from './hooks/useMediaQuery';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Check for existing user session and simulate app loading
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem('quickmart_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        // Check if user is admin
        if (userData.email === 'admin@quickmart.com') {
          setCurrentScreen('admin');
        } else {
          setCurrentScreen('home');
        }
      }
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        }];
      }
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity === 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleToggleWishlist = (product) => {
    setWishlistItems(prevItems => {
      const isInWishlist = prevItems.some(item => item.id === product.id);
      if (isInWishlist) {
        return prevItems.filter(item => item.id !== product.id);
      } else {
        return [...prevItems, product];
      }
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('quickmart_user', JSON.stringify(userData));
    // Check if user is admin
    if (userData.email === 'admin@quickmart.com') {
      setCurrentScreen('admin');
    } else {
      setCurrentScreen('home');
    }
  };

  const handleRegister = (userData) => {
    setUser(userData);
    localStorage.setItem('quickmart_user', JSON.stringify(userData));
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('quickmart_user');
    setCurrentScreen('login');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setCurrentScreen('products');
    }
  };

  const renderCurrentScreen = () => {
    // If user is not logged in, only show login/register screens
    if (!user) {
      switch (currentScreen) {
        case 'register':
          return (
            <RegisterScreen
              onNavigate={handleNavigate}
              onRegister={handleRegister}
            />
          );
        default:
          return (
            <LoginScreen
              onNavigate={handleNavigate}
              onLogin={handleLogin}
            />
          );
      }
    }

    // If user is admin, show admin dashboard
    if (user.email === 'admin@quickmart.com') {
      return (
        <AdminDashboard
          onNavigate={handleNavigate}
          user={user}
          onLogout={handleLogout}
          isMobile={isMobile}
        />
      );
    }

    // If user is logged in, show app screens
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            cartCount={cartCount}
            onAddToCart={handleAddToCart}
            wishlistItems={wishlistItems}
            onToggleWishlist={handleToggleWishlist}
            isMobile={isMobile}
          />
        );
      case 'products':
        return (
          <ProductListScreen
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            wishlistItems={wishlistItems}
            onToggleWishlist={handleToggleWishlist}
            searchQuery={searchQuery}
            isMobile={isMobile}
          />
        );
      case 'cart':
        return (
          <CartScreen
            onNavigate={handleNavigate}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            isMobile={isMobile}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            onNavigate={handleNavigate}
            wishlistItems={wishlistItems}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
            user={user}
            onLogout={handleLogout}
            isMobile={isMobile}
          />
        );
      default:
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            cartCount={cartCount}
            onAddToCart={handleAddToCart}
            wishlistItems={wishlistItems}
            onToggleWishlist={handleToggleWishlist}
            isMobile={isMobile}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">QuickMart</h2>
          <p className="text-gray-600">Loading your shopping experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && user.email !== 'admin@quickmart.com' && (
        <Header 
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          cartCount={cartCount}
          user={user}
          onSearch={handleSearch}
          isMobile={isMobile}
        />
      )}
      
      <main className={`${isMobile && user && user.email !== 'admin@quickmart.com' ? 'pb-20' : user && user.email === 'admin@quickmart.com' ? '' : 'pt-4'} transition-all duration-300`}>
        {renderCurrentScreen()}
      </main>

      {isMobile && user && user.email !== 'admin@quickmart.com' && (
        <Navigation
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          cartCount={cartCount}
        />
      )}
    </div>
  );
}

export default App;