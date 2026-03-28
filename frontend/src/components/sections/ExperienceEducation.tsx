"use client";
import React from "react";
import { motion } from "framer-motion";
import { profile, Education, Experience } from "@/constants/profile";
import { GraduationCap, Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react";


export const ExperienceEducation = () => {
  return (
    <section id="experience" className="relative overflow-hidden py-16 bg-studio-light">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-[10%] left-[-5%] w-[30%] h-[30%] bg-vibrant-teal/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-vibrant-amber/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter mb-4">Experience</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-slate-200" />
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400">Professional Path & Education</p>
            <span className="h-px w-8 bg-slate-200" />
          </div>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-slate-200 via-slate-200 to-transparent" />

          <div className="space-y-10">
            {profile.experience.map((exp: Experience, idx: number) => {
              const isFounder = exp.role.toLowerCase() === "founder";
              const themeColor = isFounder ? "vibrant-amber" : "vibrant-teal";

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-12 group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-8 w-6 h-6 rounded-full border-[3px] border-white shadow-lg z-20 flex items-center justify-center transform -translate-x-1/2 bg-white transition-all duration-500">
                     <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isFounder ? 'bg-vibrant-amber shadow-[0_0_8px_rgba(251,191,36,0.4)]' : 'bg-vibrant-teal shadow-[0_0_8px_rgba(45,212,191,0.4)]'}`} />
                  </div>

                  {/* Content Card */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="premium-card p-6 md:p-8 rounded-[2rem] bg-white hover:shadow-xl transition-all duration-500 border border-slate-100/50 w-full"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-slate-400">
                            {exp.duration}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-heading text-slate-900">{exp.role}</h3>
                        <p className={`text-sm font-bold uppercase tracking-widest ${isFounder ? 'text-vibrant-amber' : 'text-vibrant-teal'}`}>
                          {exp.org}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                         {isFounder ? <MapPin size={20} className="text-slate-400" /> : <Briefcase size={20} className="text-slate-400" />}
                      </div>
                    </div>

                    {exp.focus && (
                      <p className="text-slate-500 text-sm font-body leading-relaxed mb-6 border-l-2 border-slate-100 pl-4 italic">
                        {exp.focus}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4">
                      {exp.website && (
                        <motion.a 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={`https://${exp.website}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-bold shadow-md hover:shadow-lg transition-all"
                        >
                          Explore Website <ExternalLink size={12} />
                        </motion.a>
                      )}
                      {exp.location && (
                        <motion.button
                          whileHover={{ x: 3 }}
                          onClick={() => window.open(exp.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(exp.location!)}`, '_blank')}
                          className="inline-flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors"
                        >
                          <MapPin size={12} /> {exp.location}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Motivational End Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative pl-12 pt-4"
            >
              <div className="absolute left-6 top-10 w-2 h-2 rounded-full bg-slate-200 transform -translate-x-1/2" />
              <div className="flex flex-col gap-2">
                <span className="text-[8px] font-black tracking-[0.5em] uppercase text-slate-300">Next Chapter</span>
                <p className="text-sm md:text-base text-slate-400 font-light italic">
                  "Always learning and evolving. Looking forward to more high-impact experiences and challenging opportunities."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
