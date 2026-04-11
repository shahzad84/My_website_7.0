import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CoursePage.css";
import { images } from "./images";
import { useCart } from "../context/CartContext";
const CoursePage = () => {
  const { state: course } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

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
        {/* HERO CARD */}
        <div className="course-hero">

          {/* LEFT SIDE (IMAGE) */}
          <div className="course-image">
            <img
              src={course.image || images.phone}
              alt={course.title}
            />
          </div>

          {/* RIGHT SIDE (INFO) */}
          <div className="course-info">

            <span className={`course-tag ${course.tagClass}`}>
              {course.level}
            </span>

            <h1>{course.title}</h1>
            <p>{course.desc}</p>

            {/* META */}
            <div className="course-meta">
              {course.duration && <span>⏱ {course.duration}</span>}
              {course.lessons && <span>📚 {course.lessons} lessons</span>}
              {course.category && <span>👨‍💻 {course.category}</span>}
            </div>

            {/* ACTIONS */}
            <div className="course-actions">
              <div className="course-price">
                {course.price}
                <span className="old">{course.oldPrice}</span>
              </div>

              <button
                className="course-btn"
                onClick={(e) => {
                  e.stopPropagation();

                  addToCart({
                    id: course.id,
                    title: course.title,
                    price: course.price,
                    oldPrice: course.oldPrice,
                    image: course.image || images.phone,
                    type: "course",
                  });

                  navigate("/cart");
                }}
              >
                Add to Cart
              </button>
            </div>

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