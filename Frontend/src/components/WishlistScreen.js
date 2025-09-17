import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { formatPriceShort } from '../utils/currency';
import { wishlistAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const WishlistScreen = ({ onNavigate, onAddToCart, wishlistItems, onRemoveFromWishlist, isMobile }) => {
  const { user } = useAuth();

  const handleRemoveFromWishlist = (productId) => {
    // Use the prop function from App.js
    onRemoveFromWishlist(productId);
  };

  const handleAddToCart = (item) => {
    onAddToCart(item);
    // Optionally remove from wishlist after adding to cart
    // handleRemoveFromWishlist(item.id);
  };

  const WishlistItem = ({ item }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{item.name}</h3>
          <p className="text-sm font-bold text-gray-800 mt-1">{formatPriceShort(item.price)}</p>
          <p className="text-xs text-gray-500 mt-1">{item.category}</p>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={() => handleAddToCart(item)}
            className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => handleRemoveFromWishlist(item.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className={`min-h-screen bg-gray-50 ${isMobile ? 'pb-20' : ''}`}>
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 py-4 flex items-center space-x-3">
            <button
              onClick={() => onNavigate('home')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">My Wishlist</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Please Login</h2>
          <p className="text-gray-600 text-center mb-8">
            You need to login to view your wishlist
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors btn-hover"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isMobile ? 'pb-20' : ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-40">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('home')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">My Wishlist</h1>
          </div>
          <span className="text-sm text-gray-600">{wishlistItems.length} items</span>
        </div>
      </div>

      <div className={`${isMobile ? 'px-4' : 'max-w-4xl mx-auto px-4'} py-6`}>
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 text-center mb-8">
              Save items you love to your wishlist and shop them later
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors btn-hover"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Saved Items</h2>
              <button
                onClick={() => {
                  wishlistItems.forEach(item => handleAddToCart(item));
                }}
                className="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Add All to Cart
              </button>
            </div>

            {wishlistItems.map((item) => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistScreen;