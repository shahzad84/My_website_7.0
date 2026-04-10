// Product.js
import React from "react";
import "./Product.css";
import { useNavigate } from "react-router-dom";
const products = [
  {
    id: 1,
    title: "Mechanical Keyboard",
    desc: "Premium RGB keyboard for developers",
    price: "₹2,999",
    oldPrice: "₹4,999",
    category: "Accessories",
    icon: "⌨️",
  },
  {
    id: 2,
    title: "Gaming Mouse",
    desc: "High precision RGB gaming mouse",
    price: "₹1,499",
    oldPrice: "₹2,499",
    category: "Accessories",
    icon: "🖱️",
  },
  {
    id: 3,
    title: "Mechanical Keyboard Pro",
    desc: "Hot-swappable switches with RGB lighting",
    price: "₹4,499",
    oldPrice: "₹6,999",
    category: "Accessories",
    icon: "⌨️",
  },
  {
    id: 4,
    title: "Wireless Headphones",
    desc: "Noise cancelling over-ear headphones",
    price: "₹3,999",
    oldPrice: "₹5,999",
    category: "Audio",
    icon: "🎧",
  },
  {
    id: 5,
    title: "Laptop Stand",
    desc: "Aluminium ergonomic adjustable stand",
    price: "₹899",
    oldPrice: "₹1,499",
    category: "Accessories",
    icon: "💻",
  },
  {
    id: 6,
    title: "USB-C Hub",
    desc: "7-in-1 multiport adapter for laptops",
    price: "₹1,299",
    oldPrice: "₹2,199",
    category: "Tech",
    icon: "🔌",
  },
  {
    id: 7,
    title: "Smartwatch",
    desc: "Fitness tracking with AMOLED display",
    price: "₹2,999",
    oldPrice: "₹4,499",
    category: "Wearables",
    icon: "⌚",
  },
];

export default function Product() {
  const navigate = useNavigate();
  return (
    <div className="courses">
      <div className="courses-header">
        <div>
          <div className="section-label">Products</div>
          <h1 className="section-title">Featured Items</h1>
        </div>
        <button className="btn-outline">Add to Wishlist</button>
      </div>

      <div className="courses-grid">
        {products.map((item) => (
          <div className="course-card" key={item.id} onClick={() => navigate(`/products/product/${item.id}`, { state: item })}>
            <div className={`course-tag tag-${item.category.toLowerCase()}`}>
              {item.category}
            </div>

            <div className={`course-icon icon-${item.category.toLowerCase()}`}>
              {item.icon}
            </div>

            <h2 className="course-title">{item.title}</h2>

            <p className="course-desc">{item.desc}</p>

            <div className="course-meta">
              <div className="course-price">
                {item.price}
                <span className="old">{item.oldPrice}</span>
              </div>

              <button className="course-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

