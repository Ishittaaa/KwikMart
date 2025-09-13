import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  Settings, 
  HelpCircle, 
  LogOut,
  Edit3,
  Phone,
  Mail,
  Calendar,
  Plus,
  Trash2
} from 'lucide-react';
import { formatPriceShort } from '../utils/currency';

const ProfileScreen = ({ onNavigate, wishlistItems, onRemoveFromWishlist, onAddToCart, user, onLogout, isMobile }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    joinDate: 'January 2024',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  });

  const orderHistory = [
    {
      id: '#ORD001',
      date: '2024-01-15',
      items: 5,
      total: 450,
      status: 'Delivered',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: '#ORD002',
      date: '2024-01-10',
      items: 3,
      total: 280,
      status: 'Delivered',
      statusColor: 'text-green-600 bg-green-100'
    },
    {
      id: '#ORD003',
      date: '2024-01-05',
      items: 7,
      total: 650,
      status: 'Cancelled',
      statusColor: 'text-red-600 bg-red-100'
    }
  ];

  const addresses = [
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street, Apartment 4B, New York, NY 10001',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      address: '456 Business Ave, Suite 200, New York, NY 10002',
      isDefault: false
    }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
  ];

  const WishlistItem = ({ item }) => (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
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
        </div>

        <div className="flex flex-col space-y-2">
          <button
            onClick={() => onAddToCart(item)}
            className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            Add to Cart
          </button>
          <button
            onClick={() => onRemoveFromWishlist(item.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors self-center"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Profile Information</h2>
                <button
                  onClick={() => setShowEditProfile(true)}
                  className="p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{userProfile.name}</h3>
                  <p className="text-gray-600">Member since {userProfile.joinDate}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{userProfile.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{userProfile.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">Joined {userProfile.joinDate}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-4 text-white">
                <h3 className="text-2xl font-bold">{orderHistory.length}</h3>
                <p className="text-primary-100">Total Orders</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 text-white">
                <h3 className="text-2xl font-bold">{wishlistItems.length}</h3>
                <p className="text-purple-100">Wishlist Items</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Account Settings</span>
                </div>
                <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Help & Support</span>
                </div>
                <ArrowLeft className="w-4 h-4 text-gray-400 rotate-180" />
              </button>

              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-red-600"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </div>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Order History</h2>
            {orderHistory.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{order.id}</h3>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">{order.items} items</p>
                  <p className="font-bold text-gray-800">{formatPriceShort(order.total)}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'wishlist':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">My Wishlist</h2>
              <span className="text-sm text-gray-600">{wishlistItems.length} items</span>
            </div>
            
            {wishlistItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-600 mb-6">Save items you love for later</p>
                <button
                  onClick={() => onNavigate('products')}
                  className="px-6 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <WishlistItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Saved Addresses</h2>
              <button className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            {addresses.map((address) => (
              <div key={address.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-800">{address.type}</h3>
                      {address.isDefault && (
                        <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs rounded-full font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{address.address}</p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isMobile ? 'pb-20' : ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-4 flex items-center space-x-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-800">Profile</h1>
        </div>

        {/* Tabs */}
        <div className="px-4 pb-4">
          <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {!isMobile && <span>{tab.label}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {renderTabContent()}
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full animate-bounce-in">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Profile</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowEditProfile(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowEditProfile(false)}
                className="flex-1 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;