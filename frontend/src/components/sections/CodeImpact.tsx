"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, ExternalLink } from "lucide-react";
import { GitHubCalendar } from 'react-github-calendar';

export const CodeImpact = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="impact" className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="pt-16 border-t border-slate-50"
        >
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter mb-4">Activity</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-slate-200" />
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">Development & Impact Matrix</p>
            <span className="h-px w-8 bg-slate-200" />
          </div>
        </div>
            
        <div className="flex justify-center mb-16">
          <motion.a 
            href="https://github.com/Ram0507-Reddy"
            target="_blank"
            whileHover={{ x: 5 }}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-widest hover:text-teal-500 transition-colors"
          >
            Analyze Repositories <ExternalLink size={14} />
          </motion.a>
        </div>

          <div className="premium-card p-6 md:p-10 rounded-[2.5rem] bg-white border border-slate-100/50 shadow-sm overflow-x-auto">
             <div className="min-w-[700px]">
               {mounted ? (
                 <GitHubCalendar 
                   username="Ram0507-Reddy" 
                   labels={{
                     totalCount: "{{count}} contributions in the last year",
                   }}
                   theme={{
                     light: ['#f1f5f9', '#94a3b8', '#64748b', '#334155', '#0f172a'],
                     dark: ['#f1f5f9', '#94a3b8', '#64748b', '#334155', '#0f172a'],
                   }}
                   colorScheme="light"
                   fontSize={12}
                   blockSize={12}
                   blockMargin={4}
                 />
               ) : (
                 <div className="h-[150px] w-full bg-slate-50 rounded-lg animate-pulse" />
               )}
             </div>
             
             <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                <div className="flex items-center gap-4">
                   <span>Proof of Consistent Development</span>
                   <span className="w-1 h-1 rounded-full bg-slate-200" />
                   <span>Real-time Data Fetch</span>
                </div>
                <div className="italic text-slate-300">
                   * Matrix reflects all public contributions on GitHub
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
