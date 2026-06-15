import { useEffect } from "react";
import ThreeCanvas from "./components/ThreeCanvas";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  // IntersectionObserver Fallback for Scroll-Driven Animations
  useEffect(() => {
    // Check if browser supports native CSS scroll-driven animations
    const supportsScrollTimeline = CSS.supports(
      "(animation-timeline: view()) and (animation-range: entry)"
    );

    if (!supportsScrollTimeline) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-active");
            }
          });
        },
        {
          threshold: 0.1, // trigger when 10% of element is in view
          rootMargin: "0px 0px -50px 0px" // bottom offset offset
        }
      );

      const revealElements = document.querySelectorAll(".scroll-reveal");
      revealElements.forEach((el) => {
        el.classList.add("reveal-init");
        observer.observe(el);
      });

      return () => {
        revealElements.forEach((el) => {
          observer.unobserve(el);
        });
      };
    }
  }, []);

  return (
    <>
      {/* 3D Particle background */}
      <ThreeCanvas />

      {/* Floating Header */}
      <Navbar />

      {/* Content wrapper */}
      <main style={{ position: "relative", zIndex: 10 }}>
        {/* Landing Page */}
        <Hero />

        {/* Bio & Skills */}
        <About />

        {/* Portfolio Grids */}
        <Projects />

        {/* Achievements Timeline */}
        <Certifications />

        {/* Feedback Forms */}
        <Contact />
      </main>

      {/* Footer Details */}
      <Footer />
    </>
  );
}
