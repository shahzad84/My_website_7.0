import React, { useEffect, useRef } from "react"; // Added useEffect and useRef
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSiteContent } from "../context/SiteContentContext";
import styles from "./VideoPage.module.css";
import NoInternet from "./NoInternet";
import LoadingScreen from "./LoadingScreen";
import EmptyState from "./EmptyState";

const VideoPage = () => {
  const { id } = useParams();
  const { videos, loading, isOnline } = useSiteContent();
  const videoRef = useRef(null); // Ref to track the video container

  const location = useLocation();
  const navigate = useNavigate();

  // Handle Auto-Rotate Logic
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        // If we entered fullscreen, try to lock to landscape
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock("landscape").catch((err) => {
            console.log("Orientation lock ignored or failed:", err);
          });
        }
      } else {
        // If we exited, unlock it back to the user's system preference
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange); // Safari support

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  let video = location.state;

  if (!isOnline) return <NoInternet />;
  if (loading) return <LoadingScreen />;

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
        <button className={styles.videoPageBackBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className={styles.videoPagePlayer}>
          {/* We attach the ref to the container of the iframe */}
          <div className={styles.videoPageImage} ref={videoRef}>
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}?playsinline=0&fs=1&rel=0&modestbranding=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className={styles.videoPageInfo}>
            <span className={styles.videoPageCategoryTag}>{video.category}</span>
            <h1>{video.title}</h1>
            <p>{video.desc}</p>
            <div className={styles.videoPageMeta}>
              {video.level && <span className={styles.videoPageLevelTag}>📊 {video.level}</span>}
              {video.duration && <span className={styles.videoPageDuration}>⏱ {video.duration}</span>}
            </div>
          </div>
        </div>

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