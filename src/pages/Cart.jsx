import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import placeholderImages from '../../public/assets/images/placeholder';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    paymentMethod: 'credit-card'
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Get image URL or placeholder
  const getImageUrl = (item) => {
    if (!item || !item.image) {
      const category = cartItems.find(cartItem => cartItem.id === item.id)?.category || 'rings';
      return placeholderImages[category][0];
    }
    return item.image;
  };

  // Handle checkout form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Process checkout
  const handleCheckout = (e) => {
    e.preventDefault();
    
    // Simulate processing order
    setIsCheckingOut(true);
    
    setTimeout(() => {
      // Generate a random order ID
      const newOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(newOrderId);
      setOrderComplete(true);
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-padding mx-auto">
        {orderComplete ? (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-serif text-3xl mb-4">Order Confirmed!</h1>
            <p className="text-lg text-charcoal/80 mb-6">
              Thank you for your purchase. Your order #{orderId} has been confirmed.
            </p>
            <p className="mb-8">
              A confirmation email has been sent to {formData.email}.
            </p>
            <Link to="/" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-serif text-3xl mb-6">Your Shopping Cart</h1>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 opacity-30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
                <p className="text-charcoal/70 mb-8">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Link to="/products" className="btn-primary">
                  Browse Our Collections
                </Link>
              </div>
            ) : !isCheckingOut ? (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="lg:w-2/3">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6">
                      <div className="hidden sm:grid sm:grid-cols-6 text-sm font-medium text-charcoal/70 pb-3 border-b">
                        <div className="sm:col-span-3">Product</div>
                        <div className="text-center">Price</div>
                        <div className="text-center">Quantity</div>
                        <div className="text-right">Total</div>
                      </div>
                      
                      <div className="divide-y">
                        {cartItems.map((item) => (
                          <div key={`${item.id}-${item.variant}-${item.metalOption}`} className="py-6 grid sm:grid-cols-6 gap-6">
                            {/* Product Info */}
                            <div className="sm:col-span-3 flex gap-4">
                              <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                  src={getImageUrl(item)} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <Link to={`/product/${item.id}`} className="font-serif text-lg hover:text-rose-gold transition-colors">
                                  {item.name}
                                </Link>
                                {item.variant && (
                                  <p className="text-sm text-charcoal/60 mt-1">
                                    Size: {item.variant}
                                  </p>
                                )}
                                {item.metalOption && (
                                  <p className="text-sm text-charcoal/60 mt-1">
                                    Metal: {item.metalOption}
                                  </p>
                                )}
                                <button 
                                  onClick={() => removeFromCart(item.id, item.variant, item.metalOption)}
                                  className="text-sm text-rose-gold hover:underline mt-2 flex items-center"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  Remove
                                </button>
                              </div>
                            </div>
                            
                            {/* Price */}
                            <div className="sm:text-center flex items-center sm:block">
                              <span className="sm:hidden text-sm text-charcoal/70 mr-2">Price:</span>
                              <span>${item.price.toFixed(2)}</span>
                            </div>
                            
                            {/* Quantity */}
                            <div className="sm:text-center">
                              <div className="flex items-center sm:justify-center">
                                <span className="sm:hidden text-sm text-charcoal/70 mr-2">Quantity:</span>
                                <div className="flex">
                                  <button 
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.variant, item.metalOption)}
                                    className="w-8 h-8 border border-charcoal/20 flex items-center justify-center"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                  </button>
                                  <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1, item.variant, item.metalOption)}
                                    className="w-10 h-8 border-t border-b border-charcoal/20 text-center text-sm focus:outline-none"
                                  />
                                  <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant, item.metalOption)}
                                    className="w-8 h-8 border border-charcoal/20 flex items-center justify-center"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                            
                            {/* Total */}
                            <div className="sm:text-right flex items-center justify-between sm:block">
                              <span className="sm:hidden text-sm text-charcoal/70">Total:</span>
                              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between pt-4 border-t">
                        <button 
                          onClick={() => clearCart()}
                          className="text-sm text-charcoal/70 hover:text-rose-gold transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Clear Cart
                        </button>
                        <Link to="/products" className="text-sm text-rose-gold hover:underline flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order Summary */}
                <div className="lg:w-1/3">
                  <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                    <h2 className="font-serif text-xl mb-4">Order Summary</h2>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-charcoal/70">Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal/70">Shipping</span>
                        <span>{cartTotal >= 500 ? 'Free' : '$9.95'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal/70">Tax</span>
                        <span>${(cartTotal * 0.07).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>
                            ${(cartTotal + (cartTotal >= 500 ? 0 : 9.95) + cartTotal * 0.07).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setIsCheckingOut(true)}
                      className="btn-primary w-full py-3"
                    >
                      Proceed to Checkout
                    </button>
                    
                    <div className="mt-6 text-center text-sm text-charcoal/70">
                      <p>Secure Payment Processing</p>
                      <div className="flex justify-center gap-2 mt-2">
                        <span className="bg-charcoal/5 px-2 py-1 rounded">Visa</span>
                        <span className="bg-charcoal/5 px-2 py-1 rounded">Mastercard</span>
                        <span className="bg-charcoal/5 px-2 py-1 rounded">PayPal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Checkout Form */}
                <div className="lg:w-2/3">
                  <form onSubmit={handleCheckout}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
                      <h2 className="font-serif text-xl mb-6">Contact Information</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-charcoal/70 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-charcoal/20 px-3 py-2 focus:outline-none focus:border-rose-gold"
                          />
                        </div>
                      </div>
                      
                      <h2 className="font-serif text-xl mt-8 mb-6">Shipping Information</h2>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-charcoal/70 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-charcoal/20 px-3 py-2 focus:outline-none focus:border-rose-gold"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-charcoal/70 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-charcoal/20 px-3 py-2 focus:outline-none focus:border-rose-gold"
                          />
                        </div>
                        
                        <div className="sm:col-span-2">
                          <label htmlFor="address" className="block text-sm font-medium text-charcoal/70 mb-1">
                            Street Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-charcoal/20 px-3 py-2 focus:outline-none focus:border-rose-gold"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-charcoal/70 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-charcoal/20 px-3 py-2 focus:outline-none focus:border-rose-gold"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-charcoal/70 mb-1">
                            State/Province
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-charcoal/20 px-3 py-2 focus:outline-none focus:border-rose-gold"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="zip" className="block text-sm font-medium text-charcoal/70 mb-1">
                            ZIP/Postal Code
                          </label>
                          <input
                            type="text"
                            id="zip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-charcoal/20 px-3 py-2 focus:outline-none focus:border-rose-gold"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-charcoal/70 mb-1">
                            Country
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            required
                            className="w-full border border-charcoal/20 px-3 py-2 focus:outline-none focus:border-rose-gold"
                          >
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                          </select>
                        </div>
                      </div>
                      
                      <h2 className="font-serif text-xl mt-8 mb-6">Payment Method</h2>
                      
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 border border-charcoal/20 p-4 rounded cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="credit-card"
                            checked={formData.paymentMethod === 'credit-card'}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 rounded-full border border-charcoal/30 flex items-center justify-center peer-checked:border-rose-gold">
                            {formData.paymentMethod === 'credit-card' && (
                              <div className="w-3 h-3 rounded-full bg-rose-gold"></div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">Credit Card</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="bg-charcoal/5 px-2 py-1 rounded text-xs">Visa</span>
                            <span className="bg-charcoal/5 px-2 py-1 rounded text-xs">Mastercard</span>
                          </div>
                        </label>
                        
                        <label className="flex items-center gap-3 border border-charcoal/20 p-4 rounded cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-5 h-5 rounded-full border border-charcoal/30 flex items-center justify-center peer-checked:border-rose-gold">
                            {formData.paymentMethod === 'paypal' && (
                              <div className="w-3 h-3 rounded-full bg-rose-gold"></div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <span className="font-medium">PayPal</span>
                          </div>
                          <div>
                            <span className="bg-charcoal/5 px-2 py-1 rounded text-xs">PayPal</span>
                          </div>
                        </label>
                      </div>
                      
                      <div className="mt-8 flex gap-4">
                        <button
                          type="button"
                          onClick={() => setIsCheckingOut(false)}
                          className="btn-secondary py-2 px-6"
                        >
                          Back to Cart
                        </button>
                        <button
                          type="submit"
                          className="btn-primary flex-grow py-2"
                        >
                          Complete Order
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                
                {/* Order Summary */}
                <div className="lg:w-1/3">
                  <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                    <h2 className="font-serif text-xl mb-4">Order Summary</h2>
                    
                    <div className="max-h-64 overflow-y-auto mb-4">
                      {cartItems.map((item) => (
                        <div 
                          key={`summary-${item.id}-${item.variant}-${item.metalOption}`} 
                          className="flex gap-3 py-3 border-b"
                        >
                          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={getImageUrl(item)} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="font-serif text-sm truncate">{item.name}</h4>
                            {(item.variant || item.metalOption) && (
                              <p className="text-xs text-charcoal/60">
                                {item.variant && `Size: ${item.variant}`}
                                {item.variant && item.metalOption && ' / '}
                                {item.metalOption && `Metal: ${item.metalOption}`}
                              </p>
                            )}
                            <div className="flex justify-between mt-1">
                              <span className="text-sm">{item.quantity} × ${item.price.toFixed(2)}</span>
                              <span className="text-sm font-medium">${(item.quantity * item.price).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-charcoal/70">Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal/70">Shipping</span>
                        <span>{cartTotal >= 500 ? 'Free' : '$9.95'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-charcoal/70">Tax</span>
                        <span>${(cartTotal * 0.07).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>
                            ${(cartTotal + (cartTotal >= 500 ? 0 : 9.95) + cartTotal * 0.07).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;