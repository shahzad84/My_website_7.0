import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VideoPage.css";

const VideoPage = () => {
  const { state: video } = useLocation();
  const navigate = useNavigate();

  if (!video) {
    return <p>No video found</p>;
  }

  return (
    <section className="video-page">
      <div className="video-container">

        {/* BACK BUTTON */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {/* VIDEO PLAYER */}
        <div className="video-player">
            <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            </div>

        {/* META */}
        <div className="video-meta">
          <span className="category-tag">{video.category}</span>
          <span className="level-tag">{video.level}</span>
          <span className="duration">{video.duration}</span>
        </div>

        {/* CONTENT */}
        <h1>{video.title}</h1>
        <p>{video.desc}</p>

      </div>
    </section>
  );
};

export default VideoPage;