import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import "./CheckoutModal.css";

function Cart() {
  const { cartItems, addToCart, removeFromCart, cartTotal, placeOrder } = useCart();
  const navigate = useNavigate();

  // Checkout Modal State
  const [showModal, setShowModal] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [details, setDetails] = useState({ address: "", phone: "" });
  const [otp, setOtp] = useState("");

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) return;
    setShowModal(true);
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^\d{10}$/;
    if (details.address.length < 5 || !phoneRegex.test(details.phone.replace(/\D/g, ''))) {
      alert("Please enter a valid address and a 10-digit Indian phone number.");
      return;
    }
    // Simulate sending OTP
    setShowOtp(true);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === "1234") {
      // Success! Place order.
      placeOrder(details);
      setShowModal(false);
      setShowOtp(false);
      navigate("/dashboard");
    } else {
      alert("Invalid OTP! (Hint: use 1234)");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowOtp(false);
    setDetails({ address: "", phone: "" });
    setOtp("");
  };

  return (
    <div className="cart-container">
      <h1 className="cart-header">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart-msg">
          <h2>Your cart is currently empty</h2>
          <p>Explore the menu and add some delicious items!</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.name}</h3>
                  <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
                  
                  <div className="cart-item-actions">
                    <button 
                      className="quantity-btn" 
                      onClick={() => removeFromCart(item.id)}
                    >-</button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => addToCart(item)}
                    >+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹40.00</span>
            </div>
            
            <div className="summary-row">
              <span>Tax (8%)</span>
              <span>₹{(cartTotal * 0.08).toFixed(2)}</span>
            </div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{(cartTotal * 1.08 + 40.00).toFixed(2)}</span>
            </div>
            
            <button className="checkout-btn" onClick={handleCheckoutClick}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal Overlay */}
      {showModal && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal">
            <div className="modal-header">
              <h2>Secure Checkout</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>

            {!showOtp ? (
              <form onSubmit={handleDetailsSubmit}>
                <div className="form-group">
                  <label htmlFor="address">Delivery Address</label>
                  <textarea 
                    id="address" 
                    placeholder="Flat 202, ABC Apartments, Sector 10, Mumbai, MH 400001" 
                    value={details.address}
                    onChange={(e) => setDetails({ ...details, address: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="+91 98765 43210" 
                    value={details.phone}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="verify-btn">Send OTP</button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit}>
                <div className="form-group">
                  <label htmlFor="otp">Enter OTP sent to {details.phone}</label>
                  <input 
                    type="text" 
                    id="otp" 
                    placeholder="4-digit code" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength="4"
                    required
                  />
                  <div className="otp-note">Testing Mock: Type 1234</div>
                </div>

                <button type="submit" className="verify-btn">Verify & Place Order</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
