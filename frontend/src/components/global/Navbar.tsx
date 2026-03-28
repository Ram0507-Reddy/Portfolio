"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Experience", href: "#experience" },
  { name: "Expertise", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-8 left-0 right-0 z-50 px-6 pointer-events-none"
    >
      <div className="max-w-screen-xl mx-auto flex justify-center">
        <nav className="bg-white/80 backdrop-blur-3xl rounded-full px-6 md:px-10 py-4 flex items-center justify-between gap-12 border border-slate-200/50 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] pointer-events-auto">
          <div className="flex items-center shrink-0">
            <span className="text-[10px] font-bold tracking-[0.3em] text-slate-900 whitespace-nowrap">
              S. REDDY
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-[9px] uppercase tracking-[0.25em] text-slate-400 hover:text-slate-900 transition-all duration-300 relative group font-bold"
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-slate-900 transition-all duration-300 rounded-full group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1 text-slate-900 transition-transform active:scale-95"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-white/95 backdrop-blur-2xl z-[40] flex flex-col items-center justify-center pointer-events-auto lg:hidden"
          >
            <div className="flex flex-col items-center gap-12">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link 
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-heading tracking-tighter text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-12 border-t border-slate-100 flex gap-6"
              >
                <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400">
                  Based in India
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
