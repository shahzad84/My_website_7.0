import React from "react";
import "./About.css";

const About = () => {
  return (
    <section id="about" className="about">
      <div className="about-inner">
        {/* LEFT - CODE CARD */}
        <div className="about-visual">
          <div className="about-card">
            <div className="corner-brackets"></div>
            <div className="corner-brackets2"></div>

            <pre className="about-code">
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

            <div className="about-floating">✦ Open to Collabs</div>
          </div>
        </div>

        {/* RIGHT - TEXT */}
        <div className="about-content">
          <div className="section-label">→ About DevStore</div>

          <h2 className="section-title">We Teach Code & Ship Products</h2>

          <p className="section-desc">
            DevStore is a one-stop platform for developers at every level.
            Whether you want to learn a new skill, grab a ready-made project, or
            follow along on YouTube — we've got you covered.
          </p>

          <p className="section-desc">
            We believe in learning by building real things. Our courses are
            project-based, our products are production-ready, and our community
            is always growing.
          </p>

          {/* SKILLS */}
          <div className="skills-grid">
            <span className="skill-tag">React</span>
            <span className="skill-tag">Node.js</span>
            <span className="skill-tag">Python</span>
            <span className="skill-tag">Flutter</span>
            <span className="skill-tag">Next.js</span>
            <span className="skill-tag">MongoDB</span>
            <span className="skill-tag">UI/UX</span>
            <span className="skill-tag">DSA</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
