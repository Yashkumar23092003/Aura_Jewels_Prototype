import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  
  // Listen for scroll events to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-ivory shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-padding mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="font-serif text-3xl font-bold text-rose-gold">
            Aura Jewels-Prototype
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-[18px]">
          <Link 
            to="/" 
            className={`font-medium hover:text-rose-gold transition-colors ${
              location.pathname === '/' ? 'text-rose-gold' : 'text-charcoal'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`font-medium hover:text-rose-gold transition-colors ${
              location.pathname.includes('/products') ? 'text-rose-gold' : 'text-charcoal'
            }`}
          >
            Collections
          </Link>
          <Link 
            to="/products/rings" 
            className={`font-medium hover:text-rose-gold transition-colors ${
              location.pathname === '/products/rings' ? 'text-rose-gold' : 'text-charcoal'
            }`}
          >
            Rings
          </Link>
          <Link 
            to="/products/necklaces" 
            className={`font-medium hover:text-rose-gold transition-colors ${
              location.pathname === '/products/necklaces' ? 'text-rose-gold' : 'text-charcoal'
            }`}
          >
            Necklaces
          </Link>
          <Link 
            to="/products/earrings" 
            className={`font-medium hover:text-rose-gold transition-colors ${
              location.pathname === '/products/earrings' ? 'text-rose-gold' : 'text-charcoal'
            }`}
          >
            Earrings
          </Link>
          <Link 
            to="/products/bracelets" 
            className={`font-medium hover:text-rose-gold transition-colors ${
              location.pathname === '/products/bracelets' ? 'text-rose-gold' : 'text-charcoal'
            }`}
          >
            Bracelets
          </Link>
        </nav>
        
        {/* Cart and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-charcoal hover:text-rose-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-gold text-ivory text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-ivory shadow-lg absolute top-full left-0 right-0 animate-fade-in">
          <nav className="container-padding mx-auto py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`font-medium hover:text-rose-gold transition-colors ${
                location.pathname === '/' ? 'text-rose-gold' : 'text-charcoal'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium hover:text-rose-gold transition-colors ${
                location.pathname.includes('/products') ? 'text-rose-gold' : 'text-charcoal'
              }`}
            >
              Collections
            </Link>
            <Link 
              to="/products/rings" 
              className={`font-medium hover:text-rose-gold transition-colors ${
                location.pathname === '/products/rings' ? 'text-rose-gold' : 'text-charcoal'
              }`}
            >
              Rings
            </Link>
            <Link 
              to="/products/necklaces" 
              className={`font-medium hover:text-rose-gold transition-colors ${
                location.pathname === '/products/necklaces' ? 'text-rose-gold' : 'text-charcoal'
              }`}
            >
              Necklaces
            </Link>
            <Link 
              to="/products/earrings" 
              className={`font-medium hover:text-rose-gold transition-colors ${
                location.pathname === '/products/earrings' ? 'text-rose-gold' : 'text-charcoal'
              }`}
            >
              Earrings
            </Link>
            <Link 
              to="/products/bracelets" 
              className={`font-medium hover:text-rose-gold transition-colors ${
                location.pathname === '/products/bracelets' ? 'text-rose-gold' : 'text-charcoal'
              }`}
            >
              Bracelets
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;