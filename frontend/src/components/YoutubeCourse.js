import styles from "./Youtube.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSiteContent } from "../context/SiteContentContext";
import NoInternet from "./NoInternet";
import LoadingScreen from "./LoadingScreen";
import EmptyState from "./EmptyState";


export default function YoutubeCourse() {
  const navigate = useNavigate();
  const { videos, loading, isOnline } = useSiteContent();
  
  const { playlist } = useParams();

  const decodedPlaylist = decodeURIComponent(playlist);

  console.log("URL PLAYLIST:", decodedPlaylist);

  // ✅ FILTER CORRECTLY

  if (!isOnline) {
    return <NoInternet />;
  }

  if (loading) {
    return <LoadingScreen />;
  }
  const filteredVideos = videos.filter((v) => v.playlist === decodedPlaylist);

  // console.log("FILTERED:", filteredVideos);

  if (!filteredVideos.length) {
    return (<EmptyState
      title={decodedPlaylist}
      message="No videos found in this playlist"
      showBack
      onBack={() => navigate(-1)}
      label="→ Back"
    />);
  }

  return (
    <section className={styles.yt}>
      <div className={styles.ytContainer}>
        {/* HEADER (same as Youtube.js) */}
        <div className={styles.ytHeader}>
          <div>
            <button
              className={styles.ytBackButton}
              onClick={() => navigate(-1)}
              style={{ marginBottom: "1rem" }}
            >
              ← Back
            </button>

            <h2 className={styles.sectionTitle}>{decodedPlaylist}</h2>

            <p className={styles.sectionDesc}>
              {filteredVideos.length} videos in this playlist
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className={styles.ytGrid}>
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className={styles.ytCard}
              onClick={() =>
                navigate(`/youtube/video/${video.id}`, {
                  state: video,
                })
              }
            >
              {/* THUMB */}
              <div className={styles.ytThumb}>
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={video.title}
                />
                <div className={styles.ytOverlay}>▶</div>

                {/* ✅ duration badge */}
                <div className={styles.ytBadge}>{video.duration}</div>
              </div>

              {/* ✅ TAGS (THIS WAS IMPORTANT) */}
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

              {/* TEXT */}
              <h3>{video.title}</h3>
              <p>{video.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
