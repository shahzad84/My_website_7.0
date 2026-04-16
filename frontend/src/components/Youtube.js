import styles from "./Youtube.module.css";
import { useNavigate } from "react-router-dom";
import { useSiteContent } from "../context/SiteContentContext";



const Youtube = () => {
  const navigate = useNavigate();
  const { videos, loading, usingFallback } = useSiteContent();

  // ✅ LOADING STATE (same as courses)
  if (loading) {
    return (
      <section className={styles.yt}>
        <p className={styles.loadingText}>Loading videos...</p>
      </section>
    );
  }

  // ✅ EMPTY STATE
  if (!videos || videos.length === 0) {
    return (
      <section className={styles.yt}>
        <p className={styles.emptyText}>No videos available right now.</p>
      </section>
    );
  }

  return (
    <section className={styles.yt}>
      <div className={styles.ytContainer}>
        {/* HEADER */}
        <div className={styles.ytHeader}>
          <div>
            <p className={styles.sectionLabel}>→ YOUTUBE CHANNEL</p>

            <h2 className={styles.sectionTitle}>
              Learn. Build. <span>Ship.</span>
            </h2>

            <p className={styles.sectionDesc}>
              Watch tutorials, build real projects, and level up your frontend
              skills with modern tools and clean UI design.
            </p>

            {usingFallback?.videos && (
              <p className={styles.fallbackWarning}>
                Showing default videos (Sheet not connected)
              </p>
            )}
          </div>
        </div>

        {/* VIDEOS GRID */}
        <div className={styles.ytGrid}>
          {videos.map((video) => (
            <div
              className={styles.ytCard}
              key={video.id}
              onClick={() =>
                navigate(`/youtube/video/${video.id}`, {
                  state: video,
                })
              }
            >
              {/* THUMBNAIL */}
              <div className={styles.ytThumb}>
                <img
                  src={
                    video.videoId
                      ? `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
                      : "/fallback.jpg"
                  }
                  alt={video.title}
                />
                <div className={styles.ytOverlay}>▶</div>
                <div className={styles.ytBadge}>{video.duration}</div>
              </div>

              {/* METADATA */}
              <div className={styles.ytMeta}>
                <span className={styles.categoryTag}>{video.category}</span>
                <span
                  className={`${styles.levelTag} ${
                    video.level === "Beginner"
                      ? styles.tagBeginner
                      : video.level === "Intermediate"
                      ? styles.tagInter
                      : styles.tagAdv
                  }`}
                >
                  {video.level}
                </span>
              </div>

              {/* CONTENT */}
              <h3>{video.title}</h3>
              <p>{video.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Youtube;