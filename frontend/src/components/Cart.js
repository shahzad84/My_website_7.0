import React from "react";
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, setCart, removeFromCart, increaseQty, decreaseQty } = useCart();

  // ✅ Calculate total dynamically
  const total = cart.reduce((acc, item) => {
    const price = parseInt(item.price?.replace(/[^\d]/g, ""), 10) || 0;
    return acc + price * item.qty;
  }, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const navigate = useNavigate();
  return (
    <div className="cart">
      {/* BACK BUTTON */}
      
      {/* HEADER */}
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
         ← Back
        </button>
        <h1>Your Cart</h1>
        <p>{totalItems} item{totalItems !== 1 && "s"}</p>
      </div>

      {/* EMPTY STATE */}
      {cart.length === 0 ? (
        <h2 style={{ marginTop: "2rem" }}>Your cart is empty 🛒</h2>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="cart-grid">
            {cart.map((item) => (
              <div className="cart-card" key={`${item.type}-${item.id}`}>
                
                {/* IMAGE */}
                <div className="cart-image">
                  <img src={item.image} alt={item.title} />
                </div>

                {/* INFO */}
                <div className="cart-info">
                  <h2>{item.title}</h2>

                  <div className="cart-price">
                    {item.price}
                    <span>{item.oldPrice}</span>
                  </div>

                  {/* ACTIONS */}
                  <div className="cart-actions">
                    <button onClick={() => decreaseQty(item.id, item.type)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id, item.type)}>+</button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id, item.type)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="cart-summary">
            <h2>Total: ₹{total.toLocaleString()}</h2>
            <button
              className="checkout-btn"
              onClick={() => {
                setCart([]);          // ✅ clear cart
                navigate("/success"); // ✅ go to thank you page
              }}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}