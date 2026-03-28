"use client";
import React from "react";
import { motion } from "framer-motion";
import { profile } from "@/constants/profile";
import { Trophy, Award, CheckCircle2 } from "lucide-react";

export const Achievements = () => {
  return (
    <section id="achievements" className="relative overflow-hidden py-24 bg-studio-light">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Achievements */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
              <Trophy className="text-indigo-600" size={24} />
            </div>
            <h2 className="text-3xl font-heading tracking-tight text-slate-900">Achievements</h2>
          </div>

          <div className="space-y-6">
            {profile.achievements.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ rotateX: 2, rotateY: 2, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="premium-card bg-white p-6 rounded-2xl flex items-start gap-5 group cursor-default"
              >
                <div className="mt-1 p-2 bg-slate-50 rounded-lg group-hover:bg-slate-900 transition-colors">
                  <Award className="text-slate-600 group-hover:text-white transition-colors" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-heading mb-1 text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 text-sm font-body font-medium">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <CheckCircle2 className="text-slate-600" size={24} />
            </div>
            <h2 className="text-3xl font-heading tracking-tight text-slate-900">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, rotateZ: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-5 bg-white border border-slate-100 rounded-2xl text-[10px] uppercase tracking-[0.15em] font-bold text-slate-500 hover:text-slate-900 hover:border-slate-900 hover:shadow-xl transition-all duration-300 flex items-center gap-4 cursor-default"
              >
                <div className="w-2 h-2 rounded-full bg-slate-400 group-hover:bg-slate-900 shadow-sm transition-colors" />
                {cert}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
