import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import Typewriter from "./Typewriter";

export default function Hero() {
  const { profile } = portfolioData;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        paddingTop: "var(--nav-height)",
        overflow: "hidden",
      }}
    >
      {/* Background glow mesh overlays */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "var(--primary-glow)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "var(--secondary-glow)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "800px" }}>
          {/* Subheading greeting */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(0, 0, 0, 0.04)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              padding: "0.4rem 1rem",
              borderRadius: "9999px",
              color: "var(--primary)",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)" }} />
            Hello World, I'm
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--text-primary)",
              marginBottom: "1rem",
              letterSpacing: "-0.03em",
            }}
          >
            {profile.name}
          </h1>

          {/* Animated typing section */}
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(1.5rem, 4.5vw, 2.25rem)",
              fontWeight: 500,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            I am a{" "}
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>
              <Typewriter texts={profile.titles} speed={100} deleteSpeed={50} delay={2000} />
            </span>
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "clamp(1rem, 3vw, 1.15rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              marginBottom: "2.5rem",
              maxWidth: "600px",
            }}
          >
            {profile.bio}
          </p>

          {/* Call-to-actions */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.25rem",
              marginBottom: "2rem",
            }}
          >
            <button onClick={() => scrollToSection("contact")} className="btn btn-primary">
              Get In Touch <ArrowRight size={18} />
            </button>
            <a href="/Vandana_Resume.pdf" download className="btn btn-secondary" style={{ textDecoration: "none" }}>
              Download CV <Download size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Mouse Scroll Indicator */}
      <div
        onClick={() => scrollToSection("about")}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.7,
          transition: "opacity 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.7)}
      >
        <div
          style={{
            width: "24px",
            height: "40px",
            borderRadius: "12px",
            border: "2px solid var(--text-secondary)",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "8px",
              borderRadius: "2px",
              background: "var(--primary)",
              animation: "scrollMouse 1.5s infinite ease-in-out",
            }}
          />
        </div>
        <span style={{ fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", color: "var(--text-secondary)" }}>
          Scroll Down
        </span>
      </div>

      {/* CSS keyframe for mouse scroll wheel */}
      <style>{`
        @keyframes scrollMouse {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.3; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
