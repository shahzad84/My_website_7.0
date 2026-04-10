import React from "react";
import "./Youtube.css";
import { useNavigate } from "react-router-dom";
const videos = [
  {
    id: 1,
    title: "Build a DevStore UI",
    desc: "Learn how to design a premium developer UI from scratch.",
    category: "UI Design",
    duration: "22m",
    level: "Intermediate",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
  },
  {
    id:2,
    title: "React Landing Page",
    desc: "Create modern SaaS landing pages using React.",
    category: "React",
    duration: "18m",
    level: "Beginner",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
  },
  {
    id:3,
    title: "CSS Neon Effects",
    desc: "Master glowing UI effects and animations in CSS.",
    category: "CSS",
    duration: "15m",
    level: "Beginner",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
  },
  {
    id: 4,
    title: "Node.js REST API",
    desc: "Build production-ready REST APIs with Node.js.",
    category: "Backend",
    duration: "28m",
    level: "Intermediate",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
  },
  {
    id:5,
    title: "React Hooks Mastery",
    desc: "Deep dive into React Hooks and custom hooks.",
    category: "React",
    duration: "25m",
    level: "Advanced",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
  },
  {
    id:6,
    title: "Database Design 101",
    desc: "Learn SQL and database design patterns.",
    category: "Database",
    duration: "32m",
    level: "Intermediate",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
  },
  {
    id:7,
    title: "Responsive Design Tips",
    desc: "Mobile-first design patterns and techniques.",
    category: "Responsive",
    duration: "20m",
    level: "Beginner",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
  },
  {
    id:8,
    title: "JavaScript Advanced",
    desc: "Closures, Promises, Async/Await explained.",
    category: "JavaScript",
    duration: "30m",
    level: "Advanced",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
  },
  {
    id: 9,
    title: "Web Performance",
    desc: "Optimize your website for speed and performance.",
    category: "Performance",
    duration: "24m",
    level: "Intermediate",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
  },
  {
    id: 10,
    title: "DevTools Deep Dive",
    desc: "Master browser DevTools for debugging.",
    category: "Tools",
    duration: "19m",
    level: "Beginner",
    videoId: "ddjwOAZYssM",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg",
  },
];

const getLevelColor = (level) => {
  switch (level) {
    case "Beginner":
      return "level-beginner";
    case "Intermediate":
      return "level-intermediate";
    case "Advanced":
      return "level-advanced";
    default:
      return "level-beginner";
  }
};

const Youtube = () => {
  const navigate = useNavigate();
  return (
    <section className="yt">
      <div className="yt-container">
        {/* HEADER */}
        <div className="yt-header">
          <p className="section-label">→ YOUTUBE CHANNEL</p>
          <h2 className="section-title">
            Learn. Build. <span>Ship.</span>
          </h2>
          <p className="section-desc">
            Watch tutorials, build real projects, and level up your frontend
            skills with modern tools and clean UI design.
          </p>
        </div>

        {/* VIDEOS GRID */}
        <div className="yt-grid">
          {videos.map((video, i) => (
            <div className="yt-card" key={i} onClick={() => navigate(`/youtube/video/${video.id}`, { state: video })}>
              {/* THUMBNAIL */}
              <div className="yt-thumb">
                <img src={video.thumbnail} alt={video.title} />
                <div className="play-btn">▶</div>
                <div className="yt-badge">{video.duration}</div>
              </div>

              {/* METADATA */}
              <div className="yt-meta">
                <span className="category-tag">{video.category}</span>
                <span className={`level-tag ${getLevelColor(video.level)}`}>
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
