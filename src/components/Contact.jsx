import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin, TwitterIcon as Twitter } from "./SocialIcons";
import { portfolioData } from "../data/portfolioData";

export default function Contact() {
  const { socials } = portfolioData;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section
      id="contact"
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
            04 / Connect
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
            Get In Touch
            <span style={{ width: "80px", height: "1px", background: "var(--border-light)" }} />
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left Column: Social Links & Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "1.5rem",
                color: "var(--text-primary)",
                fontWeight: 600,
              }}
            >
              Let's create something great together.
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: "1.6",
                fontSize: "1.05rem",
              }}
            >
              Have an exciting project, a role opportunity, or just want to chat about 3D web technologies? Feel free to drop a message or reach out via email or socials.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1rem" }}>
              {/* Email link card */}
              <a
                href={`mailto:${socials.email}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  textDecoration: "none",
                  color: "var(--text-secondary)",
                  padding: "1rem",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid var(--border-light)",
                  transition: "all 0.3s ease",
                }}
                className="contact-card"
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "8px",
                    background: "rgba(0, 0, 0, 0.04)",
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "var(--primary)",
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                    Email Me
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 500 }}>
                    {socials.email}
                  </div>
                </div>
              </a>

              {/* Social Channels */}
              <div style={{ display: "flex", gap: "1rem" }}>
                {[
                  { icon: <Github size={20} />, link: socials.github, label: "GitHub" },
                  { icon: <Linkedin size={20} />, link: socials.linkedin, label: "LinkedIn" },
                  { icon: <Twitter size={20} />, link: socials.twitter, label: "Twitter" },
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid var(--border-light)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "var(--text-secondary)",
                      transition: "all 0.3s ease",
                    }}
                    className="social-btn"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div
            className="glass-panel"
            style={{
              padding: "2.5rem",
              border: "1px solid var(--border-light)",
              position: "relative",
            }}
          >
            {status === "success" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "3rem 0",
                  textAlign: "center",
                  animation: "fadeIn 0.5s ease",
                }}
              >
                <CheckCircle size={56} style={{ color: "var(--primary)", marginBottom: "1.5rem" }} />
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                  Message Sent Successfully!
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "320px", lineHeight: "1.5" }}>
                  Thank you for reaching out. I have received your message and will respond to you shortly!
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn btn-secondary"
                  style={{ marginTop: "2rem" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label htmlFor="name" style={{ fontSize: "0.85rem", fontFamily: "'Outfit', sans-serif", fontWeight: 500, color: "var(--text-secondary)" }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "8px",
                      padding: "0.8rem 1rem",
                      color: "var(--text-primary)",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "all 0.3s",
                    }}
                    placeholder="Enter your name"
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label htmlFor="email" style={{ fontSize: "0.85rem", fontFamily: "'Outfit', sans-serif", fontWeight: 500, color: "var(--text-secondary)" }}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "8px",
                      padding: "0.8rem 1rem",
                      color: "var(--text-primary)",
                      fontSize: "0.95rem",
                      outline: "none",
                      transition: "all 0.3s",
                    }}
                    placeholder="Enter your email address"
                    className="form-input"
                  />
                </div>

                {/* Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label htmlFor="message" style={{ fontSize: "0.85rem", fontFamily: "'Outfit', sans-serif", fontWeight: 500, color: "var(--text-secondary)" }}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid var(--border-light)",
                      borderRadius: "8px",
                      padding: "0.8rem 1rem",
                      color: "var(--text-primary)",
                      fontSize: "0.95rem",
                      outline: "none",
                      resize: "none",
                      transition: "all 0.3s",
                    }}
                    placeholder="Write your message details..."
                    className="form-input"
                  />
                </div>

                {/* Feedback message */}
                {status === "error" && (
                  <div style={{ fontSize: "0.85rem", color: "#ef4444", fontWeight: 500 }}>
                    Please fill out all input fields before submitting.
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-primary"
                  style={{
                    marginTop: "0.5rem",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  {status === "sending" ? (
                    <>
                      Sending Message...
                      <div className="spinner" />
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* CSS overrides & dynamic styling */}
      <style>{`
        .form-input:focus {
          border-color: var(--primary) !important;
          background: rgba(0, 0, 0, 0.01) !important;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        }
        .contact-card:hover {
          border-color: var(--primary) !important;
          background: rgba(0, 0, 0, 0.03) !important;
          transform: translateY(-2px);
        }
        .social-btn:hover {
          color: var(--primary) !important;
          border-color: var(--primary) !important;
          background: rgba(0, 0, 0, 0.03) !important;
          transform: translateY(-2px);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
