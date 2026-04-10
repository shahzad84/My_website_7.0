import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductPage.css";

const ProductPage = () => {
  const { state: product } = useLocation();
  const navigate = useNavigate();

  if (!product) {
    return <p>No product found</p>;
  }

  return (
    <section className="product-page">
      <div className="product-container">

        {/* BACK BUTTON */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* HERO */}
        <div className="product-hero">

          {/* IMAGE */}
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>

          {/* CONTENT */}
          <div className="product-info">
            <span className="product-tag">{product.category}</span>

            <h1>{product.title}</h1>
            <p>{product.desc}</p>

            <div className="product-meta">
              <span>⭐ {product.rating || "4.5"}</span>
              <span>🚚 Free Delivery</span>
              <span>🔒 Secure Payment</span>
            </div>

            <div className="product-actions">
              <div className="product-price">
                {product.price}
                <span className="old">{product.oldPrice}</span>
              </div>

              <button className="buy-btn">Buy Now</button>
            </div>
          </div>
        </div>

        {/* EXTRA SECTION */}
        <div className="product-details">
          <h2>Product Details</h2>
          <ul>
            <li>✔ Premium quality material</li>
            <li>✔ Long-lasting durability</li>
            <li>✔ Modern aesthetic design</li>
            <li>✔ 7-day replacement guarantee</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default ProductPage;