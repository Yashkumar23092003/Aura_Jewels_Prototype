import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center space-y-4">
          <div className="animate-spin w-12 h-12 border-4 border-rose-gold border-t-transparent rounded-full mx-auto"></div>
          <h2 className="font-serif text-2xl text-charcoal">Aura Jewels</h2>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-ivory">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:category" element={<ProductsPage />} />
              <Route path="/product/:productId" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;