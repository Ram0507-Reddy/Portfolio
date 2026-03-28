"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/constants/works";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { profile } from "@/constants/profile";

const categories = ["Featured", "Cyber-security", "Web development"];

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("Featured");
  const filteredProjects = projects.filter(p => p.category.includes(activeCategory as ("Featured" | "Cyber-security" | "Web development")));

  return (
    <section id="projects" className="relative overflow-hidden py-24 bg-studio-light">

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter mb-4">Projects</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-slate-200" />
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">I worked on</p>
            <span className="h-px w-8 bg-slate-200" />
          </div>
        </div>

        {/* Category Filter */}
      <div className="flex justify-center flex-wrap gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 shadow-sm active:scale-95 ${
              activeCategory === cat 
                ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10" 
                : "bg-white border border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View More on GitHub */}
      <div className="mt-20 text-center">
        <p className="text-slate-500 text-xs font-medium mb-6 uppercase tracking-widest leading-loose">
          These are just the featured projects. <br/>
          To view more technical projects, visit my GitHub.
        </p>
        <a 
          href={profile.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:shadow-2xl hover:shadow-slate-900/20 active:scale-95 group"
        >
          To view all projects click here
          <svg 
            className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
      </div>
    </section>
  );
};
