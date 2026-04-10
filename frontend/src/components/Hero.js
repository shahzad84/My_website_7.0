import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section id="home" className="hero">
      {/* Background effects */}
      <div className="hero-grid"></div>
      <div className="hero-glow"></div>
      <div className="hero-glow2"></div>

      <div className="hero-content">
        <div className="hero-badge">
          ● LIVE — New Course Dropped
        </div>

        <h1>
          Code.<br />
          <span className="line2">Build.</span><br />
          <span className="line3">Sell.</span>
        </h1>

        <p className="hero-sub">
          Premium coding courses, developer tools, and digital products —
          everything you need to go from idea to income.
        </p>

        <div className="hero-btns">
          <a href="#courses" className="btn-primary">
            Browse Courses →
          </a>
          <a href="#products" className="btn-outline">
            ⚡ Shop Products
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">
              12<span>k+</span>
            </div>
            <div className="stat-label">Students</div>
          </div>

          <div className="stat-item">
            <div className="stat-num">
              48<span>+</span>
            </div>
            <div className="stat-label">Courses</div>
          </div>

          <div className="stat-item">
            <div className="stat-num">
              4.9<span>★</span>
            </div>
            <div className="stat-label">Avg Rating</div>
          </div>

          <div className="stat-item">
            <div className="stat-num">
              500<span>+</span>
            </div>
            <div className="stat-label">Products Sold</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;