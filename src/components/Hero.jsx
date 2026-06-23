import React, { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { View, Environment, ContactShadows, PerspectiveCamera, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import CarModel from './CarModel';

const AutoSpin = ({ children }) => {
  const groupRef = useRef();
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
  });
  return <group ref={groupRef}>{children}</group>;
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D View Container */}
      <div className="absolute inset-0 z-0">
        <View className="w-full h-full pointer-events-none">
          <PerspectiveCamera makeDefault position={[5, 2, 8]} fov={35} onUpdate={(c) => c.lookAt(0, 0, 0)} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          
          <Suspense fallback={null}>
            <AutoSpin>
              <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <CarModel />
              </Float>
            </AutoSpin>
            <Environment preset="city" />
            <ContactShadows 
              position={[0, -0.01, 0]} 
              opacity={0.75} 
              scale={10} 
              blur={2.5} 
              far={4} 
              frames={1}
              resolution={256}
            />
          </Suspense>

        </View>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-neon font-display tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Evolution of Motion
          </motion.span>
          <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight mb-6">
            AITHER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-light to-light/30">
              STRATOS
            </span>
          </h1>
          <p className="text-light/60 text-lg md:text-xl max-w-lg mb-10 font-sans leading-relaxed">
            The pinnacle of electric performance. Engineered for those who demand the future today. Experience the harmony of glassmorphism and raw kinetic energy.
          </p>
          
          <div className="flex gap-6 pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 204, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-neon text-dark font-display font-bold px-8 py-4 uppercase tracking-widest text-sm transition-all"
            >
              Configure Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, background: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 text-light font-display font-bold px-8 py-4 uppercase tracking-widest text-sm backdrop-blur-sm transition-all"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats Preview */}
      <div className="absolute bottom-10 left-0 right-0 z-10 pointer-events-none">
        <div className="container mx-auto px-6 flex justify-end gap-12 text-right">
          {[
            { label: "0-60 MPH", value: "1.9s" },
            { label: "Top Speed", value: "250mph+" },
            { label: "Range", value: "520mi" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + (i * 0.2) }}
            >
              <div className="text-neon font-display text-2xl font-bold">{stat.value}</div>
              <div className="text-light/40 text-xs uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon/50 to-transparent" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-light/30">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
