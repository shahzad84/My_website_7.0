import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Courses from "./components/Courses";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Youtube from "./components/Youtube"; 
import ScrollToTop from "./components/ScrollToTop";
/* Temporary pages */
import VideoPage from "./components/VideoPage"; 
import CoursePage from "./components/CoursePage";




const Products = () => <div style={{ padding: "2rem" }}>Products Page</div>;
const Contact = () => <div style={{ padding: "2rem" }}>Contact Page</div>;


function App() {
  return (
    <BrowserRouter>
      {/* Navbar always visible */}
      <Navbar />
      <ScrollToTop />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/youtube/video/:id" element={<VideoPage />} />
        <Route path="/courses/Course/:id" element={<CoursePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
