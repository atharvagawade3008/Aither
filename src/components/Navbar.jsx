import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Car } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Progressive scroll-based transformations for a "seamless" feel
  const navPadding = useTransform(scrollY, [0, 150], [24, 12]);
  const navBackground = useTransform(scrollY, [0, 150], [
    "rgba(10, 10, 10, 0)", 
    "rgba(10, 10, 10, 0.7)"
  ]);
  const navBlur = useTransform(scrollY, [0, 150], [0, 24]);
  const navBorder = useTransform(scrollY, [0, 150], [
    "rgba(255, 255, 255, 0)", 
    "rgba(0, 255, 204, 0.2)"
  ]);
  const navShadow = useTransform(scrollY, [0, 150], [
     "0px 0px 0px rgba(0,0,0,0)",
     "0px 10px 30px rgba(0,0,0,0.5)"
  ]);

  const navLinks = [
    { name: 'Models', href: '#models' },
    { name: 'Performance', href: '#performance' },
    { name: 'Innovation', href: '#innovation' },
    { name: 'Reserve', href: '#reserve' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Custom cubic bezier for "premium" feel
      style={{
        paddingTop: navPadding,
        paddingBottom: navPadding,
        backgroundColor: navBackground,
        backdropFilter: `blur(${navBlur}px)`,
        borderBottom: `1px solid ${navBorder}`,
        boxShadow: navShadow,
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-[backdrop-filter]"
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Premium Supersonic Logo */}
        <motion.div 
          className="flex items-center gap-5 cursor-pointer group"
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          {/* Custom SVG Logo: Minimalist "Stratos Wing" */}
          <div className="relative flex items-center justify-center w-12 h-12">
            <motion.svg 
              viewBox="0 0 100 100" 
              className="w-full h-full relative z-10 overflow-visible"
            >
              {/* Abstract Speed Wing - Aggressive & Minimalist */}
              <motion.path
                d="M10 50 L40 40 L90 50 L40 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white opacity-20"
              />
              <motion.path
                d="M15 50 L45 42 L85 50 L45 58 Z"
                fill="none"
                stroke="#00FFCC"
                strokeWidth="3"
                variants={{
                  rest: { pathLength: 1, pathOffset: 0, opacity: 0.5 },
                  hover: { pathLength: 1, pathOffset: 0, opacity: 1 }
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="drop-shadow-[0_0_10px_#00FFCC]"
              />
              {/* Supersonic "Mach" Waves - Only visible on hover */}
              <motion.path
                d="M30 30 Q 50 50 30 70"
                fill="none"
                stroke="#00FFCC"
                strokeWidth="1"
                variants={{
                  rest: { opacity: 0, x: -10 },
                  hover: { opacity: 0.5, x: 0 }
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.path
                d="M20 20 Q 50 50 20 80"
                fill="none"
                stroke="#00FFCC"
                strokeWidth="1"
                variants={{
                  rest: { opacity: 0, x: -20 },
                  hover: { opacity: 0.3, x: 0 }
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.svg>
            
            {/* Ambient Glow */}
            <motion.div
              variants={{
                rest: { opacity: 0.1, scale: 0.8 },
                hover: { opacity: 0.4, scale: 1.5 }
              }}
              className="absolute inset-0 bg-neon blur-2xl rounded-full pointer-events-none"
            />
          </div>
          
          {/* Refined Brand Identity Layer */}
          <div className="flex flex-col">
            <motion.div 
              className="flex font-display font-black text-3xl tracking-[0.4em] uppercase text-white relative"
              variants={{
                rest: { letterSpacing: "0.4em" },
                hover: { letterSpacing: "0.5em" }
              }}
              transition={{ duration: 0.5, ease: "circOut" }}
            >
              {/* Main Brand Name - Always Visible */}
              <span>AITHER</span>
              
              {/* Shimmer Effect Sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 z-20"
                variants={{
                  rest: { x: "-150%", opacity: 0, transition: { duration: 0.5 } },
                  hover: { 
                    x: "150%", 
                    opacity: 1,
                    transition: { duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }
                  }
                }}
              />
            </motion.div>
            
            {/* Sub-tagline for "Supersonic" feel */}
            <motion.span 
              className="text-[8px] tracking-[0.8em] text-neon/40 uppercase font-black -mt-1 block"
              variants={{
                rest: { opacity: 0.2, x: 0 },
                hover: { opacity: 1, x: 5 }
              }}
            >
              Supersonic Division
            </motion.span>
          </div>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.5, duration: 0.8 }}
              className="text-[11px] uppercase tracking-[0.25em] font-medium text-light/60 hover:text-neon transition-all duration-500 relative group/link"
            >
              <span className="relative z-10">{link.name}</span>
              <motion.span 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-neon rounded-full group-hover/link:w-full transition-all duration-500 ease-in-out"
              />
              <motion.span 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-neon/40 blur-sm rounded-full group-hover/link:w-2/3 transition-all duration-500 ease-in-out"
              />
            </motion.a>
          ))}
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="ml-4 px-6 py-2 border border-white/10 hover:border-neon/50 text-[10px] uppercase tracking-[0.2em] font-bold text-light overflow-hidden relative group/btn"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-neon translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-in-out" />
            <span className="absolute inset-0 z-20 flex items-center justify-center translate-y-full group-hover/btn:translate-y-0 text-dark transition-transform duration-500 ease-in-out">Get Started</span>
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-light relative z-50 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 bg-dark z-40 flex flex-col items-center justify-center gap-10"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon/20 blur-[120px] rounded-full" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[120px] rounded-full" />
            </div>
            
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-4xl font-display font-bold uppercase tracking-[0.1em] text-light/80 hover:text-neon transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
