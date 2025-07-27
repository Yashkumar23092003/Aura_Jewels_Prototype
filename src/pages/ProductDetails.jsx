import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import placeholderImages from '../../public/assets/images/placeholder';

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  useEffect(() => {
    // Reset state when product changes
    setCurrentImage(0);
    setSelectedVariant(null);
    setSelectedMetal(null);
    setQuantity(1);
    setIsAddedToCart(false);
    
    // Fetch product data
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/products.json');
        const data = await response.json();
        
        // Find the specific product
        const foundProduct = data.products.find(p => p.id === productId);
        
        if (!foundProduct) {
          // Product not found, navigate to 404
          navigate('/404');
          return;
        }
        
        setProduct(foundProduct);
        
        // Set default variant and metal option if available
        if (foundProduct.variants && foundProduct.variants.length > 0) {
          const availableVariant = foundProduct.variants.find(v => v.available);
          if (availableVariant) {
            setSelectedVariant(availableVariant.size || availableVariant.length);
          }
        }
        
        if (foundProduct.metalOptions && foundProduct.metalOptions.length > 0) {
          setSelectedMetal(foundProduct.metalOptions[0]);
        }
        
        // Find related products (same category, excluding current product)
        const related = data.products
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 3);
        
        setRelatedProducts(related);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [productId, navigate]);

  // Function to get appropriate image
  const getImageUrl = (product, index = 0) => {
    if (!product || !product.images || !product.images[index]) {
      // Return placeholder based on category
      return product?.category ? 
        placeholderImages[product.category][index % placeholderImages[product.category].length] : 
        placeholderImages.rings[0];
    }
    return product.images[index];
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(product, quantity, selectedVariant, selectedMetal);
    setIsAddedToCart(true);
    
    // Reset the added notification after 3 seconds
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-padding mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 h-[600px] bg-charcoal/5 animate-pulse"></div>
            <div className="lg:w-1/2 space-y-4">
              <div className="h-12 w-3/4 bg-charcoal/5 animate-pulse"></div>
              <div className="h-6 w-1/4 bg-charcoal/5 animate-pulse"></div>
              <div className="h-24 w-full bg-charcoal/5 animate-pulse"></div>
              <div className="h-6 w-3/4 bg-charcoal/5 animate-pulse"></div>
              <div className="h-6 w-1/2 bg-charcoal/5 animate-pulse"></div>
              <div className="h-12 w-full bg-charcoal/5 animate-pulse mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-padding mx-auto">
        {/* Product Details */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative overflow-hidden bg-gray-50 rounded-lg mb-4 h-[500px]">
              <img
                src={getImageUrl(product, currentImage)}
                alt={`${product.name} - View ${currentImage + 1}`}
                className="w-full h-full object-contain"
              />
              {product.new && (
                <span className="absolute top-4 left-4 bg-rose-gold text-ivory text-xs font-medium px-2 py-1 rounded">
                  New
                </span>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {Array.from({ length: Math.min(product.images.length, 4) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-20 h-20 rounded overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      currentImage === i ? 'border-rose-gold' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={getImageUrl(product, i)}
                      alt={`${product.name} - Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-2">
              <Link to={`/products/${product.category}`} className="text-sm text-rose-gold hover:underline">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl mb-4">{product.name}</h1>
            <p className="text-2xl font-medium mb-6">${product.price.toFixed(2)}</p>
            
            <p className="text-charcoal/80 mb-8">{product.description}</p>
            
            {/* Product Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="font-serif text-lg mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-gold mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Variants Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="font-serif text-lg mb-3">
                  {product.category === 'rings' ? 'Ring Size' : 'Length'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, index) => {
                    const size = variant.size || variant.length;
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedVariant(size)}
                        disabled={!variant.available}
                        className={`px-4 py-2 border text-sm font-medium transition-colors ${
                          selectedVariant === size 
                            ? 'border-rose-gold bg-rose-gold/10 text-rose-gold' 
                            : variant.available 
                              ? 'border-charcoal/20 hover:border-rose-gold' 
                              : 'border-charcoal/10 bg-charcoal/5 text-charcoal/40 cursor-not-allowed'
                        }`}
                      >
                        {size}
                        {!variant.available && ' (Sold out)'}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Metal Options */}
            {product.metalOptions && product.metalOptions.length > 0 && (
              <div className="mb-8">
                <h3 className="font-serif text-lg mb-3">Metal</h3>
                <div className="flex flex-wrap gap-3">
                  {product.metalOptions.map((metal, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMetal(metal)}
                      className={`px-4 py-2 border text-sm font-medium transition-colors ${
                        selectedMetal === metal 
                          ? 'border-rose-gold bg-rose-gold/10 text-rose-gold' 
                          : 'border-charcoal/20 hover:border-rose-gold'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-serif text-lg mb-3">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 border border-charcoal/20 flex items-center justify-center"
                  disabled={quantity <= 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 h-10 border-t border-b border-charcoal/20 text-center focus:outline-none"
                />
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="w-10 h-10 border border-charcoal/20 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="flex items-center gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={isAddedToCart || (product.variants && !selectedVariant)}
                className={`btn-primary flex-grow py-3 flex justify-center items-center ${
                  isAddedToCart ? 'bg-green-600 hover:bg-green-600' : ''
                }`}
              >
                {isAddedToCart ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
              
              <button className="w-12 h-12 border border-charcoal/20 rounded flex items-center justify-center hover:bg-rose-gold/10 hover:border-rose-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            {/* Product Details */}
            <div className="mt-12 space-y-4">
              <div className="border-t border-charcoal/10 pt-4">
                <h3 className="font-serif text-lg mb-2">Details</h3>
                <p className="text-charcoal/80 text-sm">{product.details}</p>
              </div>
              
              {product.materials && (
                <div className="border-t border-charcoal/10 pt-4">
                  <h3 className="font-serif text-lg mb-2">Materials</h3>
                  <p className="text-charcoal/80 text-sm">{product.materials.join(', ')}</p>
                </div>
              )}
              
              <div className="border-t border-charcoal/10 pt-4">
                <h3 className="font-serif text-lg mb-2">Shipping & Returns</h3>
                <p className="text-charcoal/80 text-sm">
                  Free shipping on all orders over $500. Returns accepted within 30 days of delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-3xl mb-8">You May Also Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(product => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={getImageUrl(product)}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.new && (
                      <span className="absolute top-4 left-4 bg-rose-gold text-ivory text-xs font-medium px-2 py-1 rounded">
                        New
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-serif text-xl mb-2 group-hover:text-rose-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-charcoal/70 mb-4 line-clamp-2">{product.description}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                      <span className="text-rose-gold font-medium">
                        View Details <span className="ml-1 group-hover:ml-2 transition-all">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;