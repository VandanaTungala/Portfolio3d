import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  // Track active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 150; // offset for nav height
      
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "var(--nav-height)",
        display: "flex",
        alignItems: "center",
        zIndex: 100,
        transition: "all 0.3s ease",
        background: isScrolled ? "rgba(255, 255, 255, 0.85)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: isScrolled ? "1px solid var(--border-light)" : "none",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("home");
          }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          KSRP<span style={{ color: "var(--primary)" }}></span>
        </a>

        {/* Desktop Navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
          }}
          className="desktop-menu"
        >
          <ul
            style={{
              display: "flex",
              gap: "2rem",
              listStyle: "none",
            }}
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.id);
                  }}
                  style={{
                    color: activeSection === link.id ? "var(--primary)" : "var(--text-secondary)",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--primary)")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = activeSection === link.id ? "var(--primary)" : "var(--text-secondary)")
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={portfolioData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{
              padding: "0.5rem 1.25rem",
              fontSize: "0.85rem",
            }}
          >
            GitHub <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            color: "var(--text-primary)",
            cursor: "pointer",
          }}
          className="mobile-toggle"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "var(--nav-height)",
            left: 0,
            width: "100%",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border-light)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              listStyle: "none",
            }}
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.id);
                  }}
                  style={{
                    color: activeSection === link.id ? "var(--primary)" : "var(--text-secondary)",
                    textDecoration: "none",
                    fontWeight: 500,
                    fontSize: "1.1rem",
                    display: "block",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={portfolioData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            GitHub <ArrowUpRight size={16} />
          </a>
        </div>
      )}

      {/* CSS injection for responsive menus */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
