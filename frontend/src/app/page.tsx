import dynamic from "next/dynamic";
import { Navbar } from "@/components/global/Navbar";
import { Hero } from "@/components/sections/Hero";
import { AboutMe } from "@/components/sections/AboutMe";

// Dynamically load non-critical below-the-fold sections to speed up First Contentful Paint
const CodeImpact = dynamic(() => import("@/components/sections/CodeImpact").then(mod => mod.CodeImpact));
const Projects = dynamic(() => import("@/components/sections/Projects").then(mod => mod.Projects));
const ExperienceEducation = dynamic(() => import("@/components/sections/ExperienceEducation").then(mod => mod.ExperienceEducation));
const Skills = dynamic(() => import("@/components/sections/Skills").then(mod => mod.Skills));

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col pb-16">
        <Hero />
        <AboutMe />
        <Skills />
        <CodeImpact />
        <ExperienceEducation />
        <Projects />
        
        <section id="contact" className="py-16 px-6 text-center max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif mb-8 tracking-tighter text-slate-900 leading-tight">Ready to Build Something Extraordinary?</h2>
          <p className="text-slate-500 mb-12 text-lg font-light max-w-2xl mx-auto">
            Open to Work. Focused on high-impact collaborations in Cybersecurity and AI systems.
          </p>
          <a 
            href="mailto:shriramreddyofficial0507@gmail.com"
            className="inline-block px-12 py-5 bg-slate-900 text-white rounded-full font-bold text-xl shadow-2xl shadow-slate-200 hover:scale-105 transition-all duration-300"
          >
            Let's Talk
          </a>
        </section>
      </div>

      <footer className="py-12 border-t border-slate-200 text-center text-slate-400 text-xs uppercase tracking-[0.2em] font-medium">
        &copy; {new Date().getFullYear()} Shriram Reddy. All Rights Reserved.
      </footer>
    </>
  );
}
