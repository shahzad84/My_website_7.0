import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSiteContent } from "../context/SiteContentContext";
import styles from "./VideoPage.module.css";
import NoInternet from "./NoInternet";
import LoadingScreen from "./LoadingScreen";
import EmptyState from "./EmptyState";
const VideoPage = () => {
  const { id } = useParams();
  const { videos, loading, isOnline } = useSiteContent();

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ state first
  let video = location.state;

  if (!isOnline) {
    return <NoInternet />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  // ✅ fallback
  if (!video) {
    video = videos.find((v) => String(v.id) === String(id));
  }

  if (!video) {
    return (
      <EmptyState
        title="Video not found"
        message="This video does not exist or was removed."
        showBack
        onBack={() => navigate(-1)}
        label="← Back"
      />
    );
  }

  return (
    <section className={styles.videoPage}>
      <div className={styles.videoPageContainer}>
        {/* BACK */}
        <button
          className={styles.videoPageBackBtn}
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* HERO */}
        <div className={styles.videoPagePlayer}>
          {/* LEFT → VIDEO */}
          <div className={styles.videoPageImage}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.videoId}?playsinline=1&modestbranding=1&rel=0`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          </div>

          {/* RIGHT → INFO */}
          <div className={styles.videoPageInfo}>
            {/* TAG */}
            <span className={styles.videoPageCategoryTag}>
              {video.category}
            </span>

            <h1>{video.title}</h1>
            <p>{video.desc}</p>

            {/* META */}
            <div className={styles.videoPageMeta}>
              {video.level && (
                <span className={styles.videoPageLevelTag}>
                  📊 {video.level}
                </span>
              )}
              {video.duration && (
                <span className={styles.videoPageDuration}>
                  ⏱ {video.duration}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* DETAILS SECTION */}
        <div className={styles.videoPageDetails}>
          <h2>About this video</h2>

          <ul>
            {(video.details || []).map((item, i) => (
              <li key={i}>✔ {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VideoPage;
