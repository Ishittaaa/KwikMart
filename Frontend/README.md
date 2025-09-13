# QuickMart - React Grocery Delivery App

A modern, responsive grocery delivery application built with React.js and Tailwind CSS, inspired by popular apps like Blinkit and Zepto.

## 🚀 Features

### 🏠 Home Screen
- **Hero Banner**: Dynamic promotional banners with auto-rotation
- **Categories**: Interactive category grid with hover animations
- **Featured Products**: Curated product showcase with ratings and pricing
- **Quick Services**: Delivery information and service highlights
- **Special Offers**: Promotional cards with gradient backgrounds

### 🛍️ Product Listing
- **Advanced Filtering**: Filter by category, price range, and ratings
- **Search Functionality**: Real-time product search
- **Multiple View Modes**: Grid and list view options
- **Sorting Options**: Sort by name, price, and ratings
- **Responsive Design**: Optimized for all screen sizes

### 🛒 Shopping Cart
- **Item Management**: Add, remove, and update quantities
- **Promo Codes**: Apply discount codes and special offers
- **Bill Summary**: Detailed breakdown of costs
- **Delivery Information**: Real-time delivery estimates
- **Checkout Process**: Streamlined order placement

### 👤 User Profile
- **Profile Management**: Edit personal information
- **Order History**: Track past orders and their status
- **Wishlist**: Save favorite products for later
- **Address Management**: Multiple delivery addresses
- **Account Settings**: Comprehensive user preferences

## 🎨 Design Improvements

### Enhanced Responsiveness
- **Mobile-First Design**: Optimized for mobile devices
- **Adaptive Layouts**: Seamless experience across all screen sizes
- **Touch-Friendly**: Large touch targets and intuitive gestures

### Modern UI/UX
- **Smooth Animations**: CSS transitions and keyframe animations
- **Loading States**: Skeleton screens and loading indicators
- **Interactive Elements**: Hover effects and micro-interactions
- **Accessibility**: Focus states and keyboard navigation

### Performance Optimizations
- **Image Lazy Loading**: Improved page load times
- **Component Optimization**: Efficient React component structure
- **CSS Optimization**: Tailwind CSS for minimal bundle size

## 🛠️ Technology Stack

- **Frontend**: React.js (Create React App)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Responsive Design**: Custom media query hooks

## 📱 Key Differences from Vite Version

1. **Build Tool**: Uses Create React App instead of Vite
2. **Configuration**: Simplified setup with CRA defaults
3. **Development Server**: React Scripts development server
4. **Hot Reload**: CRA's built-in hot reloading
5. **Bundle Optimization**: CRA's webpack configuration

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd quickmart-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## 📁 Project Structure

```
quickmart-react/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Navigation.js
│   │   ├── HomeScreen.js
│   │   ├── ProductListScreen.js
│   │   ├── CartScreen.js
│   │   └── ProfileScreen.js
│   ├── hooks/
│   │   └── useMediaQuery.js
│   ├── utils/
│   │   └── currency.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎯 Features Breakdown

### Navigation
- **Mobile**: Bottom navigation with animated icons
- **Desktop**: Top navigation with search and user actions
- **Responsive**: Adaptive layout based on screen size

### Product Management
- **Add to Cart**: One-click product addition
- **Wishlist**: Save products for later purchase
- **Quantity Control**: Increment/decrement with visual feedback
- **Price Display**: Clear pricing with discount indicators

### User Experience
- **Loading States**: Smooth loading animations
- **Error Handling**: Graceful error states
- **Notifications**: Toast notifications for user actions
- **Accessibility**: WCAG compliant design

## 🔧 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your custom primary colors
  }
}
```

### Animations
Add custom animations in `index.css`:
```css
@keyframes customAnimation {
  /* Your animation keyframes */
}
```

### Components
Extend functionality by modifying components in the `src/components/` directory.

## 📱 Mobile Features

- **Touch Gestures**: Swipe navigation and interactions
- **Responsive Images**: Optimized for mobile screens
- **Fast Loading**: Optimized for mobile networks
- **Offline Support**: Basic offline functionality

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Build the project
2. Upload the `build` folder
3. Configure routing for SPA

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by Blinkit and Zepto grocery delivery apps
- Built with Create React App
- Styled with Tailwind CSS
- Icons by Lucide React

---

**QuickMart** - Your quick grocery delivery solution! 🛒✨