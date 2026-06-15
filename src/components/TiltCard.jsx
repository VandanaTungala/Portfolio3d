import { useRef } from "react";

export default function TiltCard({ children, className = "", maxTilt = 15, style = {} }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X relative to card
    const y = e.clientY - rect.top;  // Mouse Y relative to card

    // Centered values from [-0.5, 0.5]
    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;

    // Calculate rotation angles (negate py so tilting up rotates backward)
    const rotateX = -(py * maxTilt).toFixed(2);
    const rotateY = (px * maxTilt).toFixed(2);

    // Apply rotation and reflection coordinates directly to style variables
    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--x", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--y", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    // Reset rotation and reflection position smoothly
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--x", "50%");
    card.style.setProperty("--y", "50%");
  };

  return (
    <div
      ref={cardRef}
      className={`glass-panel ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        position: "relative",
        transition: "transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease",
        overflow: "hidden",
        ...style
      }}
    >
      {/* Glossy reflection overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.08) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
      
      {/* Content wrapper with perspective translation */}
      <div style={{ transform: "translateZ(20px)", zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}
