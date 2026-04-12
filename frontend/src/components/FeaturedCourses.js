import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedCourses.css";
import { images } from "./images";
import { useCart } from "../context/CartContext";
import { courses } from "./Courses";

const FeaturedCourses = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  return (
    <section className="courses">
      <div className="courses-header">
        <div>
          <p className="section-label">→ Learn With Us</p>
          <h2 className="section-title">Featured Courses</h2>
        </div>

        <button className="btn-outline" onClick={() => navigate("/courses")}>
          View All Courses →
        </button>
      </div>

      <div className="courses-grid">
        {courses.slice(0, 3).map((course) => (
          <div
            className="course-card"
            key={course.id}
            onClick={() =>
              navigate(`/courses/course/${course.id}`, { state: course })
            }
          >
            {/* IMAGE (MATCH MAIN PAGE) */}
            <div className="course-image">
              <img src={course.image} alt={course.title} />
            </div>

            {/* TAG */}
            <span className={`course-tag ${course.tagClass}`}>
              {course.level}
            </span>

            <h3 className="course-title">{course.title}</h3>
            <p className="course-desc">{course.desc}</p>

            <div className="course-meta">
              <div className="course-price">
                {course.price}
                <span className="old">{course.oldPrice}</span>
              </div>

              <button
                className="buy-btn"
                onClick={(e) => {
                  e.stopPropagation();

                  const mappedCourse = {
                    id: course.id,
                    title: course.title,
                    price: course.price,
                    oldPrice: course.oldPrice,
                    image: course.image || images.phone,
                    type: "course",
                  };

                  addToCart(mappedCourse);
                  navigate("/cart"); // optional
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCourses;