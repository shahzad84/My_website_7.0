import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CoursePage.css";

const CoursePage = () => {
  const { state: course } = useLocation();
  const navigate = useNavigate();

  if (!course) {
    return <p>No course found</p>;
  }

  return (
    <section className="course-page">
      <div className="course-container">

        {/* BACK BUTTON */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* HERO CARD */}
        <div className="course-hero">

            {/* ICON (missing before) */}
            <div className="course-icon large">{course.icon}</div>

            {/* TAG */}
            <span className={`course-tag ${course.tagClass}`}>
                {course.level}
            </span>

            <h1>{course.title}</h1>
            <p>{course.desc}</p>

            {/* META → only show if exists */}
            <div className="course-meta">
                {course.duration && <span>⏱ {course.duration}</span>}
                {course.lessons && <span>📚 {course.lessons} lessons</span>}
                {course.category && <span>👨‍💻 {course.category}</span>}
            </div>

            {/* PRICE FIX */}
            <div className="course-actions">
                <div className="course-price">
                {course.price}
                <span className="old">{course.oldPrice}</span>
                </div>

                <button className="enroll-btn">Enroll Now</button>
            </div>

            </div>

        {/* COURSE CONTENT */}
        <div className="course-content">
          <h2>What you'll learn</h2>

          <ul>
            <li>✔ Build real-world projects</li>
            <li>✔ Master modern tools & workflows</li>
            <li>✔ Write clean & scalable code</li>
            <li>✔ Improve UI/UX skills</li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default CoursePage;