import React, { useState, useEffect } from 'react';
import { ArrowLeft, Filter, Search, Heart, Star, Plus, Grid, List } from 'lucide-react';
import { formatPriceShort } from '../utils/currency';

const ProductListScreen = ({ onNavigate, onAddToCart, wishlistItems, onToggleWishlist, searchQuery: initialSearchQuery = '', isMobile }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(0);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'fruits', name: 'Fruits & Vegetables' },
    { id: 'dairy', name: 'Dairy & Bakery' },
    { id: 'snacks', name: 'Snacks & Beverages' },
    { id: 'beauty', name: 'Beauty & Personal Care' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'home', name: 'Home & Kitchen' },
  ];

  const allProducts = [
    {
      id: 1,
      name: 'Fresh Red Apples',
      price: 120,
      originalPrice: 160,
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300',
      rating: 4.5,
      category: 'fruits',
      isVeg: true,
      packSize: '1 kg Pack',
      discount: 25,
      badge: 'Fresh',
      description: 'Crisp and sweet red apples, perfect for snacking or cooking.'
    },
    {
      id: 2,
      name: 'Organic Carrots',
      price: 80,
      image: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?w=300',
      rating: 4.8,
      category: 'fruits',
      isVeg: true,
      packSize: '500g Pack',
      badge: 'Organic',
      description: 'Fresh organic carrots, rich in vitamins and minerals.'
    },
    {
      id: 3,
      name: 'Fresh Milk',
      price: 65,
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300',
      rating: 4.3,
      category: 'dairy',
      isVeg: true,
      packSize: '1L Pack',
      badge: 'Farm Fresh',
      description: 'Pure and fresh milk from local farms.'
    },
    {
      id: 4,
      name: 'Premium Basmati Rice',
      price: 350,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
      rating: 4.7,
      category: 'home',
      isVeg: true,
      packSize: '5kg Pack',
      badge: 'Premium',
      description: 'Long grain basmati rice with authentic aroma and taste.'
    },
    {
      id: 5,
      name: 'Mixed Dry Fruits',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300',
      rating: 4.6,
      category: 'snacks',
      isVeg: true,
      packSize: '250g Pack',
      discount: 25,
      badge: 'Bestseller',
      description: 'Premium quality mixed dry fruits for healthy snacking.'
    },
    {
      id: 6,
      name: 'Whole Wheat Bread',
      price: 45,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300',
      rating: 4.4,
      category: 'dairy',
      isVeg: true,
      packSize: '1 Loaf',
      badge: 'Fresh',
      description: 'Soft and nutritious whole wheat bread, baked fresh daily.'
    },
    {
      id: 7,
      name: 'Organic Bananas',
      price: 60,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300',
      rating: 4.2,
      category: 'fruits',
      isVeg: true,
      packSize: '1 Dozen',
      badge: 'Organic',
      description: 'Sweet and ripe organic bananas, rich in potassium.'
    },
    {
      id: 9,
      name: 'Fresh Bananas',
      price: 40,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300',
      rating: 4.0,
      category: 'fruits',
      isVeg: true,
      packSize: '1 kg',
      badge: 'Fresh',
      description: 'Fresh yellow bananas, perfect for snacking.'
    },
    {
      id: 8,
      name: 'Greek Yogurt',
      price: 85,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300',
      rating: 4.5,
      category: 'dairy',
      isVeg: true,
      packSize: '200g Cup',
      badge: 'Protein Rich',
      description: 'Thick and creamy Greek yogurt, high in protein.'
    },
  ];

  useEffect(() => {
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  // Update search query when prop changes
  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedRating);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy, priceRange, selectedRating]);

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const ProductCard = ({ product }) => (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      viewMode === 'list' ? 'flex' : ''
    }`}>
      <div className={`relative ${viewMode === 'list' ? 'w-32 h-32' : 'aspect-square'} overflow-hidden`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
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
          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200 hover:scale-110"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isInWishlist(product.id)
                ? 'fill-red-500 text-red-500'
                : 'text-gray-600 hover:text-red-500'
            }`}
          />
        </button>
      </div>

      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className={`font-semibold text-gray-800 ${viewMode === 'list' ? 'text-base' : 'text-sm'} line-clamp-2 flex-1`}>
            {product.name}
          </h3>
          {product.isVeg && (
            <div className="ml-2 w-4 h-4 border-2 border-green-600 rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 mb-2">{product.packSize}</p>

        {viewMode === 'list' && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        )}



        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gray-800">{formatPriceShort(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {formatPriceShort(product.originalPrice)}
              </span>
            )}
          </div>
          
          <button
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors btn-hover flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${isMobile ? 'pb-20' : ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-16 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onNavigate('home')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Products</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(parseFloat(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="0">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="4.5">4.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? isMobile ? 'grid-cols-2' : 'grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListScreen;