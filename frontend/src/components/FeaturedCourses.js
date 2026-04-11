import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedCourses.css";
import { images } from "./images";
import { useCart } from "../context/CartContext";
const courses = [
  {
    id: 1,
    level: "Beginner",
    image: "https://via.placeholder.com/300",
    title: "Full Stack Web Dev Bootcamp",
    desc: "HTML to React to Node — build 5 real projects and land your first dev job.",
    price: "₹1,999",
    oldPrice: "₹3,999",
    tagClass: "tag-beginner",
  },
  {
    id: 2,
    level: "Intermediate",
    image: "https://via.placeholder.com/300",
    title: "React + Next.js Mastery",
    desc: "Production-grade React patterns and full-stack apps.",
    price: "₹2,499",
    oldPrice: "₹4,999",
    tagClass: "tag-inter",
  },
  {
    id: 3,
    level: "Advanced",
    image: "https://via.placeholder.com/300",
    title: "Python + AI/ML Deep Dive",
    desc: "Machine learning and AI products from scratch.",
    price: "₹3,499",
    oldPrice: "₹6,999",
    tagClass: "tag-adv",
  },
];

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
        {courses.map((course) => (
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
                className="course-btn"
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