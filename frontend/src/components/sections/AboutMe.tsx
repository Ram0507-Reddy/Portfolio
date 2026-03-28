"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export const AboutMe = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-slate-900">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter mb-4">About</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-slate-200" />
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">Background & Narrative</p>
            <span className="h-px w-8 bg-slate-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Column: Refined Artistic Photo Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative w-[300px] h-[340px] md:w-[350px] md:h-[400px]">
              {/* Premium Colorful Overlapping Blocks */}
              <motion.div 
                animate={{ rotate: [-6, -4, -6], y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-15%] w-[125%] h-[125%] bg-cyan-100/40 rounded-[3rem] backdrop-blur-[2px] border border-white/50" 
              />
              <motion.div 
                animate={{ rotate: [4, 6, 4], y: [0, 8, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[-5%] left-[-10%] w-[120%] h-[120%] bg-purple-100/30 rounded-[4rem] backdrop-blur-sm border border-white/30" 
              />
              <motion.div 
                animate={{ rotate: [-2, 0, -2], x: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[5%] left-[-5%] w-[110%] h-[110%] bg-blue-50/50 rounded-[2.5rem] border border-white/40 shadow-xl shadow-blue-500/5" 
              />
              
              {/* Main Image Container Replacement: Privacy-First Placeholder */}
              <div className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl border-[10px] border-white group transition-all duration-700 flex flex-col items-center justify-center">
                {/* Stylized "Z" Placeholder for Zero Labs */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative flex items-center justify-center w-32 h-32"
                >
                  <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl animate-pulse" />
                  <span className="text-8xl font-bold bg-gradient-to-br from-white via-white/80 to-slate-500 bg-clip-text text-transparent font-instrument tracking-tight select-none">
                    Z
                  </span>
                </motion.div>
                
                {/* Subtle Branding Subtext */}
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">Zero Labs</p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-60 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Minimalist Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6 text-slate-600 leading-relaxed text-lg font-inter">
              <p>
                I am a systems architect specializing in <span className="font-bold text-slate-900 text-xl font-instrument">Cybersecurity</span> and <span className="font-bold text-slate-900 text-xl font-instrument">AI Innovation</span>. 
                My work focuses on bridging the gap between high-performance data science and hardened system security.
              </p>
              
              <p>
               As the founder of <span className="font-bold text-slate-900 font-instrument">Zero Labs</span>, I build privacy-first ecosystems driven by a 
               <span className="font-medium italic"> &quot;Zero Trust&quot;</span> philosophy. I create digital solutions that are not just robust, 
               but intentionally designed for real-world impact.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6">
              <motion.a 
                href="/resume.pdf"
                download="Shriram_Reddy.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-900/10 hover:shadow-slate-900/20 transition-all font-inter"
              >
                <FileText size={18} /> Download Resume
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
