import React from "react";
import "./FeaturedCourses.css";
import { useNavigate } from "react-router-dom";
import { images } from "./images";
import { useCart } from "../context/CartContext";
export const courses = [
  {
    id: "course-1",
    type: "course",
    level: "Beginner",
    image: images.phone,
    icon: "🚀",
    title: "Bootcamp",
    desc: "HTML to React to Node — build 5 real projects and land your first dev job.",
    price: "₹1,999",
    oldPrice: "₹3,999",
    tagClass: "tag-beginner",
  },
  {
    id: "course-2",
    type: "course",
    level: "Intermediate",
    image: images.phone,
    icon: "⚡",
    title: "React + Next.js Mastery",
    desc: "Production-grade React patterns and full-stack apps.",
    price: "₹2,499",
    oldPrice: "₹4,999",
    tagClass: "tag-inter",
  },
  {
    id: "course-3",
    type: "course",
    level: "Advanced",
    image: images.phone,
    icon: "🤖",
    title: "Python + AI/ML Deep Dive",
    desc: "Machine learning and AI products from scratch.",
    price: "₹3,499",
    oldPrice: "₹6,999",
    tagClass: "tag-adv",
  },
  {
    id: "course-4",
    type: "course",
    level: "Beginner",
    image: images.phone,
    icon: "📱",
    title: "Mobile App Development with Flutter",
    desc: "Build beautiful cross-platform mobile apps from scratch.",
    price: "₹2,199",
    oldPrice: "₹4,499",
    tagClass: "tag-beginner",
  },
  {
    id: "course-5",
    type: "course",
    level: "Intermediate",
    image: images.phone,
    icon: "🎨",
    title: "UI/UX Design Masterclass",
    desc: "Learn design principles, Figma, and create stunning interfaces.",
    price: "₹1,799",
    oldPrice: "₹3,699",
    tagClass: "tag-inter",
  },
  {
    id: "course-6",
    type: "course",
    level: "Advanced",
    image: images.phone,
    icon: "🔐",
    title: "Cybersecurity & Ethical Hacking",
    desc: "Master security concepts and penetration testing techniques.",
    price: "₹4,299",
    oldPrice: "₹7,999",
    tagClass: "tag-adv",
  },
];

const Courses = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  return (
    <section className="courses">
      <div className="courses-header">
        <div>
          <p className="section-label">→ All Courses</p>
          <h2 className="section-title">Complete Course Catalog</h2>
        </div>
      </div>

      <div className="courses-grid">
        {courses.map((course, index) => (
          <div
            className="course-card"
            key={course.id}
            onClick={() =>
              navigate(`/courses/course/${course.id}`, { state: course })
            }
          >
            {/* IMAGE FIRST */}
            <div className="course-image">
              <img
                src={course.image || images.phone}
                alt={course.title}
              />
            </div>
            <span className={`course-tag ${course.tagClass}`}>
              {course.level}
            </span>

            {/* <div className="course-icon">{course.icon}</div> */}

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

export default Courses;
