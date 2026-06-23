import React, { Suspense, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { View, PerspectiveCamera, Environment, Float, useGLTF, Clone } from '@react-three/drei';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';
import CarModel from './CarModel';


// A safe component to animate numbers without causing React Render crashes
const AnimatedNumber = ({ scrollProgress, inputRange = [0, 1], outputRange }) => {
  const numRef = useRef(null);
  const value = useTransform(scrollProgress, inputRange, outputRange);

  useEffect(() => {
    const unsubscribe = value.on("change", (latest) => {
      if (numRef.current) numRef.current.textContent = latest.toFixed(0);
    });
    return () => unsubscribe();
  }, [value]);

  return <span ref={numRef}>0</span>;
};

// Optimized Car Component
const SpeedCar = ({ scrollProgress }) => {
  const carRef = useRef();
  const { scene } = useGLTF('/car.glb/scene.gltf');

  // Animation values stretch perfectly across the entire scroll
  const x = useTransform(scrollProgress, [0, 0.5, 1], [-35, 0, 35]);
  const rotateZ = useTransform(scrollProgress, [0, 0.5, 1], [-0.05, 0, 0.05]);
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [1, 1.2, 1.4]);

  useFrame((state) => {
    if (carRef.current) {
      carRef.current.position.x = x.get();
      
      // True side profile
      carRef.current.rotation.y = -Math.PI / 2;
      carRef.current.rotation.z = rotateZ.get();
      carRef.current.scale.setScalar(scale.get());
      
      // Tracking Camera
      state.camera.position.x = carRef.current.position.x * 0.4;
      
      // Active shake
      const dist = Math.abs(carRef.current.position.x);
      if (dist < 10) {
        state.camera.position.y = 2 + (Math.random() - 0.5) * 0.1;
      } else {
        state.camera.position.y = 2;
      }
    }
  });

  return (
    <group ref={carRef}>
      <Float speed={4} rotationIntensity={0.05} floatIntensity={0.1}>
        {/* Flipped 180 degrees to face the opposite direction */}
        <group rotation={[0, Math.PI / 2, 0]} scale={1.8}>
           {/* Changed to white to ensure it is highly visible against the dark background */}
           <CarModel color="#ffffff" />
        </group>
      </Float>
    </group>
  );
};

