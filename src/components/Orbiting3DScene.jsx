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

export function Orbiting3DScene() {
  const backCanvasRef = useRef(null);
  const frontCanvasRef = useRef(null);

  useEffect(() => {
    const backCanvas = backCanvasRef.current;
    const frontCanvas = frontCanvasRef.current;
    if (!backCanvas || !frontCanvas) return;

    // Shared Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.2, 11.5);
    camera.lookAt(0, 1.2, 0);

    // Setup Renderers
    const setupRenderer = (canvas) => {
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.localClippingEnabled = true; // Crucial for slicing!
      return renderer;
    };

    const backRenderer = setupRenderer(backCanvas);
    const frontRenderer = setupRenderer(frontCanvas);

    // Setup Scenes
    const backScene = new THREE.Scene();
    const frontScene = new THREE.Scene();

    // Lighting
    const addLights = (scene) => {
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
      scene.add(ambientLight);
      const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);
      const fillLight = new THREE.DirectionalLight(0xaaccff, 1.5);
      fillLight.position.set(-5, 0, -5);
      scene.add(fillLight);
    };
    addLights(backScene);
    addLights(frontScene);

    // Clipping Planes (The Magic Sauce)
    // Front plane slices away Z < 0. Back plane slices away Z > 0.
    const frontClipPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const backClipPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);

    const loader = new GLTFLoader();
    const objectGroups = [];

    // Helper to clone GLTF hierarchy for dual scenes and apply monochromatic grayscale
    const cloneGltf = (gltf, clipPlane) => {
      const clone = gltf.scene.clone(true);
      clone.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material = child.material.clone();
            // Apply clipping plane to slice the mesh precisely at Z=0
            child.material.clippingPlanes = [clipPlane];
            child.material.clipShadows = true;

            // Convert to crisp brutalist grayscale / monochrome (100% colorless)
            child.material.onBeforeCompile = (shader) => {
              shader.fragmentShader = shader.fragmentShader.replace(
                '#include <dithering_fragment>',
                `
                #include <dithering_fragment>
                float gray = dot(gl_FragColor.rgb, vec3(0.299, 0.587, 0.114));
                gl_FragColor.rgb = vec3(gray);
                `
              );
            };
            child.material.customProgramCacheKey = () => 'grayscale_clipping';
            child.material.needsUpdate = true;
          }
        }
      });
      return clone;
    };

    MODELS.forEach((cfg, idx) => {
      loader.load(
        cfg.url,
        (gltf) => {
          // Normalize size based on the original
          const box = new THREE.Box3().setFromObject(gltf.scene);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const scaleFactor = cfg.targetScale / maxDim;

          // Back Scene Object
          const backModel = cloneGltf(gltf, backClipPlane);
          backModel.position.sub(center);
          const backPivot = new THREE.Group();
          backPivot.add(backModel);
          backPivot.scale.setScalar(scaleFactor);
          const backWrapper = new THREE.Group();
          backWrapper.add(backPivot);
          backScene.add(backWrapper);

          // Front Scene Object
          const frontModel = cloneGltf(gltf, frontClipPlane);
          frontModel.position.sub(center);
          const frontPivot = new THREE.Group();
          frontPivot.add(frontModel);
          frontPivot.scale.setScalar(scaleFactor);
          const frontWrapper = new THREE.Group();
          frontWrapper.add(frontPivot);
          frontScene.add(frontWrapper);

          objectGroups.push({
            backWrapper,
            frontWrapper,
            backPivot,
            frontPivot,
            config: cfg,
            angleOffset: (idx * 2 * Math.PI) / MODELS.length
          });
        },
        undefined,
        (err) => console.error('Failed to load', cfg.url, err)
      );
    });

    const updateSize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      backRenderer.setSize(window.innerWidth, window.innerHeight);
      frontRenderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Elevated Halo Orbit Parameters
    const orbitCenterX = 0.0;
    const orbitCenterY = 3.6;  // Elevated higher above crown
    const orbitRadiusX = 4.2;  
    const orbitRadiusZ = 3.2;  
    const pitchAngle = 0.30;   
    const rollAngle = -0.06;   
    const speed = 0.00048;

    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;
      const baseAngle = elapsedTime * (speed * 1000);

      objectGroups.forEach((item) => {
        const theta = baseAngle + item.angleOffset;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        const ringX = orbitRadiusX * cosT;
        const ringZ = orbitRadiusZ * sinT;

        const pitchedY = -ringZ * Math.sin(pitchAngle);
        const pitchedZ = ringZ * Math.cos(pitchAngle);

        const x = ringX * Math.cos(rollAngle) - pitchedY * Math.sin(rollAngle) + orbitCenterX;
        const y = ringX * Math.sin(rollAngle) + pitchedY * Math.cos(rollAngle) + orbitCenterY;
        const z = pitchedZ;

        // Sync positions for both front and back halves
        item.backWrapper.position.set(x, y, z);
        item.frontWrapper.position.set(x, y, z);

        item.backPivot.rotation.x += item.config.rotationSpeed.x;
        item.backPivot.rotation.y += item.config.rotationSpeed.y;
        item.backPivot.rotation.z += item.config.rotationSpeed.z;

        item.frontPivot.rotation.copy(item.backPivot.rotation);

        const depthFactor = (z + orbitRadiusZ) / (2 * orbitRadiusZ);
        const scale = 0.85 + depthFactor * 0.25;
        item.backWrapper.scale.setScalar(scale);
        item.frontWrapper.scale.setScalar(scale);
      });

      backRenderer.render(backScene, camera);
      frontRenderer.render(frontScene, camera);
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
      <canvas
        ref={backCanvasRef}
        className="absolute inset-0 z-8 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />
      <canvas
        ref={frontCanvasRef}
        className="absolute inset-0 z-26 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />
    </>
  );
}
