import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const baseUrl = import.meta.env.BASE_URL || '/';

const MODELS = [
  {
    id: 'microchip',
    name: 'SILICON IC',
    url: `${baseUrl}models/microchip.glb`,
    targetScale: 0.48,
    rotationSpeed: { x: 0.008, y: 0.015, z: 0.005 }
  },
  {
    id: 'gear',
    name: 'ENGINE GEAR',
    url: `${baseUrl}models/gear.glb`,
    targetScale: 0.45,
    rotationSpeed: { x: 0.02, y: 0.01, z: 0.015 }
  },
  {
    id: 'computer',
    name: 'WORKSTATION',
    url: `${baseUrl}models/computer.glb`,
    targetScale: 0.52,
    rotationSpeed: { x: 0.005, y: 0.012, z: 0.003 }
  },
  {
    id: 'rubikscube',
    name: 'ALGORITHM CUBE',
    url: `${baseUrl}models/rubikscube.glb`,
    targetScale: 0.42,
    rotationSpeed: { x: 0.012, y: 0.018, z: 0.01 }
  },
  {
    id: 'plant',
    name: 'SYSTEMS LAB',
    url: `${baseUrl}models/plant.glb`,
    targetScale: 0.46,
    rotationSpeed: { x: 0.003, y: 0.01, z: 0.002 }
  },
  {
    id: 'sunglasses',
    name: 'PIXEL SHADES',
    url: `${baseUrl}models/sunglasses.glb`,
    targetScale: 0.46,
    rotationSpeed: { x: 0.01, y: 0.015, z: 0.008 }
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(6, 9, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd4d4d8, 1.5);
    dirLight2.position.set(-6, -4, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2.0, 25);
    pointLight.position.set(0, 3.0, 6);
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

    // Elevated Halo Orbit Parameters (Compact angel ring floating above head)
    const orbitCenterX = 0.0;
    const orbitCenterY = 2.45; // Elevated above head/crown
    const orbitRadiusX = 2.8;  // Compact halo width
    const orbitRadiusZ = 2.2;  // Compact halo depth
    const pitchAngle = 0.36;   // Tilted forward gracefully
    const rollAngle = -0.10;   // Subtle angle
    const speed = 0.00048;

    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;
      const baseAngle = elapsedTime * (speed * 1000);

      // Subtle mouse camera parallax
      const currentMouse = mousePosRef.current || { x: 0, y: 0 };
      const targetCamX = (currentMouse.x / (window.innerWidth || 1) - 0.5) * 0.6;
      const targetCamY = -(currentMouse.y / (window.innerHeight || 1) - 0.5) * 0.3;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 1.8, 0);

      objectGroups.forEach((item) => {
        const theta = baseAngle + item.angleOffset;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        // Circular ring in XZ plane
        const ringX = orbitRadiusX * cosT;
        const ringZ = orbitRadiusZ * sinT;

        // Forward pitch transformation (rotates around X axis)
        const pitchedY = -ringZ * Math.sin(pitchAngle);
        const pitchedZ = ringZ * Math.cos(pitchAngle);

        // Roll transformation (rotates around Z axis)
        const x = ringX * Math.cos(rollAngle) - pitchedY * Math.sin(rollAngle) + orbitCenterX;
        const y = ringX * Math.sin(rollAngle) + pitchedY * Math.cos(rollAngle) + orbitCenterY;
        const z = pitchedZ;

        item.group.position.set(x, y, z);

        // Self-rotation
        item.pivot.rotation.x += item.config.rotationSpeed.x;
        item.pivot.rotation.y += item.config.rotationSpeed.y;
        item.pivot.rotation.z += item.config.rotationSpeed.z;

        // Dynamic depth scale (subtle, keeps objects neat and compact)
        const depthFactor = (z + orbitRadiusZ) / (2 * orbitRadiusZ);
        const scale = 0.85 + depthFactor * 0.25;
        item.group.scale.setScalar(scale);
      });

      // Pass 1: Render BACK Canvas (Objects with Z < 0, behind head crown)
      objectGroups.forEach((item) => {
        item.group.visible = item.group.position.z < 0;
      });
      backRenderer.render(scene, camera);

      // Pass 2: Render FRONT Canvas (Objects with Z >= 0, in front of hair/forehead)
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
