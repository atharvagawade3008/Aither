import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';

const StatCounter = ({ value, label, unit = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 20,
    duration: 2000
  });

  React.useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (latest) => 
    latest.toFixed(label === "0-60 MPH" ? 1 : 0)
  );

  return (
    <div ref={ref} className="flex flex-col items-center p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group cursor-default">
      <div className="text-5xl md:text-7xl font-display font-bold text-light mb-2 flex items-baseline group-hover:text-shadow-neon transition-all">
        <motion.span>{displayValue}</motion.span>
        <span className="text-2xl md:text-3xl text-neon opacity-70 ml-1">{unit}</span>
      </div>
      <div className="text-light/50 uppercase tracking-[0.3em] text-xs md:text-sm font-display">
        {label}
      </div>
    </div>
  );
};

const Stats = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="performance" ref={containerRef} className="py-32 bg-dark">
      <motion.div 
        style={{ scale, opacity }}
        className="container mx-auto px-6"
      >
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            PEAK <span className="text-neon">PERFORMANCE</span>
          </motion.h2>
          <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: "100px" }}
             className="h-[2px] bg-neon mx-auto mb-8"
          />
          <p className="max-w-xl mx-auto text-light/50 text-lg">
            Aither transcends conventional limits with a tri-motor configuration and advanced glass-carbon architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCounter value={1020} label="Horsepower" unit="HP" />
          <StatCounter value={1.9} label="0-60 MPH" unit="s" />
          <StatCounter value={250} label="Top Speed" unit="MPH" />
        </div>

        {/* Interactive Propulsion Matrix Simulation */}
        <div className="mt-32">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-display font-medium text-light uppercase tracking-[0.2em] mb-4">
              Propulsion Matrix
            </h3>
            <p className="text-light/40 max-w-lg mx-auto text-sm">
              Real-time torque vectoring across individual wheel motors. Hover to interact with the energy distribution grid.
            </p>
          </div>

          <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden glass border border-white/5 group cursor-crosshair">
            {/* Background Pulsing Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-96 h-96 bg-neon/10 rounded-full blur-[100px]"
              />
            </div>

            {/* Central Energy Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-neon/30 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-accent/40 rounded-full"
                />
                <div className="text-neon font-display font-black text-2xl tracking-widest">A-TRQ</div>
              </div>
            </div>

            {/* Matrix Nodes (4 Wheels) */}
            <div className="absolute inset-x-10 inset-y-16 md:inset-x-32 md:inset-y-24 grid grid-cols-2 grid-rows-2 gap-4">
              {['Front Left', 'Front Right', 'Rear Left', 'Rear Right'].map((label, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 255, 204, 0.05)" }}
                  className="relative border border-white/10 rounded-xl p-6 flex flex-col justify-between overflow-hidden group/node transition-colors duration-500"
                >
                  {/* Sweep effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-transparent opacity-0 group-hover/node:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="text-light/50 font-display text-xs uppercase tracking-widest relative z-10">{label}</div>
                  
                  <div className="flex items-end justify-between relative z-10">
                    <div className="text-3xl font-display font-bold text-light">
                      <motion.span
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
                      >
                        {Math.floor(Math.random() * 20 + 80)}
                      </motion.span>
                      <span className="text-sm text-neon ml-1">%</span>
                    </div>
                    
                    {/* Activity Bars */}
                    <div className="flex gap-1 h-8 items-end">
                      {[1, 2, 3, 4, 5].map((bar) => (
                        <motion.div 
                          key={bar}
                          animate={{ height: [`${Math.random() * 50 + 20}%`, `${Math.random() * 100}%`, `${Math.random() * 50 + 20}%`] }}
                          transition={{ duration: Math.random() * 1.5 + 0.5, repeat: Infinity }}
                          className="w-1.5 bg-neon/60 rounded-t-sm group-hover/node:bg-neon transition-colors"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Connecting Lines (Simulated with absolute divs for simplicity and performance) */}
            <div className="absolute top-1/2 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-neon/30 to-transparent -translate-y-1/2" />
            <div className="absolute left-1/2 top-1/4 bottom-1/4 w-[1px] bg-gradient-to-b from-transparent via-neon/30 to-transparent -translate-x-1/2" />

            {/* Scanning Laser Line */}
            <motion.div
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-neon opacity-20 shadow-[0_0_15px_#00FFCC]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
