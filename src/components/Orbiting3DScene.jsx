import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import heroCutout from '/hero-cutout.png?url';

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
  const canvasRef = useRef(null);
  const mousePosRef = useRef(mousePos);

  useEffect(() => {
    mousePosRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.2, 11.5);

    // High-Performance Unified Renderer with Depth Buffer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, depth: true });
    
    // Invisible GPU Depth Occluder Mesh (writes exact head silhouette to depth buffer)
    let occluderMesh = null;
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(heroCutout, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      const occluderMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.2, // Discard transparent pixels; write opaque head pixels to Z-buffer
        depthWrite: true,
        colorWrite: false, // Invisible to eye, visible to depth test!
        side: THREE.DoubleSide
      });
      occluderMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), occluderMat);
      occluderMesh.renderOrder = -1; // Write to depth buffer before 3D models render
      scene.add(occluderMesh);
      updateSize();
    });

    const updateSize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || window.innerWidth;
      const height = parent?.clientHeight || window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (occluderMesh) {
        const fovRad = (camera.fov * Math.PI) / 180;
        const visibleHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
        const visibleWidth = visibleHeight * camera.aspect;
        const imgAspect = 16 / 9;
        const screenAspect = camera.aspect;

        let planeW, planeH, planeY;
        if (screenAspect > imgAspect) {
          planeW = visibleWidth;
          planeH = visibleWidth / imgAspect;
          planeY = camera.position.y + (visibleHeight - planeH) * (0.5 - 0.15);
        } else {
          planeH = visibleHeight;
          planeW = visibleHeight * imgAspect;
          planeY = camera.position.y;
        }

        occluderMesh.geometry.dispose();
        occluderMesh.geometry = new THREE.PlaneGeometry(planeW, planeH);
        occluderMesh.position.set(0, planeY, 0);
      }
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
    pointLight.position.set(0, 3.5, 6);
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

    // Elevated Halo Orbit Parameters (Floating around head crown like an angel ring)
    const orbitCenterX = 0.0;
    const orbitCenterY = 2.1;  // Head crown height
    const orbitRadiusX = 3.6;  // Wider halo circumference
    const orbitRadiusZ = 2.8;  // Halo depth
    const pitchAngle = 0.32;   // Tilted forward so front dips over brow, back loops behind crown
    const rollAngle = -0.08;   // Subtle angle
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
      const targetCamY = -(currentMouse.y / (window.innerHeight || 1) - 0.5) * 0.3 + 1.2;
      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.lookAt(0, 1.2, 0);

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

      // Seamless single-pass 3D rendering (Zero Glitch / Zero Mesh Popping)
      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', updateSize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateSize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-22 pointer-events-none w-full h-full"
    />
  );
}
