import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

// Importing images
import aeroImg from '../assets/gallery/aerodynamics.png';
import interiorImg from '../assets/gallery/interior.png';
import detailsImg from '../assets/gallery/details.png';
import wheelImg from '../assets/gallery/wheel.png';

const Gallery = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  const cards = [
    { title: "Aerodynamics", desc: "Sculpted by wind, refined by physics for maximum efficiency.", img: aeroImg },
    { title: "Lounge Interior", desc: "A cocoon of glass and synthetic silk for ultimate comfort.", img: interiorImg },
    { title: "Kinetic Matrix", desc: "Active surface panels for peak downforce and agility.", img: detailsImg },
    { title: "Quantum Drive", desc: "Zero-latency torque vectoring for precise handling.", img: wheelImg },
  ];

  return (
    <section ref={targetRef} className="relative h-[150vh] bg-dark pt-32">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6 absolute top-24 left-0 right-0 z-20">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="max-w-2xl"
           >
             <h2 className="text-5xl md:text-7xl font-display font-medium uppercase tracking-tighter leading-none">
               ENGINEERED <br />
               <span className="text-neon text-6xl md:text-8xl">FOR EXCELLENCE</span>
             </h2>
             <div className="h-1 w-32 bg-neon mt-8" />
           </motion.div>
        </div>

        <motion.div style={{ x }} className="flex gap-12 pl-6 md:pl-24 pt-20">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative h-[450px] w-[350px] md:h-[650px] md:w-[550px] overflow-hidden rounded-[2.5rem] bg-black flex-shrink-0"
            >
              {/* Main Background Image */}
              <motion.img 
                src={card.img} 
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 ease-in-out group-hover:scale-110"
              />
              
              {/* Dynamic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
              <div className="absolute inset-0 border border-white/5 rounded-[2.5rem] pointer-events-none" />
              
              {/* Content Box */}
              <div className="absolute bottom-0 left-0 right-0 p-10 md:p-14 z-10">
                <motion.div 
                  initial={{ width: 40 }}
                  whileInView={{ width: 80 }}
                  className="h-1 bg-neon mb-8" 
                />
                <h3 className="text-4xl md:text-5xl font-display font-bold text-light mb-6 uppercase tracking-tight">
                  {card.title}
                </h3>
                <p className="text-light/60 text-base md:text-lg max-w-sm transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.23,1,0.32,1]">
                  {card.desc}
                </p>
                
                <motion.button
                  whileHover={{ x: 10 }}
                  className="mt-8 flex items-center gap-4 text-neon font-display font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-1000"
                >
                  Learn More <span className="text-xl">→</span>
                </motion.button>
              </div>

              {/* Decorative Number */}
              <div className="absolute top-10 right-10 text-[10rem] font-display font-black text-white/5 select-none pointer-events-none">
                 0{i + 1}
              </div>
            </motion.div>
          ))}
          
          {/* Final Call to Action Card */}
          <div className="h-[450px] w-[350px] md:h-[650px] md:w-[550px] flex flex-col items-center justify-center rounded-[2.5rem] glass-morphic flex-shrink-0 p-12 text-center border border-neon/20 bg-neon/5 backdrop-blur-3xl overflow-hidden relative">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon/10 via-transparent to-transparent opacity-50" />
             <h3 className="text-4xl md:text-6xl font-display font-bold mb-10 tracking-tighter relative z-10">THE FUTURE <br /> <span className="text-neon">IS YOURS</span></h3>
             <motion.button
               whileHover={{ scale: 1.05, boxShadow: "0px 0px 40px rgba(0, 255, 204, 0.4)" }}
               whileTap={{ scale: 0.95 }}
               className="bg-neon text-dark font-display font-black px-12 py-6 rounded-full uppercase tracking-[0.2em] text-sm relative z-10 transition-shadow duration-500"
             >
               Build Your Aither
             </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
