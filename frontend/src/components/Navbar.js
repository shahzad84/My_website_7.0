import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ IMPORTANT
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <nav className="navbar">
        {/* LOGO */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          Dev<span>Store</span>
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="nav-links">
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li><Link to="/courses" onClick={closeMenu}>Courses</Link></li>
          <li><Link to="/youtube" onClick={closeMenu}>YouTube</Link></li>
          <li><Link to="/products" onClick={closeMenu}>Products</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
        </ul>

        {/* CTA */}
        <Link to="/products" className="nav-cta">
          Shop Now →
        </Link>

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

      {/* MOBILE MENU */}
      <div className={`mobile-nav ${open ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/courses" onClick={closeMenu}>Courses</Link>
        <Link to="/youtube" onClick={closeMenu}>YouTube</Link>
        <Link to="/products" onClick={closeMenu}>Products</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
      </div>
    </>
  );
};

export default Navbar;