import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const closeMenu = () => setOpen(false);

  const navClass = ({ isActive }) => (isActive ? "active" : "");

  // ✅ FIX: LOCK BACKGROUND SCROLL
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <nav className="navbar">
        {/* LOGO */}
        <NavLink to="/" className="nav-logo" onClick={closeMenu}>
          Dev<span>Store</span>
        </NavLink>

        {/* DESKTOP LINKS */}
        <ul className="nav-links">
          <li><NavLink to="/" className={navClass} onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/about" className={navClass} onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="/courses" className={navClass} onClick={closeMenu}>Courses</NavLink></li>
          <li><NavLink to="/youtube" className={navClass} onClick={closeMenu}>YouTube</NavLink></li>
          <li><NavLink to="/products" className={navClass} onClick={closeMenu}>Store</NavLink></li>
          <li><NavLink to="/contact" className={navClass} onClick={closeMenu}>Contact</NavLink></li>
        </ul>

        {/* CART BUTTON */}
        <NavLink to="/cart" className="nav-cta cart-btn" onClick={closeMenu}>
          <FaShoppingCart />
          Cart
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </NavLink>

        {/* HAMBURGER */}
        <button
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* ✅ OVERLAY */}
      {open && <div className="nav-overlay" onClick={closeMenu}></div>}

      {/* MOBILE MENU */}
      <div className={`mobile-nav ${open ? "open" : ""}`}>
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