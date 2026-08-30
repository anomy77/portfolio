import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const baseUrl = import.meta.env.BASE_URL || '/';

const MODELS = [
  {
    id: 'microchip',
    name: 'SILICON IC',
    url: `${baseUrl}models/microchip.glb`,
    targetScale: 1.15,
    rotationSpeed: { x: 0.008, y: 0.015, z: 0.005 }
  },
  {
    id: 'gear',
    name: 'ENGINE GEAR',
    url: `${baseUrl}models/gear.glb`,
    targetScale: 1.05,
    rotationSpeed: { x: 0.02, y: 0.01, z: 0.015 }
  },
  {
    id: 'computer',
    name: 'WORKSTATION',
    url: `${baseUrl}models/computer.glb`,
    targetScale: 1.2,
    rotationSpeed: { x: 0.005, y: 0.012, z: 0.003 }
  },
  {
    id: 'rubikscube',
    name: 'ALGORITHM CUBE',
    url: `${baseUrl}models/rubikscube.glb`,
    targetScale: 1.0,
    rotationSpeed: { x: 0.012, y: 0.018, z: 0.01 }
  },
  {
    id: 'plant',
    name: 'SYSTEMS LAB',
    url: `${baseUrl}models/plant.glb`,
    targetScale: 1.1,
    rotationSpeed: { x: 0.003, y: 0.01, z: 0.002 }
  }
];

export function Orbiting3DScene({ mousePos = { x: 0, y: 0 } }) {
  const backCanvasRef = useRef(null);
  const frontCanvasRef = useRef(null);
  const mousePosRef = useRef(mousePos);

  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const backCanvas = backCanvasRef.current;
    const frontCanvas = frontCanvasRef.current;
    if (!backCanvas || !frontCanvas) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 11.5);

    // Renderers
    const backRenderer = new THREE.WebGLRenderer({ canvas: backCanvas, alpha: true, antialias: true });
    const frontRenderer = new THREE.WebGLRenderer({ canvas: frontCanvas, alpha: true, antialias: true });
    
    const updateSize = () => {
      const parent = backCanvas.parentElement;
      const width = parent?.clientWidth || window.innerWidth;
      const height = parent?.clientHeight || window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      backRenderer.setSize(width, height);
      backRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      frontRenderer.setSize(width, height);
      frontRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    updateSize();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.4);
    dirLight1.position.set(6, 9, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd4d4d8, 1.4);
    dirLight2.position.set(-6, -4, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.8, 25);
    pointLight.position.set(0, 1, 6);
    scene.add(pointLight);

    // Load Models
    const loader = new GLTFLoader();
    const objectGroups = [];

    MODELS.forEach((cfg, idx) => {
      loader.load(
        cfg.url,
        (gltf) => {
          const model = gltf.scene;

          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });

          // Normalize size
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const scaleFactor = cfg.targetScale / maxDim;

          model.position.sub(center); // center pivot

          const pivotGroup = new THREE.Group();
          pivotGroup.add(model);
          pivotGroup.scale.setScalar(scaleFactor);

          const orbitWrapper = new THREE.Group();
          orbitWrapper.add(pivotGroup);
          scene.add(orbitWrapper);

          objectGroups.push({
            group: orbitWrapper,
            pivot: pivotGroup,
            config: cfg,
            angleOffset: (idx * 2 * Math.PI) / MODELS.length
          });
        },
        undefined,
        (err) => console.error('Failed to load', cfg.url, err)
      );
    });

    // Orbit Parameters
    const orbitRadiusX = 5.0;
    const orbitRadiusY = 1.8;
    const orbitRadiusZ = 3.6;
    const tiltAngle = -0.36; // -20 degrees slant
    const speed = 0.00045;

    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;
      const baseAngle = elapsedTime * (speed * 1000);

      // Subtle mouse camera parallax
      const currentMouse = mousePosRef.current || { x: 0, y: 0 };
      const targetCamX = (currentMouse.x / (window.innerWidth || 1) - 0.5) * 0.9;
      const targetCamY = -(currentMouse.y / (window.innerHeight || 1) - 0.5) * 0.5;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      objectGroups.forEach((item) => {
        const theta = baseAngle + item.angleOffset;

        // Parametric slanted ellipse
        const rawX = orbitRadiusX * Math.cos(theta);
        const rawY = orbitRadiusY * Math.sin(theta);
        const rawZ = orbitRadiusZ * Math.sin(theta);

        // Slant transformation
        const cosT = Math.cos(tiltAngle);
        const sinT = Math.sin(tiltAngle);
        const x = rawX * cosT - rawY * sinT;
        const y = rawX * sinT + rawY * cosT;
        const z = rawZ;

        item.group.position.set(x, y, z);

        // Self-rotation
        item.pivot.rotation.x += item.config.rotationSpeed.x;
        item.pivot.rotation.y += item.config.rotationSpeed.y;
        item.pivot.rotation.z += item.config.rotationSpeed.z;

        // Dynamic depth scale
        const depthFactor = (z + orbitRadiusZ) / (2 * orbitRadiusZ);
        const scale = 0.75 + depthFactor * 0.55;
        item.group.scale.setScalar(scale);
      });

      // Pass 1: Render BACK Canvas (Objects with Z < 0)
      objectGroups.forEach((item) => {
        item.group.visible = item.group.position.z < 0;
      });
      backRenderer.render(scene, camera);

      // Pass 2: Render FRONT Canvas (Objects with Z >= 0)
      objectGroups.forEach((item) => {
        item.group.visible = item.group.position.z >= 0;
      });
      frontRenderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', updateSize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateSize);
      backRenderer.dispose();
      frontRenderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Back Orbit Layer (Z-8) -- Behind portrait cutout */}
      <canvas
        ref={backCanvasRef}
        className="absolute inset-0 z-8 pointer-events-none w-full h-full"
      />

      {/* Front Orbit Layer (Z-26) -- In front of portrait cutout */}
      <canvas
        ref={frontCanvasRef}
        className="absolute inset-0 z-26 pointer-events-none w-full h-full"
      />
    </>
  );
}
