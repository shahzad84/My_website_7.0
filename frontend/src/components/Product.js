import React, { useState } from "react";
import styles from "./Product.module.css";
import { useNavigate } from "react-router-dom";
import { images } from "./images";
import { useCart } from "../context/CartContext";
import { useSiteContent } from "../context/SiteContentContext";
import NoInternet from "./NoInternet";
import LoadingScreen from "./LoadingScreen";
import EmptyState from "./EmptyState";

export default function Product() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [ratios, setRatios] = useState({});

  const { products, loading, isOnline } = useSiteContent();

  // ✅ 1. INTERNET FIRST
  if (!isOnline) {
    return <NoInternet />;
  }

  // ✅ 2. LOADING
  if (loading) {
    return <LoadingScreen />;
  }

  // ✅ 3. EMPTY STATE
  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No Products"
        message="No products available right now."
      />
    );
  }

  return (
    <div className={styles.products}>
      <div className={styles.productsHeader}>
        <div>
          <p className={styles.sectionLabel}>→ Products</p>
          <h2 className={styles.sectionTitle}>Featured Items</h2>
          <p className={styles.sectionDesc}>
             Explore products designed for everyday life.
  Quality you can trust, simplicity you’ll love.
          </p>
        </div>
      </div>

      <div className={styles.productsGrid}>
        {products.map((item) => {
          const imageSrc = item.image || images.phone;

          return (
            <div
              className={styles.productsCard}
              key={item.id}
              onClick={() =>
                navigate(`/products/product/${item.id}`, {
                  state: item,
                })
              }
            >
              {/* IMAGE */}
              <div className={`${styles.productsImage} ${styles[ratios[item.id]] || ""}`}>
                <img
                  src={imageSrc}
                  alt={item.title}
                  onLoad={(e) => {
                    const { naturalWidth, naturalHeight } = e.target;
                    const isSquare =
                      Math.abs(naturalWidth - naturalHeight) < 50;

                    setRatios((prev) => ({
                      ...prev,
                      [item.id]: isSquare ? "square" : "rect",
                    }));
                  }}
                />
                <div className={styles.productsOverlay}>View Product</div>
              </div>

              {/* CATEGORY */}
              <div
              className={`${styles.productsTag} ${
                item.category === "Accessories"
                  ? styles.tagAccessories
                  : item.category === "Audio"
                  ? styles.tagAudio
                  : item.category === "Tech"
                  ? styles.tagTech
                  : styles.tagWearables
              }`}
            >
                {item.category}
              </div>

              {/* CONTENT */}
              <h2 className={styles.productsTitle}>{item.title}</h2>
              <p className={styles.productsDesc}>{item.desc}</p>

              {/* META */}
              <div className={styles.productsMeta}>
                <div className={styles.productsPrice}>
                  {item.price}
                  {item.oldPrice && (
                    <span className={styles.old}>{item.oldPrice}</span>
                  )}
                </div>

                <button
                  className={styles.buyBtn}
                  onClick={(e) => {
                    e.stopPropagation();

                    addToCart({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      oldPrice: item.oldPrice,
                      image: imageSrc,
                      type: "product",
                    });

                    navigate("/cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}