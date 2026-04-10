import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import FeaturedCourses from "./FeaturedCourses";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <FeaturedCourses/>
    </>
  );
};

export default Home;