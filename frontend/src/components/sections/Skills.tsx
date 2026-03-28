"use client";
import React from "react";
import { motion } from "framer-motion";
import { profile } from "@/constants/profile";

const skillCategories = [
  { name: "Programming", key: "programming" },
  { name: "Systems", key: "systems" },
  { name: "Tools & Creative", key: "tools" },
];

import { Shield, Terminal, Lock, Cpu, Globe, Database, PenTool, Layout, Box } from "lucide-react";

const getSkillIcon = (skill: string) => {
  const map: Record<string, { type: "simple" | "lucide" | "local", value: string | any }> = {
    "HTML": { type: "simple", value: "html5" },
    "CSS": { type: "simple", value: "css" },
    "JavaScript": { type: "simple", value: "javascript" },
    "C": { type: "simple", value: "c" },
    "C++": { type: "simple", value: "cplusplus" },
    "Python": { type: "simple", value: "python" },
    "Bash": { type: "simple", value: "gnubash" },
    "MERN stack": { type: "simple", value: "react" },
    "Docker": { type: "simple", value: "docker" },
    "Ollama": { type: "simple", value: "ollama" },
    "Figma": { type: "simple", value: "figma" },
    "Canva": { type: "local", value: "/icons/canva.png" },
    "CapCut": { type: "local", value: "/icons/capcut.png" },
    "Local AI setups": { type: "local", value: "/icons/openai.png" },
    "Cybersecurity": { type: "lucide", value: Shield },
    "Ethical hacking": { type: "lucide", value: Terminal },
    "Privacy-first system design": { type: "lucide", value: Lock },
  };
  
  return map[skill] || { type: "lucide", value: Box };
};

const SkillItem = ({ skill }: { skill: string }) => {
  const [imageError, setImageError] = React.useState(false);
  const icon = getSkillIcon(skill);
  const LucideIcon = icon.type === "lucide" ? icon.value : (imageError ? Box : null);

  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -5 }}
      className="premium-card bg-white p-5 rounded-2xl flex flex-col items-center justify-center gap-4 text-center min-h-[120px] group transition-all duration-500"
    >
      <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
        {icon.type === "simple" && !imageError ? (
          <img 
            src={`https://cdn.simpleicons.org/${icon.value}`} 
            alt={skill} 
            className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-all duration-500" 
            onError={() => setImageError(true)}
          />
        ) : icon.type === "local" && !imageError ? (
          <img 
            src={icon.value} 
            alt={skill} 
            className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-500 rounded-md" 
            onError={() => setImageError(true)}
          />
        ) : (
          <LucideIcon className="w-8 h-8 text-slate-400 group-hover:text-slate-900 transition-colors duration-500" strokeWidth={1.5} />
        )}
      </div>
      <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
        {skill}
      </span>
    </motion.div>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="relative overflow-hidden py-24 bg-studio-light border-y border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter mb-4">Expertise</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-slate-200" />
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">Technical Core & Competencies</p>
            <span className="h-px w-8 bg-slate-200" />
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {skillCategories.map((category, idx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col h-full px-2 md:px-0"
          >
            <h3 className="text-slate-400 font-body tracking-[0.4em] text-[9px] uppercase mb-6 md:mb-8 font-bold border-l-2 border-slate-200 pl-4">
              {category.name}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 md:gap-4">
              {(profile.skills as any)[category.key].map((skill: string) => (
                <SkillItem key={skill} skill={skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      </div>
    </section>
  );
};
