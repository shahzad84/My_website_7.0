import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Courses.module.css";
import { images } from "./images";
import { useCart } from "../context/CartContext";
import { useSiteContent } from "../context/SiteContentContext";
import NoInternet from "./NoInternet";
import LoadingScreen from "./LoadingScreen";
import EmptyState from "./EmptyState";

const HomeCourses = () => {
  const { courses, loading, isOnline } = useSiteContent();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  // ✅ 1. INTERNET
  if (!isOnline) {
    return <NoInternet />;
  }

  // ✅ 2. LOADING
  if (loading) {
    return <LoadingScreen />;
  }

  // ✅ 3. EMPTY
  if (!courses || courses.length === 0) {
    return (
      <EmptyState
        title="No Courses"
        message="No courses available right now."
      />
    );
  }
  const featuredCourses = (courses || []).length
    ? courses.some((c) => c.featured)
      ? courses.filter((c) => c.featured).slice(0, 3)
      : courses.slice(0, 3)
    : [];

  return (
    <section className={styles.courses}>
      <div className={styles.coursesHeader}>
        <div>
          <p className={styles.sectionLabel}>→ Learn With Us</p>
          <h2 className={styles.sectionTitle}>Featured Courses</h2>
        </div>

        <button
          className={styles.btnOutline}
          onClick={() => navigate("/courses")}
        >
          View All Courses →
        </button>
      </div>

      {/* ✅ LOADING STATE */}
      {loading ? (
        <div className={styles.coursesLoading}>Loading courses...</div>
      ) : (
        <div className={styles.coursesGrid}>
          {featuredCourses.map((course) => (
            <div
              className={styles.courseCard}
              key={course.id}
              onClick={() =>
                navigate(`/courses/course/${course.id}`, { state: course })
              }
            >
              <div className={styles.courseThumb}>
                <img src={course.image} alt={course.title} />
                <div className={styles.courseOverlay}>View Course</div>
              </div>

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

              <h3 className={styles.courseTitle}>{course.title}</h3>
              <p className={styles.courseDesc}>{course.desc}</p>

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
                      image: course.image || images.phone,
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
          ))}
        </div>
      )}
    </section>
  );
};

export default HomeCourses;
