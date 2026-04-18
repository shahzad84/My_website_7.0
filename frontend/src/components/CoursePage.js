import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./CoursePage.module.css";
import { images } from "./images";
import { useCart } from "../context/CartContext";
import { useSiteContent } from "../context/SiteContentContext";
import NoInternet from "./NoInternet";
import LoadingScreen from "./LoadingScreen";
import EmptyState from "./EmptyState";

const CoursePage = () => {
  const { id } = useParams();
  const { courses, loading, isOnline } = useSiteContent();

  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ✅ 1. INTERNET FIRST
  if (!isOnline) {
    return <NoInternet />;
  }

  // ✅ 2. LOADING
  if (loading) {
    return <LoadingScreen />;
  }

  // ✅ 3. GET COURSE (state → fallback)
  let course = location.state;

  if (!course) {
    course = courses.find((c) => String(c.id) === String(id));
  }

  // ✅ 4. EMPTY STATE
  if (!course) {
    return (
      <EmptyState
        title="Course not found"
        message="This course does not exist or was removed."
        showBack
        onBack={() => navigate(-1)}
        label="← Back"
      />
    );
  }

  return (
    <section className={styles.coursePage}>
      {" "}
      {/* 🔥 SAME AS course */}
      <div className={styles.courseContainer}>
        {/* BACK */}
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* HERO */}
        <div className={styles.courseHero}>
          {/* IMAGE */}
          <div className={styles.courseImage}>
            <img src={course.image || images.phone} alt={course.title} />
          </div>

          {/* CONTENT */}
          <div className={styles.courseInfo}>
            {/* TAG */}
            <span
              className={`${styles.courseTag} ${
                course.level === "Beginner"
                  ? styles.tagBeginner
                  : course.level === "Intermediate"
                    ? styles.tagInter
                    : styles.tagAdv
              }`}
            >
              {course.level}
            </span>

            <h1>{course.title}</h1>
            <p>{course.desc}</p>

            {/* META */}
            <div className={styles.courseMeta}>
              {course.duration && <span>⏱ {course.duration}</span>}
              {course.lessons && <span>📚 {course.lessons} lessons</span>}
              {course.category && <span>👨‍💻 {course.category}</span>}
            </div>

            {/* ACTIONS */}
            <div className={styles.courseActions}>
              <div className={styles.coursePrice}>
                {course.price}
                {course.oldPrice && (
                  <span className={styles.old}>{course.oldPrice}</span>
                )}
              </div>

              <button
                className={styles.courseBtn}
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

        {/* DETAILS (like course page 🔥) */}
        <div className={styles.courseDetails}>
          <h2>What you'll learn</h2>

          <ul>
            {(course.learnings || []).map((item, i) => (
              <li key={i}>✔ {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CoursePage;
