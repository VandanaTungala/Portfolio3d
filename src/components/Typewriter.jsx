import { useState, useEffect } from "react";

export default function Typewriter({ texts = [], speed = 100, deleteSpeed = 50, delay = 2000 }) {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!texts.length) return;

    let timer;
    const fullText = texts[textIndex % texts.length];

    if (isDeleting) {
      // Deleting text
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deleteSpeed);
    } else {
      // Typing text
      timer = setTimeout(() => {
        setCurrentText((prev) => fullText.slice(0, prev.length + 1));
      }, speed);
    }

    // Handle state transitions
    if (!isDeleting && currentText === fullText) {
      // Pause at full text, then start deleting
      clearTimeout(timer);
      timer = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && currentText === "") {
      // Move to next text, then start typing
      setIsDeleting(false);
      setTextIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex, texts, speed, deleteSpeed, delay]);

  return (
    <span className="cursor-blink" style={{ paddingRight: "4px" }}>
      {currentText}
    </span>
  );
}
