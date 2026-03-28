"use client";

import React from "react";
import { motion } from "framer-motion";

interface ShapeProps {
  type: "cuboid" | "faceted-square" | "circle" | "triangle";
  color?: "emerald" | "amber" | "teal" | "rose" | "lavender" | "sage";
  className?: string;
  delay?: number;
  duration?: number;
  rotate?: number;
  scale?: number;
}

export const BackgroundShape: React.FC<ShapeProps> = ({ 
  type, 
  color = "emerald",
  className = "", 
  delay = 0, 
  duration = 15,
  rotate = 0,
  scale = 1
}) => {
  const getColors = () => {
    switch (color) {
      case "amber":
        return {
          from: "from-amber-600/40",
          via: "via-orange-500/20",
          to: "to-yellow-500/30",
          accent: "border-amber-500/20",
          glow: "bg-amber-500/10"
        };
      case "teal":
        return {
          from: "from-teal-600/40",
          via: "via-emerald-400/20",
          to: "to-cyan-500/30",
          accent: "border-teal-500/20",
          glow: "bg-teal-500/10"
        };
      case "rose":
        return {
          from: "from-rose-600/40",
          via: "via-pink-500/20",
          to: "to-rose-400/30",
          accent: "border-rose-500/20",
          glow: "bg-rose-500/10"
        };
      case "lavender":
        return {
          from: "from-violet-600/40",
          via: "via-purple-500/20",
          to: "to-indigo-400/30",
          accent: "border-violet-500/20",
          glow: "bg-violet-500/10"
        };
      case "sage":
        return {
          from: "from-emerald-600/40",
          via: "via-green-500/20",
          to: "to-teal-400/30",
          accent: "border-emerald-500/20",
          glow: "bg-emerald-500/10"
        };
      default:
        return {
          from: "from-slate-900/60",
          via: "via-emerald-900/30",
          to: "to-slate-800/80",
          accent: "border-emerald-500/10",
          glow: "bg-emerald-500/10"
        };
    }
  };

  const colors = getColors();

  const getShape = () => {
    switch (type) {
      case "cuboid":
        return (
          <div className={`w-full h-full bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to} backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.1)] overflow-hidden rotate-6 skew-y-6`}>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-20" />
            <div className={`w-full h-full border ${colors.accent} rotate-45 transform flex items-center justify-center scale-150`}>
               <div className="w-1/2 h-1/2 bg-slate-950/40 backdrop-blur-2xl rounded-lg shadow-inner border border-white/5" />
            </div>
            <div className={`absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t ${color === "emerald" ? "from-emerald-900/20" : colors.from.replace("40", "20")} to-transparent`} />
          </div>
        );
      case "faceted-square":
        return (
          <div className={`w-full h-full bg-gradient-to-tl ${colors.from} ${colors.via} ${colors.to} backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4),inset_0_-10px_20px_rgba(255,255,255,0.02)] overflow-hidden`}>
             <div className="absolute inset-0 border-r border-b border-white/5" />
             <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-slate-800/10 ${colors.via}`} />
             <div className="w-full h-full flex items-center justify-center">
                <div className="w-3/4 h-3/4 border border-white/10 rotate-12 bg-slate-900/20 glass-3d" />
             </div>
          </div>
        );
      case "circle":
        return (
          <div className={`w-full h-full rounded-full bg-gradient-to-br ${colors.from} ${colors.via} ${colors.to} backdrop-blur-xl border border-white/10 shadow-[0_60px_120px_-10px_rgba(0,0,0,0.5),inset_0_4px_8px_rgba(255,255,255,0.05)] flex items-center justify-center relative`}>
             <div className={`w-3/4 h-3/4 rounded-full ${colors.glow} blur-3xl animate-pulse`} />
             <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-slate-800/40 blur-md border border-white/5" />
             <div className={`w-1/2 h-1/2 rounded-full border ${colors.accent} rotate-45`} />
          </div>
        );
      case "triangle":
        return (
          <div className="w-0 h-0 border-l-[110px] border-l-transparent border-b-[200px] border-b-slate-900/80 border-r-[110px] border-r-transparent relative drop-shadow-[0_40px_40px_rgba(0,0,0,0.3)] scale-75">
             <div className={`absolute -left-[100px] top-[10px] w-0 h-0 border-l-[100px] border-l-transparent border-b-[180px] ${colors.from} border-r-[100px] border-r-transparent backdrop-blur-md`} />
             <div className={`absolute -left-[45px] top-[90px] w-[90px] h-1 bg-gradient-to-r ${colors.accent.replace("20", "40")} to-transparent rotate-[60deg] blur-[1.5px]`} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.15, 0.35, 0.15],
        y: [0, -40, 0],
        rotate: [rotate, rotate + 10, rotate],
        scale: [scale, scale * 1.05, scale],
      }}
      transition={{ 
        duration, 
        delay, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className={`absolute -z-10 pointer-events-none hidden lg:block ${className}`}
    >
      {getShape()}
    </motion.div>
  );
};
