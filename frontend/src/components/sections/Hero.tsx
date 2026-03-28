"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/constants/profile";
import { MessageCircle, ChevronRight } from "lucide-react";
import { BackgroundShape } from "../global/BackgroundShapes";

const roles = [
  "UI/UX designer",
  "full stack developer",
  "cyber enthusiast",
  "system architect",
  "security auditor",
];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[roleIndex];
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-48 overflow-hidden bg-studio-light">
      {/* Dynamic Balanced Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Radial Glows */}
        <div className="absolute top-[20%] left-[10%] w-[40%] h-[40%] bg-vibrant-teal/5 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[35%] h-[35%] bg-vibrant-amber/5 blur-[100px] rounded-full animate-pulse-slow del-1000" />
        <div className="absolute top-[40%] right-[20%] w-[25%] h-[25%] bg-vibrant-rose/5 blur-[80px] rounded-full animate-pulse-slow del-2000" />
      </div>

      <BackgroundShape 
        type="cuboid" 
        color="amber"
        className="top-[15%] right-[-10%] md:right-[5%] w-32 h-44 md:w-56 md:h-72 translate-x-[20%]" 
        rotate={12}
      />
      <BackgroundShape 
        type="faceted-square" 
        color="teal"
        className="top-[45%] left-[-10%] md:left-[2%] w-28 h-28 md:w-44 md:h-44 shadow-xl translate-x-[-20%]" 
        rotate={-15}
        delay={2}
      />

      <div className="max-w-5xl mx-auto px-6 text-center z-10 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8 md:space-y-12"
        >
          <div className="flex flex-col items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-slate-200 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-slate-500 uppercase">
                {profile.location}
              </span>
            </div>
            
            <div className="text-[10px] md:text-[12px] font-bold tracking-[0.3em] md:tracking-[0.5em] text-slate-400 uppercase mt-4 flex flex-col md:flex-row items-center justify-center gap-2">
              <span className="text-slate-300">I am a</span>
              <span className="text-slate-500 relative inline-block min-w-[150px] md:min-w-[200px] text-center md:text-left">
                {currentText}
                <span className="hidden md:inline-block absolute right-[-4px] top-0 bottom-0 w-[2px] bg-slate-400 animate-pulse ml-1" />
              </span>
            </div>
          </div>

          <h1 className="text-[2.9375rem] sm:text-[4.4375rem] md:text-[8.5375rem] font-bold tracking-tighter text-slate-900 leading-[0.9] md:leading-[0.85]">
            {profile.name}
          </h1>

          <p className="text-[1.0625rem] md:text-[1.4375rem] text-slate-500 max-w-2xl mx-auto leading-relaxed font-light px-4 md:px-0">
            Crafting <span className="font-medium text-slate-900">Privacy-First Architectures</span>, 
            High-Performance Web, <span className="text-slate-400 italic">and</span> Intelligent Automation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4">
            <motion.a
              href="#projects"
              whileHover={{ y: -5, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-2xl font-bold text-base md:text-lg shadow-xl shadow-slate-900/10 transition-all border border-slate-800 flex items-center justify-center gap-2"
            >
              Explore Work <ChevronRight size={20} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -5, scale: 1.02, backgroundColor: "rgba(255,255,255,1)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white/50 border border-slate-200 text-slate-900 rounded-2xl font-bold text-base md:text-lg backdrop-blur-md transition-all flex items-center justify-center"
            >
              Contact
            </motion.a>
          </div>

          {/* Social Links Icons */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 pt-6">
            {[
              { icon: <GithubIcon />, href: profile.contact.github, label: "GitHub" },
              { icon: <LinkedinIcon />, href: profile.contact.linkedin, label: "LinkedIn" },
              { icon: <InstagramIcon />, href: profile.contact.instagram, label: "Instagram" },
              { icon: <MessageCircle size={20} />, href: "#contact", label: "WhatsApp" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target={social.href?.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-slate-900 hover:border-slate-900 hover:shadow-xl transition-all duration-300"
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Mouse Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] text-slate-400 font-bold">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-200 flex justify-center p-1.5 glass-3d">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2.5 bg-slate-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};