// 3D Speed Lines natively tracking scroll velocity
const SimpleSpeedLines = ({ scrollProgress }) => {
  const group = useRef();
  
  // Accelerate strongly from near-stop to hyper-speed
  const currentSpeed = useTransform(scrollProgress, [0, 0.6, 1], [0.05, 0.8, 3.5]);

  useFrame(() => {
    if (group.current) {
      const s = currentSpeed.get();
      group.current.children.forEach(line => {
        line.position.x += s;
        if (line.position.x > 30) line.position.x = -30;
      });
    }
  });

  return (
    <group ref={group}>
      {[...Array(20)].map((_, i) => (
        <mesh key={i} position={[Math.random() * 60 - 30, Math.random() * 8 + 0, Math.random() * 10 - 15]}>
          <boxGeometry args={[15, 0.015, 0.015]} />
          <meshBasicMaterial color="#00FFCC" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// Depth Grid
const GridBackground = () => (
  <gridHelper 
    args={[100, 20, '#00FFCC', '#111']} 
    position={[0, -2, 0]} 
    rotation={[0, 0, 0]} 
    opacity={0.1}
    transparent
  />
);

const VideoSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] 
  });
  
  // Decouple scroll speed from DOM distance! Smoothly eases to target!
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });

  const titleOpacity = useTransform(smoothProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.3, 0.5], [0, 0, -100]);

  const detailOpacity = useTransform(smoothProgress, [0.4, 0.8], [0, 1]);
  const detailX = useTransform(smoothProgress, [0.4, 0.8], [100, 0]);
  
  const lineScale = useTransform(smoothProgress, [0.7, 1.0], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[120vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* 3D Scene Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <View className="w-full h-full">
            <PerspectiveCamera makeDefault position={[0, 2, 22]} fov={28} />
            <color attach="background" args={['#050505']} />
            
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 20, 10]} intensity={2.5} color="#fff" angle={0.5} penumbra={1} castShadow />
            <spotLight position={[0, -10, 0]} intensity={2} color="#00FFCC" angle={0.4} penumbra={1} />
            <directionalLight position={[-20, 10, 5]} intensity={2} color="#00FFCC" />
            
            <Suspense fallback={null}>
              <SpeedCar scrollProgress={smoothProgress} />
              <SimpleSpeedLines scrollProgress={smoothProgress} />
              <GridBackground />
              <Environment preset="night" />
            </Suspense>
          </View>
          
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] mix-blend-screen bg-[length:100%_2px,3px_100%]" />
        </div>

        {/* Primary Typographic Layer */}
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="flex flex-col items-center">
             <div className="w-[3px] h-32 bg-neon mb-10 shadow-[0_0_20px_#00FFCC]" />
             <h2 className="text-8xl md:text-[14rem] font-display font-black text-white uppercase italic tracking-tighter leading-[0.75] strike-text">
              SONIC <br />
              <span className="text-transparent outline-text">VELOCITY</span>
            </h2>
          </div>
        </motion.div>

        {/* Right-Side Feature Content */}
        <div className="absolute inset-0 z-20 container mx-auto px-6 lg:px-12 h-screen flex items-center justify-end pointer-events-none">
          <motion.div
            style={{ opacity: detailOpacity, x: detailX }}
            className="max-w-xl text-right flex flex-col items-end pointer-events-auto"
          >
            <div className="bg-[#050505]/80 backdrop-blur-2xl border-r-4 border-neon p-10 lg:p-14 shadow-[0_0_60px_rgba(0,0,0,0.9)]">
              <span className="text-neon font-display tracking-[0.5em] uppercase text-[10px] mb-6 block font-bold">
                System // Propulsion Analytics
              </span>
              <h3 className="text-4xl lg:text-7xl font-display font-black text-white uppercase mb-8 leading-tight">
                THERMAL <br /> DYNAMICS
              </h3>
              <p className="text-light/80 text-base lg:text-lg leading-relaxed mb-10 font-light">
                Active cooling matrices engage as the Stratos breaches the 400km/h threshold. Every curve is optimized for total dominance and extreme downforce.
              </p>
              
              <div className="grid grid-cols-2 gap-8 w-full border-t border-white/10 pt-8">
                <div className="space-y-1 text-left">
                  <div className="text-neon font-display text-3xl font-bold italic shadow-neonSmall">0.19</div>
                  <div className="text-white/40 text-[9px] uppercase tracking-[0.3em]">Drag Coefficient</div>
                </div>
                <div className="space-y-1 text-right">
                  <div className="text-neon font-display text-3xl font-bold italic shadow-neonSmall">+1500KG</div>
                  <div className="text-white/40 text-[9px] uppercase tracking-[0.3em]">Peak Downforce</div>
                </div>
              </div>
              
              <motion.div 
                style={{ scaleX: lineScale, originX: 0 }}
                className="h-[2px] bg-neon mt-10 shadow-[0_0_15px_#00FFCC]"
              />
            </div>
          </motion.div>
        </div>

        {/* Dynamic HUD Tracking */}
        <div className="absolute bottom-12 left-6 lg:left-12 z-30 pointer-events-none hidden md:block">
          <div className="font-mono text-[10px] space-y-4">
            <div className="flex items-center gap-3 text-neon">
              <div className="w-2 h-2 bg-neon rounded-full animate-ping shadow-[0_0_10px_#00FFCC]" />
              <span className="uppercase tracking-[0.4em] font-bold">Velocity_Sync</span>
            </div>
            <div className="text-white/30 uppercase tracking-[0.3em] space-y-2 border-l border-neon/20 pl-4">
              <div>
                VELOCITY: <span className="text-shadow-neon text-white text-sm">
                  <AnimatedNumber scrollProgress={smoothProgress} inputRange={[0, 0.4, 1.0]} outputRange={[0, 120, 480]} />
                </span> KM/H
              </div>
              <div>THRUST: <span className="text-white">MAXIMUM</span></div>
              <div>STABILITY: <span className="text-white">OPTIMIZED</span></div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default VideoSection;
