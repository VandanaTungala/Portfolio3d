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

    // --- Particle Texture (Minimalistic Sparkle Stars) ---
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      
      ctx.fillStyle = "rgba(139, 92, 246, 0.85)";
      ctx.beginPath();
      // Start at top tip
      ctx.moveTo(8, 1);
      // Curve to right tip bending inward towards center (8, 8)
      ctx.quadraticCurveTo(8, 8, 15, 8);
      // Curve to bottom tip bending inward towards center (8, 8)
      ctx.quadraticCurveTo(8, 8, 8, 15);
      // Curve to left tip bending inward towards center (8, 8)
      ctx.quadraticCurveTo(8, 8, 1, 8);
      // Curve back to top tip bending inward towards center (8, 8)
      ctx.quadraticCurveTo(8, 8, 8, 1);
      ctx.closePath();
      ctx.fill();
      
      return new THREE.CanvasTexture(canvas);
    };

    // --- Particles Geometry & Material ---
    const particleCount = 240;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 100;     // X
      positions[i3 + 1] = (Math.random() - 0.5) * 320; // Y (spread from -160 to 160)
      positions[i3 + 2] = (Math.random() - 0.5) * 60;  // Z
      
      velocities[i3] = (Math.random() - 0.5) * 0.08;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.08;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.08;
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
    const maxConnections = 450;
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

    // --- Extra Floating 3D Geometries (Tech & design symbols: Curly Braces, HTML Tags, Ampersand, Arrows, Pen Nib, Cursor) ---
    const floatingShapes = [];
    
    // 1. Extruded 3D Figma Vector Pen Tool Nib Geometry (UI/UX Design)
    const penNibShape = new THREE.Shape();
    penNibShape.moveTo(0, 8); // Tip
    penNibShape.lineTo(3.8, 2);
    penNibShape.lineTo(2.8, -5);
    penNibShape.lineTo(-2.8, -5);
    penNibShape.lineTo(-3.8, 2);
    penNibShape.closePath();
    // Center circle hole inside nib
    const nibHole = new THREE.Path();
    nibHole.absarc(0, -1, 0.9, 0, Math.PI * 2, true);
    penNibShape.holes.push(nibHole);
    const penNibGeom = new THREE.ExtrudeGeometry(penNibShape, {
      depth: 1.5,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.3,
      bevelThickness: 0.3
    });
    penNibGeom.center(); // Center origin

    // 2. Extruded 3D Interactive Pointer Cursor Geometry (UX / Click Interaction)
    const cursorShape = new THREE.Shape();
    cursorShape.moveTo(-3, 6);
    cursorShape.lineTo(4, 1);
    cursorShape.lineTo(0.5, 0);
    cursorShape.lineTo(3.5, -5);
    cursorShape.lineTo(2, -5.5);
    cursorShape.lineTo(-1, -0.5);
    cursorShape.lineTo(-3.5, -2.5);
    cursorShape.closePath();
    const cursorGeom = new THREE.ExtrudeGeometry(cursorShape, {
      depth: 1.2,
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 0.25,
      bevelThickness: 0.25
    });
    cursorGeom.center(); // Center origin

    // 3. Extruded 3D Curly Brace Geometry '{' (JS/CSS code blocks)
    const braceShape = new THREE.Shape();
    // Outer edge curve
    braceShape.moveTo(3, 6);
    braceShape.quadraticCurveTo(1, 6, 1, 4.5);
    braceShape.lineTo(1, 1.5);
    braceShape.quadraticCurveTo(1, 0.5, -1, 0); // left-pointing middle tip
    braceShape.quadraticCurveTo(1, -0.5, 1, -1.5);
    braceShape.lineTo(1, -4.5);
    braceShape.quadraticCurveTo(1, -6, 3, -6);
    // Inner thickness path back to top
    braceShape.lineTo(2, -6);
    braceShape.quadraticCurveTo(0, -6, 0, -4.5);
    braceShape.lineTo(0, -1.5);
    braceShape.quadraticCurveTo(0, -0.5, -2, 0);
    braceShape.quadraticCurveTo(0, 0.5, 0, 1.5);
    braceShape.lineTo(0, 4.5);
    braceShape.quadraticCurveTo(0, 6, 2, 6);
    braceShape.closePath();
    const braceGeom = new THREE.ExtrudeGeometry(braceShape, {
      depth: 1.2,
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 0.25,
      bevelThickness: 0.25
    });
    braceGeom.center(); // Center origin

    // 4. Extruded 3D Double HTML Angle Brackets Geometry '< >' (Web Layout Markup)
    const leftBracket = new THREE.Shape();
    leftBracket.moveTo(-1, 5);
    leftBracket.lineTo(-5, 0);
    leftBracket.lineTo(-1, -5);
    leftBracket.lineTo(-2.2, -5);
    leftBracket.lineTo(-6, 0);
    leftBracket.lineTo(-2.2, 5);
    leftBracket.closePath();

    const rightBracket = new THREE.Shape();
    rightBracket.moveTo(1, 5);
    rightBracket.lineTo(5, 0);
    rightBracket.lineTo(1, -5);
    rightBracket.lineTo(2.2, -5);
    rightBracket.lineTo(6, 0);
    rightBracket.lineTo(2.2, 5);
    rightBracket.closePath();

    // Extrude both shapes in a single geometry
    const tagGeom = new THREE.ExtrudeGeometry([leftBracket, rightBracket], {
      depth: 1.0,
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 0.2,
      bevelThickness: 0.2
    });
    tagGeom.center(); // Center origin

    // 5. Extruded 3D Ampersand Selector Geometry '&' (SCSS Nesting & Logic)
    const ampShape = new THREE.Shape();
    ampShape.moveTo(3, -5);
    ampShape.lineTo(4, -4);
    ampShape.quadraticCurveTo(2, -1, 1, 0.5);
    ampShape.quadraticCurveTo(2.5, 2.5, 1.8, 4.5);
    ampShape.quadraticCurveTo(0, 5.5, -1, 3.5);
    ampShape.quadraticCurveTo(-1.8, 2, -0.5, 1);
    ampShape.quadraticCurveTo(-3, -0.5, -3, -2.5);
    ampShape.quadraticCurveTo(-3, -5.5, 0, -5.5);
    ampShape.quadraticCurveTo(2.5, -5.5, 3, -5);
    ampShape.closePath();
    const ampGeom = new THREE.ExtrudeGeometry(ampShape, {
      depth: 1.2,
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 0.2,
      bevelThickness: 0.2
    });
    ampGeom.center(); // Center origin

    // 6. Extruded 3D Tech Directional Arrow Geometry '→' (Transitions & Nav Flow)
    const arrowShape = new THREE.Shape();
    arrowShape.moveTo(-5, 1.5);
    arrowShape.lineTo(1, 1.5);
    arrowShape.lineTo(0, 4.5);
    arrowShape.lineTo(5, 0);
    arrowShape.lineTo(0, -4.5);
    arrowShape.lineTo(1, -1.5);
    arrowShape.lineTo(-5, -1.5);
    arrowShape.closePath();
    const arrowGeom = new THREE.ExtrudeGeometry(arrowShape, {
      depth: 1.2,
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 0.2,
      bevelThickness: 0.2
    });
    arrowGeom.center(); // Center origin

    const shapeGeometries = [
      penNibGeom,
      cursorGeom,
      braceGeom,
      tagGeom,
      ampGeom,
      arrowGeom
    ];

    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const shapeMaterial = new THREE.MeshBasicMaterial({
      color: 0x6d28d9,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });

    for (let i = 0; i < 8; i++) {
      const geom = shapeGeometries[i % shapeGeometries.length];
      const mesh = new THREE.Mesh(geom, shapeMaterial);
      
      mesh.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 240, // spread Y from -120 to 120
        (Math.random() - 0.5) * 40
      );
      
      shapesGroup.add(mesh);
      
      floatingShapes.push({
        mesh,
        rotSpeedX: 0.005 + Math.random() * 0.01,
        rotSpeedY: 0.005 + Math.random() * 0.01,
        rotSpeedZ: 0.005 + Math.random() * 0.01,
        velX: (Math.random() - 0.5) * 0.05,
        velY: (Math.random() - 0.5) * 0.05,
        velZ: (Math.random() - 0.5) * 0.03,
      });
    }

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
      
      particles.position.y = scrollY * 0.025;
      lineSegments.position.y = scrollY * 0.025;
      shapesGroup.position.y = scrollY * 0.025;

      floatingShapes.forEach((shape) => {
        shape.mesh.rotation.x += shape.rotSpeedX;
        shape.mesh.rotation.y += shape.rotSpeedY;
        shape.mesh.rotation.z += shape.rotSpeedZ;
        
        shape.mesh.position.x += shape.velX;
        shape.mesh.position.y += shape.velY;
        shape.mesh.position.z += shape.velZ;
        
        if (Math.abs(shape.mesh.position.x) > 50) shape.velX *= -1;
        if (Math.abs(shape.mesh.position.y) > 120) shape.velY *= -1;
        if (Math.abs(shape.mesh.position.z) > 30) shape.velZ *= -1;
      });

      const positionsArray = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        positionsArray[i3] += velocities[i3];
        positionsArray[i3 + 1] += velocities[i3 + 1];
        positionsArray[i3 + 2] += velocities[i3 + 2];
        
        if (Math.abs(positionsArray[i3]) > 55) velocities[i3] *= -1;
        if (Math.abs(positionsArray[i3 + 1]) > 175) velocities[i3 + 1] *= -1;
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

            // Interpolate line color between #6d28d9 (dark violet/lavender) and #f5f0fa (background)
            // so connection lines are darker, more defined, and fade out cleanly
            const r = 0.43 * alpha + 0.96 * (1.0 - alpha);
            const g = 0.16 * alpha + 0.94 * (1.0 - alpha);
            const b = 0.85 * alpha + 0.98 * (1.0 - alpha);
            
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
      shapeGeometries.forEach((g) => g.dispose());
      shapeMaterial.dispose();
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
