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
    "Software Development",
    "AI Solutions",
    "Education & Products",
  ],
  stack: [
    "React", "Node.js",
    "Python", "AI/ML",
  ],
  mission: () => {
    return "Build and scale ideas into real-world products";
  }
};`}
            </pre>

            <div className={styles.aboutFloating}>✦ Open to Collabs</div>
          </div>
        </div>

        {/* RIGHT - TEXT */}
        <div className={styles.aboutContent}>
          <div className={styles.sectionLabel}>→ About DevStore</div>

          <h2 className={styles.sectionTitle}>We Build & Ship</h2>

          <p className={styles.sectionDesc}>
            DevStore is a full-stack platform where ideas turn into real
            products. We build custom software, develop AI-powered solutions,
            and create high-quality digital experiences for businesses and
            developers.
          </p>

          <p className={styles.sectionDesc}>
            Alongside our services, we offer premium, project-based courses — so
            you don’t just learn, you build, launch, and grow.
          </p>
          <p className={styles.sectionDesc}>
            From concept to deployment — we help you at every stage.
          </p>

          {/* SKILLS */}
          <div className={styles.skillsGrid}>
            <span className={styles.skillTag}>React</span>
            <span className={styles.skillTag}>Node.js</span>
            <span className={styles.skillTag}>Python</span>
            <span className={styles.skillTag}>AI/ML</span>
            <span className={styles.skillTag}>LLM</span>
            <span className={styles.skillTag}>MongoDB</span>
            <span className={styles.skillTag}>NLP</span>
            <span className={styles.skillTag}>DSA</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
