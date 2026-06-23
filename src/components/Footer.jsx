import React from 'react';
import { motion } from 'framer-motion';
import { Car, Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Info */}
          <div className="col-span-1 lg:col-span-1">
             <div className="flex items-center gap-3 mb-8">
                {/* Supersonic Wing Logo */}
                <svg viewBox="0 0 100 100" className="w-8 h-8 drop-shadow-[0_0_10px_#00FFCC]">
                  <path d="M15 50 L45 42 L85 50 L45 58 Z" fill="none" stroke="#00FFCC" strokeWidth="4" />
                  <path d="M30 30 Q 50 50 30 70" fill="none" stroke="#00FFCC" strokeWidth="2" className="opacity-50" />
                </svg>
                <span className="font-display font-bold text-2xl tracking-[0.3em] uppercase text-light">Aither</span>
             </div>
             <p className="text-light/40 leading-relaxed mb-8 max-w-xs">
                Crafting the future of mobility through revolutionary design and silicon-carbon engineering. Carbon neutral since 2024.
             </p>
             <div className="flex gap-4">
                {[Instagram, Twitter, Youtube].map((Icon, i) => (
                  <motion.a 
                    key={i}
                    href="#" 
                    whileHover={{ y: -5, color: "#00FFCC" }}
                    className="p-3 glass rounded-full text-light/60 transition-colors"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
             </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-light font-display font-bold uppercase tracking-widest mb-8 text-sm">Experience</h4>
            <ul className="space-y-4">
              {['Inventory', 'Test Drive', 'Showrooms', 'Charging'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-light/40 hover:text-neon transition-colors flex items-center group">
                    {link} <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-light font-display font-bold uppercase tracking-widest mb-8 text-sm">Ownership</h4>
            <ul className="space-y-4">
              {['Sustainability', 'Energy', 'Software Updates', 'Support'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-light/40 hover:text-neon transition-colors flex items-center group">
                    {link} <ArrowUpRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-light font-display font-bold uppercase tracking-widest mb-8 text-sm">Newsletter</h4>
            <p className="text-light/40 text-sm mb-6">Receive exclusive updates on Aither production and tech.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-xs tracking-widest text-light focus:outline-none focus:border-neon transition-colors"
              />
              <button className="absolute right-2 top-2 bg-white/5 hover:bg-neon hover:text-dark p-2 rounded-lg transition-all">
                <ArrowUpRight size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 text-[10px] uppercase tracking-[0.3em] text-light/20">
           <p>© 2026 Aither Motion Corp. All rights reserved.</p>
           <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-light transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-light transition-colors">Legal</a>
              <a href="#" className="hover:text-light transition-colors">Cookies</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
