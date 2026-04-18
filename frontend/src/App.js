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
import ProductPage from "./components/ProductPage";
import Product from "./components/Product";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import Success from "./components/Success";
import CheckoutFormCart from "./components/CheckoutFormCart";
import YoutubeCourse from "./components/YoutubeCourse";

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
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/products" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/youtube" element={<Youtube />} />
        <Route path="/youtube/course/:playlist" element={<YoutubeCourse />} />
        <Route path="/success" element={<Success />} />
        <Route path="/checkout" element={<CheckoutFormCart />} />
        <Route path="/youtube/video/:id" element={<VideoPage />} />
        <Route path="/courses/course/:id" element={<CoursePage />} />
        <Route path="/products/product/:id" element={<ProductPage/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
