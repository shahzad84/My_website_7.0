import React from "react";
import { useNavigate } from "react-router-dom";
import "./Success.css";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="success">
      <div className="success-card">

        <div className="success-icon">✅</div>

        <h1>Order Placed Successfully!</h1>
        <p>
          Thank you for your purchase. Your order has been confirmed and will be delivered soon.
        </p>

        <div className="success-actions">
          <button onClick={() => navigate("/products")}>
            Continue Shopping
          </button>

          <button
            className="outline"
            onClick={() => navigate("/cart")}
          >
            View Cart
          </button>
        </div>

      </div>
    </div>
  );
}