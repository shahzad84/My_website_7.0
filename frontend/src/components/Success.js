import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Success.module.css";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className={styles.success}>
      <div className={styles.successCard}>

        <div className={styles.successIcon}>✅</div>

        <h1>Order Placed Successfully!</h1>
        <p>
          Thank you for your purchase. Your order has been confirmed and will be delivered soon.
        </p>

        <div className={styles.successActions}>
          <button onClick={() => navigate("/products")}>
            Continue Shopping
          </button>

          <button
            className={styles.outline}
            onClick={() => navigate("/cart")}
          >
            View Cart
          </button>
        </div>

      </div>
    </div>
  );
}