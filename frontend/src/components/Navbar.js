import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const navClass = ({ isActive }) =>
    isActive ? "active" : "";

  return (
    <>
      <nav className="navbar">

        {/* LOGO */}
        <NavLink to="/" className="nav-logo" onClick={closeMenu}>
          Dev<span>Store</span>
        </NavLink>

        {/* DESKTOP LINKS */}
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={navClass} onClick={closeMenu}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={navClass} onClick={closeMenu}>
              About
            </NavLink>
          </li>

          <li>
            <NavLink to="/courses" className={navClass} onClick={closeMenu}>
              Courses
            </NavLink>
          </li>

          <li>
            <NavLink to="/youtube" className={navClass} onClick={closeMenu}>
              YouTube
            </NavLink>
          </li>

          {/* STORE (Products Route) */}
          <li>
            <NavLink to="/products" className={navClass} onClick={closeMenu}>
              Store
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact" className={navClass} onClick={closeMenu}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* CTA */}
        <NavLink to="/products" className="nav-cta" onClick={closeMenu}>
          Shop Now →
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

      {/* MOBILE MENU */}
      <div className={`mobile-nav ${open ? "open" : ""}`}>
        <NavLink to="/" className={navClass} onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/about" className={navClass} onClick={closeMenu}>
          About
        </NavLink>

        <NavLink to="/courses" className={navClass} onClick={closeMenu}>
          Courses
        </NavLink>

        <NavLink to="/youtube" className={navClass} onClick={closeMenu}>
          YouTube
        </NavLink>

        <NavLink to="/products" className={navClass} onClick={closeMenu}>
          Store
        </NavLink>

        <NavLink to="/contact" className={navClass} onClick={closeMenu}>
          Contact
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;