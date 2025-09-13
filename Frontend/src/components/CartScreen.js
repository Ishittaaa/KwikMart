import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, Truck, Clock, Shield, Tag } from 'lucide-react';
import { formatPriceShort } from '../utils/currency';

const CartScreen = ({ onNavigate, cartItems, onUpdateQuantity, onRemoveItem, isMobile }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const promoCodes = {
    'WELCOME20': { discount: 20, type: 'percentage', description: '20% off on first order' },
    'SAVE50': { discount: 50, type: 'fixed', description: '₹50 off on orders above ₹500' },
    'FREESHIP': { discount: 0, type: 'shipping', description: 'Free shipping' }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 499 || appliedPromo?.type === 'shipping' ? 0 : 40;
  const discount = appliedPromo ? 
    appliedPromo.type === 'percentage' ? (subtotal * appliedPromo.discount / 100) :
    appliedPromo.type === 'fixed' ? appliedPromo.discount : 0 : 0;
  const total = subtotal + deliveryFee - discount;

  const handleApplyPromo = () => {
    if (promoCodes[promoCode.toUpperCase()]) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        ...promoCodes[promoCode.toUpperCase()]
      });
      setPromoCode('');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const CartItem = ({ item }) => (
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
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gray-100 rounded-full">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>
            <span className="px-3 py-1 text-sm font-semibold text-gray-800 min-w-[2rem] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <button
            onClick={() => onRemoveItem(item.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  if (cartItems.length === 0) {
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
            <h1 className="text-xl font-bold text-gray-800">My Cart</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 text-center mb-8">
            Looks like you haven't added anything to your cart yet
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors btn-hover"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isMobile ? 'pb-32' : ''}`}>
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
            <h1 className="text-xl font-bold text-gray-800">My Cart</h1>
          </div>
          <span className="text-sm text-gray-600">{cartItems.length} items</span>
        </div>
      </div>

      <div className={`${isMobile ? 'px-4' : 'max-w-4xl mx-auto px-4'} py-6`}>
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-6`}>
          {/* Cart Items */}
          <div className={`${isMobile ? '' : 'col-span-2'} space-y-4`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Items in Cart</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="w-4 h-4" />
                <span>Free delivery above ₹499</span>
              </div>
            </div>

            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}

            {/* Delivery Info */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Delivery Information</h3>
                  <p className="text-sm text-green-600">Expected delivery in 10-30 minutes</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-green-700">
                  <Clock className="w-4 h-4" />
                  <span>Express delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-green-700">
                  <Shield className="w-4 h-4" />
                  <span>Safe packaging</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            {/* Promo Code */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Promo Code
              </h3>
              
              {appliedPromo ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800">{appliedPromo.code}</p>
                      <p className="text-sm text-green-600">{appliedPromo.description}</p>
                    </div>
                    <button
                      onClick={handleRemovePromo}
                      className="text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Bill Summary */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Bill Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPriceShort(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                    {deliveryFee === 0 ? 'FREE' : formatPriceShort(deliveryFee)}
                  </span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-600">-{formatPriceShort(discount)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">Total</span>
                    <span className="font-bold text-lg text-gray-800">{formatPriceShort(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full py-4 bg-primary-600 text-white rounded-2xl font-semibold hover:bg-primary-700 transition-colors btn-hover shadow-lg"
            >
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <button
              onClick={() => onNavigate('products')}
              className="w-full py-3 border-2 border-primary-600 text-primary-600 rounded-2xl font-semibold hover:bg-primary-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full animate-bounce-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
              <p className="text-gray-600 mb-6">
                Your order has been placed successfully. You'll receive a confirmation shortly.
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowCheckout(false);
                    onNavigate('home');
                  }}
                  className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="w-full py-3 border border-gray-300 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;