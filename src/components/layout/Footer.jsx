import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-charcoal text-ivory pt-12 pb-6">
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h2 className="font-serif text-2xl font-bold text-rose-gold">Aura Jewels</h2>
            </Link>
            <p className="text-ivory/80 mb-4">
              Exquisite jewelry crafted with passion and precision. Each piece tells a story of elegance and timeless beauty.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-ivory hover:text-rose-gold transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" className="text-ivory hover:text-rose-gold transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-ivory hover:text-rose-gold transition-colors" aria-label="Pinterest">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div className="col-span-1">
            <h3 className="font-serif text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products/rings" className="text-ivory/80 hover:text-rose-gold transition-colors">Rings</Link></li>
              <li><Link to="/products/necklaces" className="text-ivory/80 hover:text-rose-gold transition-colors">Necklaces</Link></li>
              <li><Link to="/products/earrings" className="text-ivory/80 hover:text-rose-gold transition-colors">Earrings</Link></li>
              <li><Link to="/products/bracelets" className="text-ivory/80 hover:text-rose-gold transition-colors">Bracelets</Link></li>
              <li><Link to="/products" className="text-ivory/80 hover:text-rose-gold transition-colors">All Collections</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-serif text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-ivory/80 hover:text-rose-gold transition-colors">Our Story</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-rose-gold transition-colors">Craftsmanship</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-rose-gold transition-colors">Sustainability</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-rose-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-rose-gold transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-serif text-lg font-medium mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-ivory/80 hover:text-rose-gold transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-rose-gold transition-colors">FAQ</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-rose-gold transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-rose-gold transition-colors">Care Instructions</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-rose-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="mt-12 border-t border-ivory/20 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-serif text-xl mb-3">Join Our Newsletter</h3>
            <p className="text-ivory/80 mb-4">Subscribe to receive updates on new collections, special offers and exclusive events.</p>
            
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-2 bg-charcoal border border-ivory/30 text-ivory focus:outline-none focus:border-rose-gold"
                required
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-rose-gold text-ivory font-medium hover:bg-rose-gold/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-ivory/20 text-center text-ivory/60 text-sm">
          <p>© {currentYear} Aura Jewels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;