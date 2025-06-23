import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Camera } from "@mediapipe/camera_utils";
import { Pose } from "@mediapipe/pose";
import { useLocation, useParams } from "react-router-dom";
import { base } from "../axios";
// import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";


const DressTryOn = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const dressModelRef = useRef(null);
  const location = useLocation()
  
  const { modelPath } = location.state;

  // params model 
  console.log(modelPath);
  


  useEffect(() => {
    const scene = new THREE.Scene();
    const threeCamera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
    threeCamera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(640, 480);

    // ✅ Add lighting to fix black model issue
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(2, 2, 5);
    scene.add(directionalLight);

    // ✅ Load Dress Model
    const loader = new GLTFLoader();
    // ✅ Load Dress Model with Original Materials
    loader.load(base+ modelPath, (gltf) => {
    dressModelRef.current = gltf.scene;
  
    dressModelRef.current.traverse((child) => {
      if (child.isMesh) {
        // ✅ Use original material instead of forcing red color
        child.material = child.material || new THREE.MeshStandardMaterial();
      }
    });
  
    dressModelRef.current.scale.set(1, 1, 1);
    scene.add(dressModelRef.current);
  });
  

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, threeCamera);
    };
    animate();

    // ✅ Setup webcam feed
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };
    startVideo();

    const loadPoseModel = async () => {
      const pose = new Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults((results) => {
        if (results.poseLandmarks) {
          updateDressPosition(results.poseLandmarks);
        }
      });

      if (videoRef.current) {
        const camera = new Camera(videoRef.current, {
          onFrame: async () => {
            await pose.send({ image: videoRef.current });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    };

    // ✅ Convert 2D landmarks to Three.js world coordinates
    const updateDressPosition = (landmarks) => {
        if (!dressModelRef.current) return;
      
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        const waist = landmarks[24];
      
        const convertTo3D = (point) => ({
          x: (point.x - 0.5) * 3, // Scale for Three.js
          y: (0.5 - point.y) * 3,
          z: -1.5, // Bring dress forward
        });
      
        const left3D = convertTo3D(leftShoulder);
        const right3D = convertTo3D(rightShoulder);
        const waist3D = convertTo3D(waist);
      
        // ✅ Set Position: Center on body
        dressModelRef.current.position.set(
          (left3D.x + right3D.x) / 2, // X: Middle of shoulders
          waist3D.y - 0.1, // Y: Adjust height slightly
          -1.5 // Z: Keep dress in front
        );
      
        // ✅ Set Scaling: Fit dress width to shoulders
        const shoulderWidth = Math.abs(left3D.x - right3D.x);
        dressModelRef.current.scale.set(shoulderWidth * 3, shoulderWidth * 3.8, 1);
      };
      
      

    loadPoseModel();
  }, []);

  return (
    <>
      <h1>Virtual Dress Try-On</h1>
    <div style={{ position: "relative", width: "680px", height: "500px" }}>
      <video ref={videoRef} autoPlay playsInline style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }} />
      <canvas ref={canvasRef} style={{
          position: "absolute",
          top: 100,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
        }} />
    </div>
        </>
  );
};

export default DressTryOn;
