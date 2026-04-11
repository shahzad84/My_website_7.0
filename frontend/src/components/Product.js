// Product.js
import React from "react";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import { images } from "./images";
import { useState } from "react";
import { useCart } from "../context/CartContext";
const products = [
  {
    id: 1,
    title: "Mechanical Keyboard",
    desc: "Premium RGB keyboard for developers",
    price: "₹2,999",
    oldPrice: "₹4,999",
    category: "Accessories",
    image: images.phone,
  },
  {
    id: 2,
    title: "Gaming Mouse",
    desc: "High precision RGB gaming mouse",
    price: "₹1,499",
    oldPrice: "₹2,499",
    category: "Accessories",
    image:images.keyboard,
  },
  {
    id: 3,
    title: "Mechanical Keyboard Pro",
    desc: "Hot-swappable switches with RGB lighting",
    price: "₹4,499",
    oldPrice: "₹6,999",
    category: "Accessories",
    image: images.phone,
  },
  {
    id: 4,
    title: "Wireless Headphones",
    desc: "Noise cancelling over-ear headphones",
    price: "₹3,999",
    oldPrice: "₹5,999",
    category: "Audio",
    image:images.keyboard,
  },
  {
    id: 5,
    title: "Laptop Stand",
    desc: "Aluminium ergonomic adjustable stand",
    price: "₹899",
    oldPrice: "₹1,499",
    category: "Accessories",
    image:images.keyboard,
  },
  {
    id: 6,
    title: "USB-C Hub",
    desc: "7-in-1 multiport adapter for laptops",
    price: "₹1,299",
    oldPrice: "₹2,199",
    category: "Tech",
    image: images.phone,
  },
  {
    id: 7,
    title: "Smartwatch",
    desc: "Fitness tracking with AMOLED display",
    price: "₹2,999",
    oldPrice: "₹4,499",
    category: "Wearables",
    image:images.keyboard,
  },
];

export default function Product() {
  const navigate = useNavigate();
  const [ratios, setRatios] = useState({});
  const { addToCart } = useCart();
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

            {/* <div className={`course-icon icon-${item.category.toLowerCase()}`}>
              {item.icon}
            </div> */}
            <div className={`course-image ${ratios[item.id]}`}>
              <img
                src={item.image}
                alt={item.title}
                onLoad={(e) => {
                  const { naturalWidth, naturalHeight } = e.target;
                  const isSquare = Math.abs(naturalWidth - naturalHeight) < 50;

                  setRatios(prev => ({
                    ...prev,
                    [item.id]: isSquare ? "square" : "rect"
                  }));
                }}
              />
            </div>

            <h2 className="course-title">{item.title}</h2>

            <p className="course-desc">{item.desc}</p>

            <div className="course-meta">
              <div className="course-price">
                {item.price}
                <span className="old">{item.oldPrice}</span>
              </div>

              <button
                className="course-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);   // 🔥 THIS IS REQUIRED
                  navigate("/cart");
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

