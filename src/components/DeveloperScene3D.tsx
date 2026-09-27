import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function DeveloperScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090b10, 0.05);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // limit pixel ratio for performance
    container.appendChild(renderer.domElement);

    // Neural Network / Code Mesh Nodes
    const particleCount = 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      speeds.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle texture / dots
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.45,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Connecting Lines Material
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });

    // Outer geometric polyhedra representing architectural modules
    const polyGeo = new THREE.IcosahedronGeometry(4.5, 1);
    const polyMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const polyMesh = new THREE.Mesh(polyGeo, polyMat);
    polyMesh.position.set(12, -2, -5);
    scene.add(polyMesh);

    const coreGeo = new THREE.OctahedronGeometry(2.5, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(-11, 4, -4);
    scene.add(coreMesh);

    // Dynamic lines buffer
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width - 0.5) * 2;
      mouseY = -((event.clientY - rect.top) / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera dampening
      targetX += (mouseX * 3 - targetX) * 0.05;
      targetY += (mouseY * 2 - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Rotate geometric wireframes
      polyMesh.rotation.x += 0.003;
      polyMesh.rotation.y += 0.004;

      coreMesh.rotation.x -= 0.004;
      coreMesh.rotation.y -= 0.003;

      // Update particle positions
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      let lineIndex = 0;
      const linePosArray = lineGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += speeds[i].x;
        posArray[i * 3 + 1] += speeds[i].y;
        posArray[i * 3 + 2] += speeds[i].z;

        // Bounce within boundaries
        if (Math.abs(posArray[i * 3]) > 18) speeds[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 13) speeds[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 12) speeds[i].z *= -1;

        // Connect nearby particles
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 36) {
            linePosArray[lineIndex++] = posArray[i * 3];
            linePosArray[lineIndex++] = posArray[i * 3 + 1];
            linePosArray[lineIndex++] = posArray[i * 3 + 2];

            linePosArray[lineIndex++] = posArray[j * 3];
            linePosArray[lineIndex++] = posArray[j * 3 + 1];
            linePosArray[lineIndex++] = posArray[j * 3 + 2];
          }
        }
      }

      posAttr.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      polyGeo.dispose();
      polyMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
