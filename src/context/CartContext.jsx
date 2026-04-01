import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Add item to cart or increment quantity if already exists
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Remove or decrement item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === id);
      if (existingItem.quantity === 1) {
        return prevItems.filter((cartItem) => cartItem.id !== id);
      }
      return prevItems.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
      );
    });
  };

  const clearCart = () => setCartItems([]);

  // Calculate total price
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Total items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Place active cart into the orders history
  const placeOrder = (details) => {
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cartItems],
      total: cartTotal * 1.08 + 40.00, // Includes 8% tax + ₹40 delivery
      details,
      status: "Preparing",
      placedAt: new Date().toISOString(),
      deliveryEta: new Date(Date.now() + 35 * 60000).toISOString() // Fake ETA: 35 mins from now
    };
    
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, clearCart, 
      cartTotal, cartItemCount, orders, placeOrder 
    }}>
      {children}
    </CartContext.Provider>
  );
};
