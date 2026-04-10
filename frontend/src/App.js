import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Courses from "./components/Courses";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Youtube from "./components/Youtube"; 
/* Temporary pages */
import VideoPage from "./components/VideoPage";                 
const Products = () => <div style={{ padding: "2rem" }}>Products Page</div>;
const Contact = () => <div style={{ padding: "2rem" }}>Contact Page</div>;


function App() {
  return (
    <BrowserRouter>
      {/* Navbar always visible */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/youtube/video/:id" element={<VideoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
