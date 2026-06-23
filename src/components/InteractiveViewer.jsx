import React, { useState, Suspense, useRef } from 'react';
import { View, OrbitControls, Environment, ContactShadows, PresentationControls, Float, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import CarModel from './CarModel';

const InteractiveViewer = () => {
  const [activeColor, setActiveColor] = useState("#E50000");
  const trackRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => setMounted(true), []);

  const colors = [
    { name: 'Stratos Red', hex: '#E50000' },
    { name: 'Neon Cyan', hex: '#00FFCC' },
    { name: 'Obsidian Black', hex: '#1A1A1A' },
    { name: 'Pure White', hex: '#FFFFFF' },
    { name: 'Electric Gold', hex: '#FFD700' },
  ];

  return (
    <section id="models" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* 3D Viewer Container */}
          <div ref={trackRef} className="w-full lg:w-2/3 h-[400px] md:h-[600px] border border-white/5 rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing relative z-20" style={{ touchAction: 'none' }}>
            {mounted && (
              <View track={trackRef} className="w-full h-full absolute inset-0">
                <PerspectiveCamera makeDefault position={[6, 2, 6]} fov={35} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
                <Suspense fallback={null}>
                  <group position={[0, -0.5, 0]}>
                    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
                      <CarModel color={activeColor} />
                    </Float>
                    <ContactShadows position={[0, -0.01, 0]} opacity={0.6} scale={10} blur={2} far={4} frames={1} resolution={256} />
                  </group>
                  <Environment preset="night" />
                </Suspense>
                <OrbitControls domElement={trackRef.current} enableZoom={false} enablePan={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/2.1} />
              </View>
            )}
          </div>

          {/* Controls Side */}
          <div className="w-full lg:w-1/3 text-left">
            <motion.h3 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-5xl font-display font-bold mb-4 uppercase tracking-tighter"
            >
              Tailor Your <br />
              <span className="text-neon">AITHER</span>
            </motion.h3>
            <p className="text-light/50 mb-10 text-lg leading-relaxed">
              Every curve, every material, every nanometer was designed with precision. Choose from our curated palette of futuristic finishes.
            </p>

            <div className="space-y-8">
               <div>
                  <span className="text-xs uppercase tracking-[0.3em] font-display text-light/40 mb-4 block">Select Finish</span>
                  <div className="flex flex-wrap gap-4">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setActiveColor(color.hex)}
                        className={`w-12 h-12 rounded-full border-2 transition-all p-1 ${activeColor === color.hex ? 'border-neon scale-125' : 'border-transparent'}`}
                        title={color.name}
                      >
                        <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }} />
                      </button>
                    ))}
                  </div>
               </div>

               <AnimatePresence mode="wait">
                  <motion.div
                    key={activeColor}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-6 glass rounded-2xl border-l-4 border-l-neon"
                  >
                    <div className="text-xs text-neon uppercase tracking-widest mb-1">Colorway Selected</div>
                    <div className="text-xl font-display font-bold text-light uppercase tracking-widest">
                      {colors.find(c => c.hex === activeColor).name}
                    </div>
                  </motion.div>
               </AnimatePresence>

               <motion.button
                 whileHover={{ scale: 1.05 }}
                 className="w-full border border-white/10 hover:border-neon hover:text-neon text-light/80 p-5 rounded-2xl bg-white/5 transition-all uppercase tracking-[0.2em] text-sm font-display font-bold"
               >
                 Reserve This Build
               </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveViewer;
