"use client";
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Shield, Code, ChevronRight } from "lucide-react";

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/1992/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58V22"></path>
  </svg>
);
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  category: string[];
}

export const ProjectCard = ({ title, description, tags, link, github, category }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        rotateX: 2, 
        rotateY: 2, 
        z: 30,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      className="premium-card group rounded-2xl p-8 flex flex-col h-full bg-white transition-all duration-500 cursor-default"
    >
      <div className="flex justify-between items-start mb-6 w-full">
        <div className="flex flex-wrap gap-2">
          {category.map((cat) => (
             <span key={cat} className="text-[10px] uppercase tracking-[0.2em] text-slate-900 font-bold px-3 py-1 bg-slate-100 rounded-full border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-500">
               {cat}
             </span>
          ))}
        </div>
        <div className="flex gap-4">
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-50 hover:bg-slate-900 rounded-full text-slate-400 hover:text-white transition-all duration-300 border border-slate-100"
              aria-label="GitHub Repository"
            >
              <GithubIcon size={16} />
            </a>
          )}
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2.5 bg-slate-50 hover:bg-slate-900 rounded-full text-slate-400 hover:text-white transition-all duration-300 border border-slate-100"
              aria-label="View Live Project"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-2xl font-heading mb-4 text-slate-900 group-hover:translate-x-1 transition-transform duration-300 leading-tight">
        {title}
      </h3>
      
      <p className="text-slate-500 text-sm font-body leading-relaxed mb-8 flex-grow">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-50 group-hover:border-slate-200 transition-colors">
        {tags.map((tag) => (
          <span key={tag} className="text-[9px] uppercase tracking-[0.15em] text-slate-400 font-bold px-2.5 py-1 bg-slate-50 border border-slate-100 rounded group-hover:text-slate-600 group-hover:border-slate-300 transition-colors">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
