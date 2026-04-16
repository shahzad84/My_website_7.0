import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.aboutInner}>
        {/* LEFT - CODE CARD */}
        <div className={styles.aboutVisual}>
          <div className={styles.aboutCard}>
            <div className={styles.cornerBrackets}></div>
            <div className={styles.cornerBrackets2}></div>

            <pre className={styles.aboutCode}>
              {`// who_am_i.js
const devStore = {
  name: "DevStore",
  focus: [
    "Coding Education",
    "Digital Products",
    "YouTube Content"
  ],
  stack: [
    "React", "Node.js",
    "Python", "Flutter"
  ],
  mission: () => {
    return "Level up devs worldwide";
  }
};`}
            </pre>

            <div className={styles.aboutFloating}>✦ Open to Collabs</div>
          </div>
        </div>

        {/* RIGHT - TEXT */}
        <div className={styles.aboutContent}>
          <div className={styles.sectionLabel}>→ About DevStore</div>

          <h2 className={styles.sectionTitle}>We Teach Code & Ship Products</h2>

          <p className={styles.sectionDesc}>
            DevStore is a one-stop platform for developers at every level.
            Whether you want to learn a new skill, grab a ready-made project, or
            follow along on YouTube — we've got you covered.
          </p>

          <p className={styles.sectionDesc}>
            We believe in learning by building real things. Our courses are
            project-based, our products are production-ready, and our community
            is always growing.
          </p>

          {/* SKILLS */}
          <div className={styles.skillsGrid}>
            <span className={styles.skillTag}>React</span>
            <span className={styles.skillTag}>Node.js</span>
            <span className={styles.skillTag}>Python</span>
            <span className={styles.skillTag}>Flutter</span>
            <span className={styles.skillTag}>Next.js</span>
            <span className={styles.skillTag}>MongoDB</span>
            <span className={styles.skillTag}>UI/UX</span>
            <span className={styles.skillTag}>DSA</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
