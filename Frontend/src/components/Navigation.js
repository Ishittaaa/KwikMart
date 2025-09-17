import React from 'react';
import { Home, ShoppingCart, User, Grid3X3, Heart } from 'lucide-react';

const Navigation = ({ currentScreen, onNavigate, cartCount }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'products', icon: Grid3X3, label: 'Categories' },
    { id: 'wishlist', icon: Heart, label: 'Wishlist' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart', badge: cartCount },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 mobile-nav z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 transition-all duration-200 ${
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-500 hover:text-primary-600'
              }`}
            >
              <div className="relative">
                <div className={`p-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary-100 scale-110' 
                    : 'hover:bg-gray-100'
                }`}>
                  <Icon className={`w-5 h-5 transition-all duration-200 ${
                    isActive ? 'scale-110' : ''
                  }`} />
                </div>
                
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce-in">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              
              <span className={`text-xs font-medium mt-1 transition-all duration-200 ${
                isActive 
                  ? 'text-primary-600 font-semibold' 
                  : 'text-gray-500'
              }`}>
                {item.label}
              </span>
              
              {isActive && (
                <div className="w-4 h-0.5 bg-primary-600 rounded-full mt-1 animate-fade-in"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;