import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 60;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Particle Texture (Minimalistic Circular Plexus Nodes) ---
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      
      ctx.fillStyle = "rgba(30, 23, 42, 0.85)";
      ctx.beginPath();
      ctx.arc(8, 8, 5, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      
      return new THREE.CanvasTexture(canvas);
    };

    // --- Particles Geometry & Material ---
    const particleCount = 65;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;    // X
      positions[i3 + 1] = (Math.random() - 0.5) * 80; // Y (focused in viewport)
      positions[i3 + 2] = (Math.random() - 0.5) * 60; // Z
      
      velocities[i3] = (Math.random() - 0.5) * 0.04;     // Slow float
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.04;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.04;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 1.8,
      map: createParticleTexture(),
      transparent: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // --- Line Segments for Connections (Plexus) ---
    const maxConnections = 250;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);
    
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      linewidth: 1,
    });
    
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    const floatingShapes = [];

    // --- Interactive Mouse & Scroll State ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // --- Animation Loop ---
    let animationFrameId;
    const connectionDistance = 18;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.08;

      particles.rotation.y = targetX * 0.12;
      particles.rotation.x = targetY * 0.08;
      lineSegments.rotation.y = targetX * 0.12;
      lineSegments.rotation.x = targetY * 0.08;
      
      particles.position.z = -scrollY * 0.015;
      lineSegments.position.z = -scrollY * 0.015;

      const positionsArray = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        positionsArray[i3] += velocities[i3];
        positionsArray[i3 + 1] += velocities[i3 + 1];
        positionsArray[i3 + 2] += velocities[i3 + 2];
        
        if (Math.abs(positionsArray[i3]) > 55) velocities[i3] *= -1;
        if (Math.abs(positionsArray[i3 + 1]) > 45) velocities[i3 + 1] *= -1;
        if (Math.abs(positionsArray[i3 + 2]) > 35) velocities[i3 + 2] *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      let lineIndex = 0;
      const lPositions = lineGeometry.attributes.position.array;
      const lColors = lineGeometry.attributes.color.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x1 = positionsArray[i3];
        const y1 = positionsArray[i3 + 1];
        const z1 = positionsArray[i3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const j3 = j * 3;
          const x2 = positionsArray[j3];
          const y2 = positionsArray[j3 + 1];
          const z2 = positionsArray[j3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connectionDistance * connectionDistance) {
            const dist = Math.sqrt(distSq);
            const alpha = 1.0 - (dist / connectionDistance);
            
            const lineSegmentStartIdx = lineIndex * 6;
            
            lPositions[lineSegmentStartIdx] = x1;
            lPositions[lineSegmentStartIdx + 1] = y1;
            lPositions[lineSegmentStartIdx + 2] = z1;
            
            lPositions[lineSegmentStartIdx + 3] = x2;
            lPositions[lineSegmentStartIdx + 4] = y2;
            lPositions[lineSegmentStartIdx + 5] = z2;

            // Interpolate line color between #1e172a (dark charcoal/black) and #f5f0fa (background)
            // so connection lines are thin, delicate, and fade out cleanly
            const r = 0.12 * alpha + 0.96 * (1.0 - alpha);
            const g = 0.09 * alpha + 0.94 * (1.0 - alpha);
            const b = 0.16 * alpha + 0.98 * (1.0 - alpha);
            
            lColors[lineSegmentStartIdx] = r;
            lColors[lineSegmentStartIdx + 1] = g;
            lColors[lineSegmentStartIdx + 2] = b;
            
            lColors[lineSegmentStartIdx + 3] = r;
            lColors[lineSegmentStartIdx + 4] = g;
            lColors[lineSegmentStartIdx + 5] = b;

            lineIndex++;
            if (lineIndex >= maxConnections) break;
          }
        }
        if (lineIndex >= maxConnections) break;
      }

      for (let k = lineIndex; k < maxConnections; k++) {
        const lineSegmentStartIdx = k * 6;
        lPositions[lineSegmentStartIdx] = 0;
        lPositions[lineSegmentStartIdx + 1] = 0;
        lPositions[lineSegmentStartIdx + 2] = 0;
        lPositions[lineSegmentStartIdx + 3] = 0;
        lPositions[lineSegmentStartIdx + 4] = 0;
        lPositions[lineSegmentStartIdx + 5] = 0;

        lColors[lineSegmentStartIdx] = 1.0;
        lColors[lineSegmentStartIdx + 1] = 1.0;
        lColors[lineSegmentStartIdx + 2] = 1.0;
        lColors[lineSegmentStartIdx + 3] = 1.0;
        lColors[lineSegmentStartIdx + 4] = 1.0;
        lColors[lineSegmentStartIdx + 5] = 1.0;
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}
