import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem('auraJewelsCart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCartItems([]);
      }
    }
  }, []);
  
  // Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('auraJewelsCart', JSON.stringify(cartItems));
    
    // Calculate cart count and total
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  }, [cartItems]);
  
  // Add item to cart
  const addToCart = (product, quantity = 1, variant = null, metalOption = null) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart with same variant and metal option
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && 
               item.variant === variant && 
               item.metalOption === metalOption
      );
      
      if (existingItemIndex > -1) {
        // Update existing item quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        return newItems;
      } else {
        // Add new item to cart
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images ? product.images[0] : null,
          quantity,
          variant,
          metalOption
        }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (itemId, variant = null, metalOption = null) => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === itemId && 
          item.variant === variant && 
          item.metalOption === metalOption)
      )
    );
  };
  
  // Update item quantity in cart
  const updateQuantity = (itemId, quantity, variant = null, metalOption = null) => {
    if (quantity < 1) {
      removeFromCart(itemId, variant, metalOption);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId && 
        item.variant === variant && 
        item.metalOption === metalOption
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
  };
  
  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}