import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const navClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* LOGO */}
        <NavLink to="/" className="footer-logo">
          Dev<span>Store</span>
        </NavLink>

        {/* LINKS */}
        <div className="footer-links">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/courses" className={navClass}>Courses</NavLink>
          <NavLink to="/products" className={navClass}>Products</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>
        </div>

        {/* CTA BUTTONS (NEW 🔥) */}
        <div className="footer-cta">
          <NavLink to="/courses" className="footer-btn primary">
            Browse Courses
          </NavLink>

          <NavLink to="/cart" className="footer-btn outline">
            Go to Cart 🛒
          </NavLink>
        </div>

        {/* COPY */}
        <div className="footer-copy">
          © 2026 DevStore. Built for developers.
        </div>

      </div>
    </footer>
  );
};

export default Footer;