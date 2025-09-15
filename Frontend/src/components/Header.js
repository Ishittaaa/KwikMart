import React, { useState } from 'react';
import { Search, ShoppingCart, MapPin, User, Menu, Bell } from 'lucide-react';

const Header = ({ currentScreen, onNavigate, cartCount, user, onSearch, isMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  if (isMobile) {
    return (
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
        <div className="px-4 py-3">
          {/* Top row - Logo and actions */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">KwikMart</h1>
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>Deliver to Home</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </button>
              
              {user ? (
                <button 
                  className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                  onClick={() => onNavigate('profile')}
                >
                  <User className="w-5 h-5" />
                </button>
              ) : (
                <button 
                  className="px-3 py-1 text-xs bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                  onClick={() => onNavigate('login')}
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Search bar - only show on home screen */}
          {currentScreen === 'home' && (
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                />
              </div>
            </form>
          )}
        </div>

        {/* Notifications dropdown */}
        {showNotifications && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Notifications</h3>
              <div className="space-y-2">
                <div className="p-3 bg-primary-50 rounded-lg">
                  <p className="text-sm text-gray-700">🎉 Welcome to KwikMart! Get 20% off on your first order.</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">📦 Your order #1234 is out for delivery!</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }

  // Desktop Header
  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">KwikMart</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Deliver to 123 Main St, Your City</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar - only show on home screen */}
          {currentScreen === 'home' && (
            <div className="flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for products, brands and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-100 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
                  />
                </div>
              </form>
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            <button 
              className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            <button
              onClick={() => onNavigate('cart')}
              className="relative flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors btn-hover"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">{user.name || 'Profile'}</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="border-t border-gray-200">
          <div className="flex items-center space-x-8 py-3">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentScreen === 'home'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('products')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentScreen === 'products'
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              All Products
            </button>
            <div className="text-gray-300">|</div>
            <span className="text-sm text-gray-500">Categories:</span>
            <button className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Fruits & Vegetables</button>
            <button className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Dairy & Bakery</button>
            <button className="text-sm text-gray-600 hover:text-primary-600 transition-colors">Snacks & Beverages</button>
          </div>
        </nav>
      </div>

      {/* Desktop Notifications dropdown */}
      {showNotifications && (
        <div className="absolute top-full right-8 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 mt-2">
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Notifications</h3>
            <div className="space-y-3">
              <div className="p-3 bg-primary-50 rounded-lg border-l-4 border-primary-500">
                <p className="text-sm text-gray-700 font-medium">🎉 Welcome Offer!</p>
                <p className="text-xs text-gray-600 mt-1">Get 20% off on your first order. Use code: WELCOME20</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-gray-700 font-medium">📦 Order Update</p>
                <p className="text-xs text-gray-600 mt-1">Your order #1234 is out for delivery!</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-gray-700 font-medium">⚡ Flash Sale</p>
                <p className="text-xs text-gray-600 mt-1">50% off on electronics. Limited time offer!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;