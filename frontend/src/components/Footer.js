import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* LOGO */}
        <div className="footer-logo">
          Dev<span>Store</span>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#courses">Courses</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
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