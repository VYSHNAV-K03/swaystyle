import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { useLocation } from "react-router-dom";
import { base } from "../axios";

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  // Smooth auto-rotation effect
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002; // Slower rotation for a premium feel
    }
  });

  return <primitive object={scene} ref={modelRef} scale={1.8} position={[0, -1, 0]} />;
};

const ModelViewer = () => {
  const location = useLocation();
  const { modelPath } = location.state 
  const controlsRef = useRef();

  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  console.log(location.state);
  

  return (
    <div style={styles.viewerContainer}>
      <div style={styles.viewerBox}>
        <Canvas
          camera={{ position: [0, 1.5, 4] }} // Better viewing angle
          shadows
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <Suspense fallback={null}>
            <Model modelPath={modelPath? (base + modelPath): "/models/glasses_model.glb"} />
            <ContactShadows position={[0, -1.2, 0]} opacity={0.5} blur={2.5} far={1.2} />
          </Suspense>
          <OrbitControls ref={controlsRef} enableZoom={true} />
          <Environment preset="warehouse" />
        </Canvas>
      </div>

     
    </div>
  );
};

// Styling - Dark Elegant Theme
const styles = {
  viewerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "600px",
    width: "700px",
    borderRadius: "10px",
    justifyContent: "center",
    background: "linear-gradient(to right, #0f0f0f, #1a1a1a)", // Darker UI
  },
  viewerBox: {
    width: "600px",
    height:"500px",
    // height: "75vh",
    background: "rgba(255, 255, 255, 0.1)", // Glass effect
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    position: "relative",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  buttonContainer: {
    display: "flex",
    gap: "15px",
    marginTop: "25px",
  },
  button: {
    padding: "12px 18px",
    fontSize: "17px",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0px 3px 10px rgba(255, 75, 43, 0.3)",
  },
};

export default ModelViewer;
