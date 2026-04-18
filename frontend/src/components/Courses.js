import React from "react";
import styles from "./Courses.module.css";
import { useNavigate } from "react-router-dom";
import { images } from "./images";
import { useCart } from "../context/CartContext";
import { useSiteContent } from "../context/SiteContentContext";
import NoInternet from "./NoInternet";
import LoadingScreen from "./LoadingScreen";
import EmptyState from "./EmptyState";

const Courses = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // 🔥 dynamic data from Google Sheets
  const { courses, loading, usingFallback, isOnline } = useSiteContent();

  // ✅ 1. INTERNET FIRST
  if (!isOnline) {
    return <NoInternet />;
  }

  // ✅ 2. LOADING
  if (loading) {
    return <LoadingScreen />;
  }

  // ✅ 3. EMPTY STATE
  if (!courses || courses.length === 0) {
    return (
      <EmptyState
        title="No Courses"
        message="No courses available right now."
      />
    );
  }

  return (
    <section className={styles.courses}>
      <div className={styles.coursesHeader}>
        <div>
          <p className={styles.sectionLabel}>→ All Courses</p>
          <h2 className={styles.sectionTitle}>Complete Course Catalog</h2>
          <p className={styles.sectionDesc}>
            Learn real-world skills with structured courses designed to help you
            build, ship, and grow as a developer.
          </p>

          {/* optional debug */}
          {usingFallback?.courses && (
            <p className={styles.fallbackWarning}>
              Showing default courses (Sheet not connected)
            </p>
          )}
        </div>
      </div>

      <div className={styles.coursesGrid}>
        {courses.map((course) => {
          const imageSrc = course.image || images.phone;

          return (
            <div
              className={styles.courseCard}
              key={course.id}
              onClick={() =>
                navigate(`/courses/course/${course.id}`, {
                  state: course,
                })
              }
            >
              {/* IMAGE */}
              {/* THUMBNAIL */}
              <div className={styles.courseThumb}>
                <img src={imageSrc} alt={course.title} />
                <div className={styles.courseOverlay}>View Course</div>
              </div>

              {/* LEVEL TAG */}
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

              {/* TITLE */}
              <h3 className={styles.courseTitle}>{course.title}</h3>

              {/* DESCRIPTION */}
              <p className={styles.courseDesc}>{course.desc}</p>

              {/* META */}
              <div className={styles.courseMeta}>
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

                    const mappedCourse = {
                      id: course.id,
                      title: course.title,
                      price: course.price,
                      oldPrice: course.oldPrice,
                      image: imageSrc,
                      type: "course",
                    };

                    addToCart(mappedCourse);
                    navigate("/cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Courses;
