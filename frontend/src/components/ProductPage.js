import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./ProductPage.module.css";
import { useCart } from "../context/CartContext";
import { useSiteContent } from "../context/SiteContentContext";
import { images } from "./images";

const ProductPage = () => {
  const { id } = useParams(); // ✅ URL ID
  const { products } = useSiteContent(); // ✅ global data
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ✅ try state first
  let product = location.state;

  // ✅ fallback (refresh safe)
  if (!product) {
    product = products.find((p) => String(p.id) === String(id));
  }

  if (!product) {
    return <p>No product found</p>;
  }

  return (
    <section className={styles.productPage}>
      <div className={styles.productPageContainer}>

        <button className={styles.productPageBackBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className={styles.productPageHero}>

          {/* IMAGE */}
          <div className={styles.productPageImage}>
            <img
              src={product.image || images.phone}
              alt={product.title}
            />
          </div>

          {/* CONTENT */}
          <div className={styles.productPageInfo}>
            <div
              className={`${styles.productPageTag} ${
                product.category === "Accessories"
                  ? styles.tagAccessories
                  : product.category === "Audio"
                  ? styles.tagAudio
                  : product.category === "Tech"
                  ? styles.tagTech
                  : styles.tagWearables
              }`}
            >
                {product.category}
              </div>

            <h1>{product.title}</h1>
            <p>{product.desc}</p>

            <div className={styles.productPageMeta}>
              <span>⭐ {product.rating || "4.5"}</span>
              <span>🚚 Free Delivery</span>
              <span>🔒 Secure Payment</span>
            </div>

            <div className={styles.productPageActions}>
              <div className={styles.productPagePrice}>
                {product.price}
                {product.oldPrice && (
                  <span className={styles.old}>{product.oldPrice}</span>
                )}
              </div>

              <button
                className={styles.productPageBuyBtn}
                onClick={(e) => {
                  e.stopPropagation();

                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    oldPrice: product.oldPrice,
                    image: product.image || images.phone,
                    type: "product",
                  });

                  navigate("/cart");
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* 🔥 DYNAMIC DETAILS */}
        <div className={styles.productPageDetails}>
          <h2>Product Details</h2>
          <ul>
            {(product.details || []).map((item, i) => (
              <li key={i}>✔ {item}</li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
};

export default ProductPage;