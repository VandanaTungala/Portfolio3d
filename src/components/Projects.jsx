import { useState, useEffect } from "react";
import { ExternalLink, ArrowRight, X } from "lucide-react";
import { GithubIcon as Github } from "./SocialIcons";
import { portfolioData } from "../data/portfolioData";
import TiltCard from "./TiltCard";

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  // Extract unique categories dynamically
  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  // Filter projects based on selection
  const filteredProjects =
    selectedFilter === "All"
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  // Close modal on escape keypress
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="projects"
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
            02 / Portfolio
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
            Featured Projects
            <span style={{ width: "80px", height: "1px", background: "var(--border-light)" }} />
          </h2>
        </div>

        {/* Dynamic Category Filters */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "3rem",
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              style={{
                background: selectedFilter === category ? "var(--primary)" : "rgba(0, 0, 0, 0.02)",
                color: selectedFilter === category ? "#ffffff" : "var(--text-secondary)",
                border: "1px solid",
                borderColor: selectedFilter === category ? "var(--primary)" : "var(--border-light)",
                borderRadius: "9999px",
                padding: "0.5rem 1.25rem",
                fontSize: "0.85rem",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (selectedFilter !== category) {
                  e.target.style.borderColor = "var(--primary)";
                  e.target.style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedFilter !== category) {
                  e.target.style.borderColor = "var(--border-light)";
                  e.target.style.color = "var(--text-secondary)";
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "2rem",
          }}
          className="projects-grid"
        >
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.id}
              maxTilt={10}
              className="project-card"
            >
              {/* Card Thumbnail */}
              <div
                style={{
                  height: "220px",
                  overflow: "hidden",
                  position: "relative",
                  background: "#0c1020",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  className="project-thumbnail"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    background: "rgba(0, 0, 0, 0.75)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid var(--border-light)",
                    borderRadius: "4px",
                    padding: "0.25rem 0.6rem",
                    fontSize: "0.75rem",
                    color: "#ffffff",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {project.category}
                </div>
              </div>

              {/* Card Info */}
              <div style={{ padding: "1.5rem" }}>
                <h3
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "1.25rem",
                    color: "var(--text-primary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    marginBottom: "1.5rem",
                    height: "54px", // standard height for two lines of text
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid var(--border-light)",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => setSelectedProject(project)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--primary)",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 500,
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    View Details <ArrowRight size={16} />
                  </button>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "var(--text-secondary)", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "var(--text-secondary)", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Project Expansion Modal */}
      {selectedProject && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(20px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-panel"
            style={{
              width: "100%",
              maxWidth: "700px",
              maxHeight: "85vh",
              overflowY: "auto",
              position: "relative",
              border: "1px solid var(--border-hover)",
              boxShadow: "0 20px 50px -10px rgba(0, 0, 0, 0.08)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "rgba(0, 0, 0, 0.04)",
                border: "1px solid var(--border-light)",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "var(--text-primary)",
                cursor: "pointer",
                zIndex: 10,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-light)")}
            >
              <X size={18} />
            </button>

            {/* Modal Image */}
            <div style={{ height: "300px", position: "relative", background: "#eaeaea" }}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.5rem",
                  background: "var(--primary)",
                  color: "#ffffff",
                  padding: "0.3rem 0.75rem",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                }}
              >
                {selectedProject.category}
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: "2rem" }}>
              <h3
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.75rem",
                  color: "var(--text-primary)",
                  marginBottom: "1rem",
                }}
              >
                {selectedProject.title}
              </h3>

              <h4
                style={{
                  color: "var(--primary)",
                  fontSize: "0.85rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                Overview
              </h4>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.7",
                  fontSize: "1rem",
                  marginBottom: "2rem",
                }}
              >
                {selectedProject.longDescription}
              </p>

              <h4
                style={{
                  color: "var(--primary)",
                  fontSize: "0.85rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                Tech Stack
              </h4>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "2.5rem",
                }}
              >
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-primary)",
                      background: "rgba(0, 0, 0, 0.04)",
                      border: "1px solid rgba(0, 0, 0, 0.08)",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "6px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  borderTop: "1px solid var(--border-light)",
                  paddingTop: "1.5rem",
                }}
              >
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  Live Demo <ExternalLink size={16} />
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                  style={{ textDecoration: "none" }}
                >
                  Source Code <Github size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS adjustments */}
      <style>{`
        .project-card:hover .project-thumbnail {
          transform: scale(1.05);
        }
        @media (max-width: 600px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
