import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-light)",
        padding: "2.5rem 0",
        position: "relative",
        background: "rgba(3, 5, 12, 0.4)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {/* Left Side Info */}
        <div>
          <div
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              fontWeight: 500,
            }}
          >
            © {new Date().getFullYear()} Kotha Sriram Prasad. All rights reserved.
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              marginTop: "0.25rem",
            }}
          >
            Designed & developed with React, Modern CSS & AI.
          </div>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid var(--border-light)",
            color: "var(--text-secondary)",
            borderRadius: "12px",
            width: "42px",
            height: "42px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--primary)";
            e.currentTarget.style.borderColor = "var(--primary)";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.borderColor = "var(--border-light)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          title="Back to Top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
}
