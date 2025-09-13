import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Plus, RotateCcw } from 'lucide-react';
import { formatPriceShort } from '../utils/currency';

const HomeScreen = ({ onNavigate, cartCount, onAddToCart, wishlistItems, onToggleWishlist, isMobile }) => {
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const categoryScrollRef = useRef(null);
  const [categoryScrollPosition, setCategoryScrollPosition] = useState(0);

  const categories = [
    { id: 1, name: 'Fruits & Vegetables', icon: '🍎', color: 'bg-green-100 text-green-700', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300' },
    { id: 2, name: 'Dairy & Bakery', icon: '🥛', color: 'bg-blue-100 text-blue-700', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300' },
    { id: 3, name: 'Snacks & Beverages', icon: '🥤', color: 'bg-orange-100 text-orange-700', image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300' },
    { id: 4, name: 'Beauty & Personal Care', icon: '💄', color: 'bg-pink-100 text-pink-700', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300' },
    { id: 5, name: 'Electronics', icon: '📱', color: 'bg-purple-100 text-purple-700', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300' },
    { id: 6, name: 'Home & Kitchen', icon: '🏠', color: 'bg-yellow-100 text-yellow-700', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300' },
    { id: 7, name: 'Fashion', icon: '👕', color: 'bg-indigo-100 text-indigo-700', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300' },
    { id: 8, name: 'Sports & Fitness', icon: '⚽', color: 'bg-red-100 text-red-700', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300' },
  ];

  const dailyDeals = [
    {
      id: 1,
      title: '50% Off Fresh Fruits',
      subtitle: 'Limited Time Offer!',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800',
      discount: '50%',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 2,
      title: 'Buy 2 Get 1 Free',
      subtitle: 'On all dairy products',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800',
      discount: 'B2G1',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      title: 'Electronics Sale',
      subtitle: '30% off premium gadgets',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
      discount: '30%',
      color: 'from-purple-500 to-purple-600'
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Fresh Red Apples',
      price: 120,
      originalPrice: 160,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300',
      isVeg: true,
      packSize: '1 kg Pack',
      discount: 25,
      badge: 'Fresh'
    },
    {
      id: 2,
      name: 'Organic Carrots',
      price: 80,
      image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=300',
      isVeg: true,
      packSize: '500g Pack',
      badge: 'Organic'
    },
    {
      id: 3,
      name: 'Fresh Milk',
      price: 65,
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300',
      isVeg: true,
      packSize: '1L Pack',
      badge: 'Farm Fresh'
    },
    {
      id: 4,
      name: 'Premium Basmati Rice',
      price: 350,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
      isVeg: true,
      packSize: '5kg Pack',
      badge: 'Premium'
    },
    {
      id: 5,
      name: 'Mixed Dry Fruits',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300',
      isVeg: true,
      packSize: '250g Pack',
      discount: 25,
      badge: 'Bestseller'
    },
    {
      id: 6,
      name: 'Whole Wheat Bread',
      price: 45,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300',
      isVeg: true,
      packSize: '1 Loaf',
      badge: 'Fresh'
    },
  ];

  const previouslyBought = [
    {
      id: 101,
      name: 'Tata Salt',
      price: 25,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
      isVeg: true,
      packSize: '1kg Pack',
      lastBought: '2 weeks ago'
    },
    {
      id: 102,
      name: 'Amul Butter',
      price: 55,
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300',
      isVeg: true,
      packSize: '100g Pack',
      lastBought: '1 week ago'
    },
    {
      id: 103,
      name: 'Maggi Noodles',
      price: 14,
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300',
      isVeg: true,
      packSize: '70g Pack',
      lastBought: '3 days ago'
    },
  ];

  const categoryProducts = {
    'Fruits & Vegetables': [
      { id: 201, name: 'Bananas', price: 40, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300', isVeg: true, packSize: '1 dozen' },
      { id: 202, name: 'Tomatoes', price: 30, image: 'https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=300', isVeg: true, packSize: '500g' },
      { id: 203, name: 'Onions', price: 25, image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=300', isVeg: true, packSize: '1kg' },
      { id: 204, name: 'Potatoes', price: 20, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300', isVeg: true, packSize: '1kg' },
    ],
    'Dairy & Bakery': [
      { id: 301, name: 'Paneer', price: 80, image: 'https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=300', isVeg: true, packSize: '200g' },
      { id: 302, name: 'Yogurt', price: 25, image: 'https://images.unsplash.com/photo-1571212515416-fca88c2d2c3e?w=300', isVeg: true, packSize: '400g' },
      { id: 303, name: 'Cheese Slices', price: 120, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300', isVeg: true, packSize: '200g' },
      { id: 304, name: 'Brown Bread', price: 35, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300', isVeg: true, packSize: '1 Loaf' },
    ],
    'Snacks & Beverages': [
      { id: 401, name: 'Coca Cola', price: 40, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300', isVeg: true, packSize: '600ml' },
      { id: 402, name: 'Lays Chips', price: 20, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300', isVeg: true, packSize: '52g' },
      { id: 403, name: 'Biscuits', price: 25, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300', isVeg: true, packSize: '200g' },
      { id: 404, name: 'Orange Juice', price: 60, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300', isVeg: true, packSize: '1L' },
    ],
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDealIndex(prev => (prev + 1) % dailyDeals.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [dailyDeals.length]);

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const handleImageLoad = (productId) => {
    setLoadedImages(prev => new Set([...prev, productId]));
  };

  const ProductCard = ({ product, showAnimation = true }) => (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${showAnimation ? 'animate-slide-up' : ''}`}>
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-300 hover:scale-105 ${
            loadedImages.has(product.id) ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => handleImageLoad(product.id)}
        />
        {!loadedImages.has(product.id) && (
          <div className="absolute inset-0 bg-gray-200 shimmer"></div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && (
            <span className="px-2 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
              {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => onToggleWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200 hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isInWishlist(product.id)
                ? 'fill-red-500 text-red-500'
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>

        {/* Quick add button */}
        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-3 right-3 p-2 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-200 hover:scale-110 btn-hover"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 flex-1">
            {product.name}
          </h3>
          {product.isVeg && (
            <div className="ml-2 w-4 h-4 border-2 border-green-600 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 mb-2">{product.packSize}</p>



        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-800">{formatPriceShort(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {formatPriceShort(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${isMobile ? 'pb-20' : ''}`}>
      {/* Latest Deals of the day */}
      <section className="px-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Latest Deals of the day</h2>
        <div className="relative">
          <div className="relative h-48 md:h-64 overflow-hidden rounded-2xl">
            <img
              src={dailyDeals[currentDealIndex].image}
              alt={dailyDeals[currentDealIndex].title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${dailyDeals[currentDealIndex].color} opacity-90`}></div>
            
            <div className="absolute inset-0 flex items-center justify-between px-6">
              <div className="text-white max-w-xs">
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-3">
                  {dailyDeals[currentDealIndex].discount} OFF
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {dailyDeals[currentDealIndex].title}
                </h3>
                <p className="text-white/90 mb-4">
                  {dailyDeals[currentDealIndex].subtitle}
                </p>
                <button
                  onClick={() => onNavigate('products')}
                  className="px-6 py-2 bg-white text-gray-800 rounded-full font-medium hover:bg-gray-100 transition-colors btn-hover"
                >
                  Shop Now
                </button>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {dailyDeals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDealIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentDealIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <button
            onClick={() => setCurrentDealIndex(prev => prev === 0 ? dailyDeals.length - 1 : prev - 1)}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => setCurrentDealIndex(prev => (prev + 1) % dailyDeals.length)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-6">
        <div className="mb-4 px-4">
          <h2 className="text-xl font-bold text-gray-800">Shop by Category</h2>
        </div>
        
        <div className="relative">
          <div 
            ref={categoryScrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-2"
            style={{ scrollBehavior: 'smooth' }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onNavigate('products')}
                className="flex flex-col items-center p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 category-icon min-w-[80px]"
              >
                <div className={`w-12 h-12 ${category.color} rounded-2xl flex items-center justify-center mb-2 text-2xl`}>
                  {category.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight whitespace-nowrap">
                  {category.name.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Previously Bought */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Previously Bought</h2>
          <button
            onClick={() => onNavigate('profile')}
            className="text-primary-600 text-sm font-medium hover:text-primary-700"
          >
            View All
          </button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {previouslyBought.map((product) => (
            <div key={product.id} className="min-w-[160px]">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => onAddToCart(product)}
                    className="absolute bottom-3 right-3 p-2 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all duration-200"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.packSize}</p>
                  <p className="text-xs text-gray-400 mb-2">{product.lastBought}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">{formatPriceShort(product.price)}</span>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="text-xs bg-primary-600 text-white px-3 py-1 rounded-full hover:bg-primary-700 transition-colors"
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Featured Products</h2>
          <button
            onClick={() => onNavigate('products')}
            className="text-primary-600 text-sm font-medium hover:text-primary-700"
          >
            View All
          </button>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-6'} gap-4`}>
          {featuredProducts.map((product, index) => (
            <div key={product.id} style={{ animationDelay: `${index * 100}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Category-wise Products */}
      {Object.entries(categoryProducts).map(([categoryName, products]) => (
        <section key={categoryName} className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">{categoryName}</h2>
            <button
              onClick={() => onNavigate('products')}
              className="text-primary-600 text-sm font-medium hover:text-primary-700"
            >
              View All
            </button>
          </div>
          
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {products.map((product) => (
              <div key={product.id} className="min-w-[160px]">
                <ProductCard product={product} showAnimation={false} />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Special Offers */}
      <section className="px-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Weekend Special</h3>
              <p className="text-orange-100 mb-4">Get 30% off on all beverages</p>
              <button className="px-4 py-2 bg-white text-orange-500 rounded-full font-medium hover:bg-orange-50 transition-colors">
                Shop Now
              </button>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">First Order</h3>
              <p className="text-purple-100 mb-4">Free delivery + 20% off</p>
              <button className="px-4 py-2 bg-white text-purple-500 rounded-full font-medium hover:bg-purple-50 transition-colors">
                Order Now
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;