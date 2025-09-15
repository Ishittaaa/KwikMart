import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Activity
} from 'lucide-react';
import { formatPriceShort } from '../utils/currency';
import { useMediaQuery } from '../hooks/useMediaQuery';

const AdminDashboard = ({ onNavigate, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const stats = {
    totalOrders: 1247,
    totalUsers: 856,
    totalProducts: 324,
    totalRevenue: 125000,
    pendingOrders: 23,
    lowStockItems: 12
  };

  const recentOrders = [
    { id: '#ORD001', customer: 'John Doe', items: 3, total: 450, status: 'Pending', time: '2 mins ago' },
    { id: '#ORD002', customer: 'Jane Smith', items: 5, total: 680, status: 'Processing', time: '5 mins ago' },
    { id: '#ORD003', customer: 'Mike Johnson', items: 2, total: 320, status: 'Delivered', time: '10 mins ago' },
    { id: '#ORD004', customer: 'Sarah Wilson', items: 4, total: 590, status: 'Pending', time: '15 mins ago' }
  ];

  const products = [
    { id: 1, name: 'Fresh Red Apples', category: 'Fruits', stock: 45, price: 120, status: 'Active' },
    { id: 2, name: 'Organic Carrots', category: 'Vegetables', stock: 8, price: 80, status: 'Low Stock' },
    { id: 3, name: 'Fresh Milk', category: 'Dairy', stock: 23, price: 65, status: 'Active' },
    { id: 4, name: 'Premium Rice', category: 'Grains', stock: 67, price: 350, status: 'Active' }
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: 12, joined: '2024-01-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 8, joined: '2024-01-20', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', orders: 15, joined: '2024-01-10', status: 'Active' }
  ];

  const StatCard = ({ title, value, icon: Icon, color, trend, trendDirection }) => (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs md:text-sm text-gray-600 mb-1 font-medium">{title}</p>
          <p className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{value}</p>
          {trend && (
            <div className="flex items-center space-x-1">
              {trendDirection === 'up' ? (
                <ArrowUp className="w-3 h-3 text-green-600" />
              ) : (
                <ArrowDown className="w-3 h-3 text-red-600" />
              )}
              <p className={`text-xs font-medium ${
                trendDirection === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend}% from last month
              </p>
            </div>
          )}
        </div>
        <div className={`p-3 md:p-4 rounded-2xl ${color} shadow-lg`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-4 md:p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-1">Welcome back, {user?.name}!</h1>
            <p className="text-primary-100 text-sm md:text-base">Here's what's happening with your store today.</p>
          </div>
          <div className="hidden md:block">
            <Activity className="w-12 h-12 text-primary-200" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          icon={ShoppingCart} 
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          trend={12}
          trendDirection="up"
        />
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers} 
          icon={Users} 
          color="bg-gradient-to-r from-green-500 to-green-600"
          trend={8}
          trendDirection="up"
        />
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon={Package} 
          color="bg-gradient-to-r from-purple-500 to-purple-600"
          trend={5}
          trendDirection="up"
        />
        <StatCard 
          title="Revenue" 
          value={formatPriceShort(stats.totalRevenue)} 
          icon={DollarSign} 
          color="bg-gradient-to-r from-orange-500 to-orange-600"
          trend={15}
          trendDirection="up"
        />
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-4 md:p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-yellow-800 text-sm md:text-base">Pending Orders</h3>
              <p className="text-xs md:text-sm text-yellow-700">{stats.pendingOrders} orders need attention</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl p-4 md:p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-500 rounded-xl">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-red-800 text-sm md:text-base">Low Stock Alert</h3>
              <p className="text-xs md:text-sm text-red-700">{stats.lowStockItems} items running low</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <h2 className="text-lg md:text-xl font-bold text-gray-800">Recent Orders</h2>
        </div>
        
        {/* Mobile Cards View */}
        <div className="md:hidden">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-4 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-800">{order.id}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{order.customer}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{order.items} items • {order.time}</span>
                <span className="font-bold text-gray-800">{formatPriceShort(order.total)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{formatPriceShort(order.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Product Management</h2>
        <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
          <Plus className="w-4 h-4" />
          <span className="font-medium">Add Product</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Mobile Cards View */}
        <div className="md:hidden">
          {products.map((product) => (
            <div key={product.id} className="p-4 border-b border-gray-100 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-500">Stock: {product.stock}</span>
                  <span className="font-bold text-gray-800">{formatPriceShort(product.price)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{formatPriceShort(product.price)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800">User Management</h2>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        {/* Mobile Cards View */}
        <div className="md:hidden">
          {users.map((user) => (
            <div key={user.id} className="p-4 border-b border-gray-100 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  {user.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{user.orders} orders</span>
                <span className="text-gray-500">Joined {user.joined}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.orders}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.joined}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs rounded-full font-medium bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'users', label: 'Users', icon: Users }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'products': return renderProducts();
      case 'users': return renderUsers();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-800">KwikMart Admin</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        <div className={`${
          isMobile 
            ? `fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'w-64 bg-white shadow-lg border-r border-gray-200'
        }`}>
          {/* Mobile Sidebar Header */}
          {isMobile && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h1 className="text-lg font-bold text-gray-800">Menu</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}

          {/* Desktop Sidebar Header */}
          {!isMobile && (
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">QuickMart</h1>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-3">
                <p className="text-sm font-medium text-primary-800">Welcome back!</p>
                <p className="text-xs text-primary-600">{user?.name}</p>
              </div>
            </div>
          )}
          
          <nav className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (isMobile) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Overlay for mobile */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className={`flex-1 p-4 md:p-8 ${isMobile ? 'pt-0' : ''}`}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;