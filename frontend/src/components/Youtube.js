import styles from "./Youtube.module.css";
import { useNavigate } from "react-router-dom";
import { useSiteContent } from "../context/SiteContentContext";

const Youtube = () => {
  const navigate = useNavigate();
  const { videos, loading } = useSiteContent();

  // ✅ GROUP BY PLAYLIST
  const playlists = Object.values(
    videos.reduce((acc, video) => {
      const key = (video.playlist || "Uncategorized").trim();

      if (!acc[key]) {
        acc[key] = {
          playlist: key,
          category: video.category,
          desc: video.playlistDesc,
          count: 0,
          thumbnail: video.videoId,
        };
      }

      acc[key].count++;
      return acc;
    }, {})
  );

  console.log("PLAYLISTS:", playlists);

  if (loading) {
    return <p>Loading...</p>;
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
          skills.
        </p>
      </div>
    </div>

    {/* GRID */}
    <div className={styles.ytGrid}>
      {playlists.map((course) => (
        <div
          key={course.playlist}
          className={styles.ytCard}
          onClick={() =>
            navigate(`/youtube/course/${encodeURIComponent(course.playlist)}`)
          }
        >
          {/* THUMB */}
          <div className={styles.ytThumb}>
            <img
              src={`https://img.youtube.com/vi/${course.thumbnail}/hqdefault.jpg`}
              alt={course.playlist}
            />
            <div className={styles.ytOverlay}>▶</div>

            {/* ✅ badge */}
            <div className={styles.ytBadge}>
              {course.count} videos
            </div>
          </div>

          {/* TEXT */}
          <h3>{course.playlist}</h3>
          <p>{course.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default Youtube;