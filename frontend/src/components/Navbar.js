import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const closeMenu = () => setOpen(false);

  const navClass = ({ isActive }) => (isActive ? styles.active : "");

  // ✅ FIX: LOCK BACKGROUND SCROLL
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <nav className={styles.navbar}>
        {/* LOGO */}
        <NavLink to="/" className={styles.navLogo} onClick={closeMenu}>
          Dev<span>Store</span>
        </NavLink>

        {/* DESKTOP LINKS */}
        <ul className={styles.navLinks}>
          <li><NavLink to="/" className={navClass} onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/about" className={navClass} onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/courses" className={navClass} onClick={closeMenu}>Courses</NavLink></li>
          <li><NavLink to="/youtube" className={navClass} onClick={closeMenu}>YouTube</NavLink></li>
          <li><NavLink to="/products" className={navClass} onClick={closeMenu}>Store</NavLink></li>
          <li><NavLink to="/contact" className={navClass} onClick={closeMenu}>Contact</NavLink></li>
        </ul>

        {/* CART BUTTON */}
        <NavLink to="/cart" className={styles.cartBtn} onClick={closeMenu}>
          <FaShoppingCart />
          Cart
          {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
        </NavLink>

        {/* HAMBURGER */}
        <button
          className={`${styles.hamburger} ${open ? styles.active : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* ✅ OVERLAY */}
      {open && <div className={styles.navOverlay} onClick={closeMenu}></div>}

      {/* MOBILE MENU */}
      <div className={`${styles.mobileNav} ${open ? styles.open : ""}`}>
        <NavLink to="/" className={navClass} onClick={closeMenu}>Home</NavLink>
        <NavLink to="/about" className={navClass} onClick={closeMenu}>About</NavLink>
        <NavLink to="/courses" className={navClass} onClick={closeMenu}>Courses</NavLink>
        <NavLink to="/youtube" className={navClass} onClick={closeMenu}>YouTube</NavLink>
        <NavLink to="/products" className={navClass} onClick={closeMenu}>Store</NavLink>
        <NavLink to="/contact" className={navClass} onClick={closeMenu}>Contact</NavLink>
      </div>
    </>
  );
};

export default Navbar;