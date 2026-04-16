import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const navClass = ({ isActive }) => (isActive ? styles.active : "");

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>

        {/* LOGO */}
        <NavLink to="/" className={styles.footerLogo}>
          Dev<span>Store</span>
        </NavLink>

        {/* LINKS */}
        <div className={styles.footerLinks}>
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/courses" className={navClass}>Courses</NavLink>
          <NavLink to="/products" className={navClass}>Products</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>
        </div>

        {/* CTA BUTTONS (NEW 🔥) */}
        <div className={styles.footerCta}>
          <NavLink to="/courses" className={`${styles.footerBtn} ${styles.primary}`}>
            Browse Courses
          </NavLink>

          <NavLink to="/cart" className={`${styles.footerBtn} ${styles.outline}`}>
            Go to Cart 🛒
          </NavLink>
        </div>

        {/* COPY */}
        <div className={styles.footerCopy}>
          © 2026 DevStore. Built for developers.
        </div>

      </div>
    </footer>
  );
};

export default Footer;