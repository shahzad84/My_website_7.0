import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedCourses.css";

const courses = [
  {
    level: "Beginner",
    icon: "🚀",
    title: "Full Stack Web Dev Bootcamp",
    desc: "HTML to React to Node — build 5 real projects and land your first dev job.",
    price: "₹1,999",
    oldPrice: "₹3,999",
    tagClass: "tag-beginner",
  },
  {
    level: "Intermediate",
    icon: "⚡",
    title: "React + Next.js Mastery",
    desc: "Production-grade React patterns and full-stack apps.",
    price: "₹2,499",
    oldPrice: "₹4,999",
    tagClass: "tag-inter",
  },
  {
    level: "Advanced",
    icon: "🤖",
    title: "Python + AI/ML Deep Dive",
    desc: "Machine learning and AI products from scratch.",
    price: "₹3,499",
    oldPrice: "₹6,999",
    tagClass: "tag-adv",
  },
  {
    level: "Beginner",
    icon: "📱",
    title: "Mobile App Development with Flutter",
    desc: "Build beautiful cross-platform mobile apps from scratch.",
    price: "₹2,199",
    oldPrice: "₹4,499",
    tagClass: "tag-beginner",
  },
  {
    level: "Intermediate",
    icon: "🎨",
    title: "UI/UX Design Masterclass",
    desc: "Learn design principles, Figma, and create stunning interfaces.",
    price: "₹1,799",
    oldPrice: "₹3,699",
    tagClass: "tag-inter",
  },
  {
    level: "Advanced",
    icon: "🔐",
    title: "Cybersecurity & Ethical Hacking",
    desc: "Master security concepts and penetration testing techniques.",
    price: "₹4,299",
    oldPrice: "₹7,999",
    tagClass: "tag-adv",
  },
];

const FeaturedCourses = () => {
  const navigate = useNavigate();
  const featuredCourses = courses.slice(0, 3);

  return (
    <section id="courses" className="courses">
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
        {featuredCourses.map((course, index) => (
          <div className="course-card" key={index}>
            <span className={`course-tag ${course.tagClass}`}>
              {course.level}
            </span>

            <div className="course-icon">{course.icon}</div>

            <h3 className="course-title">{course.title}</h3>
            <p className="course-desc">{course.desc}</p>

            <div className="course-meta">
              <div className="course-price">
                {course.price}
                <span className="old">{course.oldPrice}</span>
              </div>

              <button className="course-btn">Enroll →</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCourses;
