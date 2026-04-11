import React from "react";
import "./Cart.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, setCart, removeFromCart, increaseQty, decreaseQty } = useCart();

  // ✅ Calculate total dynamically
  const total = cart.reduce((acc, item) => {
    const price = Number(item.price.replace(/[^0-9]/g, ""));
    return acc + price * item.qty;
  }, 0);
  const navigate = useNavigate();
  return (
    <div className="cart">
      {/* HEADER */}
      <div className="cart-header">
        <h1>Your Cart</h1>
        <p>{cart.length} items</p>
      </div>

      {/* EMPTY STATE */}
      {cart.length === 0 ? (
        <h2 style={{ marginTop: "2rem" }}>Your cart is empty 🛒</h2>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="cart-grid">
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>
                
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
                    <button onClick={() => decreaseQty(item.id)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                </div>

                {/* REMOVE */}
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
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