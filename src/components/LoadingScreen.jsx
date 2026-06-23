import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const { progress } = useProgress();
  const [loading, setLoading] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Force a purely cinematic load sequence that takes its time, ignoring instant cache
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1.5; 
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setDisplayProgress(current);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Enforce a minimum display time to feel "smooth" and intentional
  useEffect(() => {
    if (displayProgress >= 99) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2500); // Display for 2.5s once it reaches 100%
      return () => clearTimeout(timer);
    }
  }, [displayProgress]);
  
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center p-6 text-center"
        >
          {/* Futuristic Loading Ring */}
          <div className="relative w-48 h-48 flex items-center justify-center mb-8">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 border-t-2 border-r-2 border-neon/50 rounded-full"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
              className="absolute inset-4 border-b-2 border-l-2 border-white/20 rounded-full"
            />
            
            {/* Supersonic Wing Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <svg viewBox="0 0 100 100" className="w-16 h-16 blur-sm">
                <path d="M15 50 L45 42 L85 50 L45 58 Z" fill="none" stroke="#00FFCC" strokeWidth="2" />
              </svg>
            </div>
            
            <div className="text-neon font-display font-black text-4xl italic relative z-10 w-full text-center drop-shadow-[0_0_10px_#00FFCC]">
              {Math.min(Math.floor(displayProgress), 100)}%
            </div>
          </div>
          
          <div className="text-white/60 font-display tracking-[0.5em] uppercase text-sm">
            Initializing System
          </div>
          <div className="text-neon/80 font-mono tracking-[0.2em] text-[10px] mt-4 uppercase">
            Loading Cinematic Assets // Stratos Engine
          </div>
          
          {/* Progress Bar */}
          <div className="w-64 h-1 bg-white/10 mt-8 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-neon shadow-[0_0_10px_#00FFCC]"
              initial={{ width: 0 }}
              animate={{ width: `${displayProgress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
