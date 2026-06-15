import { portfolioData } from "../data/portfolioData";
import TiltCard from "./TiltCard";

export default function About() {
  const { profile, skills } = portfolioData;

  return (
    <section
      id="about"
      className="scroll-reveal"
      style={{
        padding: "5rem 0",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Heading */}
        <div style={{ marginBottom: "3rem" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "var(--primary)",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            01 / Background
          </span>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(2rem, 5vw, 2.75rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              display: "inline-flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            About Me
            <span style={{ width: "80px", height: "1px", background: "var(--border-light)" }} />
          </h2>
        </div>

        {/* Content Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left Column: Bio & Stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.7",
                color: "var(--text-secondary)",
              }}
            >
              {profile.about}
            </p>

            {/* Stats Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1.5rem",
              }}
            >
              {profile.stats.map((stat, index) => (
                <TiltCard
                  key={index}
                  maxTilt={8}
                  className="stat-card"
                >
                  <div
                    style={{
                      padding: "1.5rem",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "2.25rem",
                        fontWeight: 800,
                        color: "var(--primary)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Right Column: Skills */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.35rem",
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
              }}
            >
              Technical Arsenal
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {skills.map((group, index) => (
                <div
                  key={index}
                  className="glass-panel"
                  style={{
                    padding: "1.5rem",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "1rem",
                      color: "var(--primary)",
                      marginBottom: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {group.category}
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.75rem",
                    }}
                  >
                    {group.items.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        style={{
                          background: "rgba(0, 0, 0, 0.02)",
                          border: "1px solid var(--border-light)",
                          borderRadius: "6px",
                          padding: "0.4rem 0.8rem",
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                          transition: "all 0.2s ease",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "var(--primary)";
                          e.target.style.borderColor = "var(--primary)";
                          e.target.style.background = "rgba(0, 0, 0, 0.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "var(--text-secondary)";
                          e.target.style.borderColor = "var(--border-light)";
                          e.target.style.background = "rgba(0, 0, 0, 0.02)";
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive adjustments CSS */}
      <style>{`
        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
