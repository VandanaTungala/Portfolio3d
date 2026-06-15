import { Award } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import TiltCard from "./TiltCard";

export default function Certifications() {
  const { certifications } = portfolioData;

  return (
    <section
      id="certifications"
      className="scroll-reveal"
      style={{
        padding: "5rem 0",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Section Heading */}
        <div style={{ marginBottom: "4rem" }}>
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
            03 / Achievements
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
            Certifications
            <span style={{ width: "80px", height: "1px", background: "var(--border-light)" }} />
          </h2>
        </div>

        {/* Timeline Layout */}
        <div
          style={{
            position: "relative",
            maxWidth: "900px",
            margin: "0 auto",
            padding: "2rem 0",
          }}
          className="timeline-container"
        >
          {/* Vertical axis line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(to bottom, var(--primary), var(--secondary))",
              transform: "translateX(-50%)",
              opacity: 0.6,
            }}
            className="timeline-axis"
          />

          {/* Timeline Items */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "3rem",
            }}
          >
            {certifications.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    position: "relative",
                  }}
                  className={`timeline-row ${isEven ? "row-left" : "row-right"}`}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: isEven ? "var(--primary)" : "var(--secondary)",
                      border: "4px solid var(--bg-main)",
                      transform: "translateX(-50%)",
                      boxShadow: `0 0 10px ${isEven ? "var(--primary)" : "var(--secondary)"}`,
                      zIndex: 5,
                    }}
                    className="timeline-dot"
                  />

                  {/* Left Side Content (Placeholder/Spacing for layouts) */}
                  <div
                    style={{
                      width: "45%",
                      display: isEven ? "block" : "none",
                    }}
                    className="timeline-empty-space"
                  />

                  {/* Certification Card */}
                  <TiltCard
                    maxTilt={5}
                    style={{
                      width: "45%",
                    }}
                    className="timeline-card-wrapper"
                  >
                    <div style={{ padding: "1.75rem" }}>
                      {/* Timeline Card Header */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                          marginBottom: "1rem",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              fontFamily: "'Outfit', sans-serif",
                              fontSize: "1.2rem",
                              color: "var(--text-primary)",
                              fontWeight: 600,
                              lineHeight: "1.4",
                            }}
                          >
                            {item.title}
                          </h3>
                          <span
                            style={{
                              fontSize: "0.9rem",
                              color: isEven ? "var(--primary)" : "var(--secondary)",
                              fontWeight: 500,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.35rem",
                              marginTop: "0.25rem",
                            }}
                          >
                            <Award size={14} /> {item.issuer}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            fontFamily: "'JetBrains Mono', monospace",
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid var(--border-light)",
                            padding: "0.25rem 0.6rem",
                            borderRadius: "4px",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {item.duration}
                        </span>
                      </div>

                    </div>
                  </TiltCard>

                  {/* Right Side Content (Placeholder/Spacing for layouts) */}
                  <div
                    style={{
                      width: "45%",
                      display: isEven ? "none" : "block",
                    }}
                    className="timeline-empty-space"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS adjustments for responsive timeline */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-axis {
            left: 20px !important;
            transform: none !important;
          }
          .timeline-dot {
            left: 20px !important;
            transform: translateX(-50%) !important;
          }
          .timeline-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding-left: 45px !important;
          }
          .timeline-card-wrapper {
            width: 100% !important;
          }
          .timeline-empty-space {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
