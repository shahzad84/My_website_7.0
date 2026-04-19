import styles from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className={styles.hero}>
      {/* Background effects */}
      <div className={styles.heroGrid}></div>
      <div className={styles.heroGlow}></div>
      <div className={styles.heroGlow2}></div>

      <div className={styles.heroContent}>
        <div className={styles.heroBadge}>● LIVE — New Course Dropped</div>

        <h1>
          Code.
          <br />
          <span className={styles.line2}>Build.</span>
          <br />
          <span className={styles.line3}>Sell.</span>
        </h1>

        <p className={styles.heroSub}>
          We develop software, build AI solutions, and provide premium courses —
          everything you need to turn ideas into reality.
        </p>

        <div className={styles.heroBtns}>
          <button
            className={styles.btnPrimary}
            onClick={() => navigate("/courses")}
          >
            Browse Courses →
          </button>
          <button
            className={styles.btnOutline}
            onClick={() => navigate("/products")}
          >
            ⚡ Shop Products
          </button>
        </div>

        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <div className={styles.statNum}>
              1<span>k+</span>
            </div>
            <div className={styles.statLabel}>Students</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statNum}>
              8<span>+</span>
            </div>
            <div className={styles.statLabel}>Courses</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statNum}>
              4.9<span>★</span>
            </div>
            <div className={styles.statLabel}>Avg Rating</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statNum}>
              50<span>+</span>
            </div>
            <div className={styles.statLabel}>Products Sold</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
