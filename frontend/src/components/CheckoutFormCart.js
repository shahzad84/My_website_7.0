import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutFormCart.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { createOrder } from "../api/googleSheetApi";
import NoInternet from "./NoInternet";

export default function CheckoutFormCart() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  // ✅ Load saved data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userInfo"));
    if (saved) setFormData(saved);
  }, []);

  // ✅ Email validation (same)
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ Phone validation (same)
  const isValidPhone = (phone) => {
    const cleaned = phone.replace(/[\s\-().]/g, "");
    return /^\+?[1-9]\d{6,14}$/.test(cleaned);
  };
  const totalPrice = cart.reduce((acc, item) => {
    const price = parseInt(item.price?.replace(/[^\d]/g, ""), 10) || 0;
    return acc + price * item.qty;
  }, 0);
  // ✅ Handle input changes (same pattern)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    let newErrors = { ...errors };

    if (name === "email") {
      if (!isValidEmail(value)) {
        newErrors.email = "Enter valid email";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "name") {
      if (!value.trim()) {
        newErrors.name = "Name is required";
      } else {
        delete newErrors.name;
      }
    }

    if (name === "address") {
      if (!value.trim()) {
        newErrors.address = "Address is required";
      } else {
        delete newErrors.address;
      }
    }

    setErrors(newErrors);
  };

  // ✅ Submit handler
  const handleSubmit = async () => {
    let newErrors = {};
    if (!isOnline) {
      setStatus("❌ No internet connection");
      return;
    }
    if (!cart.length) {
      setStatus("❌ Cart is empty");
      return;
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.phone || !isValidPhone(formData.phone)) {
      newErrors.phone = "Enter valid phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("❌ Fix errors above");
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      // ✅ Save locally (auto-fill next time)
      localStorage.setItem("userInfo", JSON.stringify(formData));

      const orderData = {
        ...formData,
        cart: cart.map((item) => ({
          title: item.title,
          qty: item.qty,
          price: item.price,
          total:
            (parseInt(item.price?.replace(/[^\d]/g, ""), 10) || 0) * item.qty,
        })),
        totalItems: cart.reduce((acc, item) => acc + item.qty, 0),
        totalAmount: cart.reduce((acc, item) => {
          const price = parseInt(item.price?.replace(/[^\d]/g, ""), 10) || 0;
          return acc + price * item.qty;
        }, 0),
        totalPrice,
        orderId: Date.now(),
        date: new Date().toISOString(),
      };

      await createOrder(orderData);

      setCart([]);
      navigate("/success", { replace: true });
    } catch (err) {
      setStatus("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  if (!isOnline) {
    return <NoInternet />;
  }

  return (
    <div className={styles.checkoutFormCart}>
      <div className={styles.checkoutFormCartCard}>
        {/* ✅ BACK BUTTON (inside card, top) */}
        <button
          onClick={() => navigate(-1)}
          className={styles.checkoutFormCartBackBtn}
        >
          ← Back
        </button>

        {/* ✅ HEADER */}
        {/* <p className={styles.checkoutFormCartLabel}>CHECKOUT</p> */}

        <h1 className={styles.checkoutFormCartTitle}>Complete Your Order</h1>

        <p className={styles.checkoutFormCartDesc}>
          Enter your details to place the order
        </p>

        {/* ✅ FORM */}
        <div className={styles.checkoutFormCartForm}>
          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? styles.checkoutFormCartErrorBorder : ""}
          />
          {errors.name && (
            <p className={styles.checkoutFormCartError}>{errors.name}</p>
          )}

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? styles.checkoutFormCartErrorBorder : ""}
          />
          {errors.email && (
            <p className={styles.checkoutFormCartError}>{errors.email}</p>
          )}

          {/* PHONE */}
          <PhoneInput
            country={"in"}
            value={formData.phone}
            onChange={(value, country) => {
              setFormData({
                ...formData,
                phone: value,
                countryCode: country.dialCode,
              });

              let newErrors = { ...errors };
              if (!isValidPhone(value)) {
                newErrors.phone = "Enter valid phone number";
              } else {
                delete newErrors.phone;
              }
              setErrors(newErrors);
            }}
            containerStyle={{ marginBottom: "1rem" }}
          />
          {errors.phone && (
            <p className={styles.checkoutFormCartError}>{errors.phone}</p>
          )}

          {/* ADDRESS */}
          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? styles.checkoutFormCartErrorBorder : ""}
          />
          {errors.address && (
            <p className={styles.checkoutFormCartError}>{errors.address}</p>
          )}

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading || !isOnline}
            className={styles.checkoutFormCartSubmitBtn}
          >
            {!isOnline
  ? "No Internet"
  : loading
  ? "Placing Order..."
  : "Confirm Order"}
          </button>

          {status && <p className={styles.checkoutFormCartError}>{status}</p>}
        </div>
      </div>
    </div>
  );
}
