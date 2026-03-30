"use client";

import { motion } from "framer-motion";
import { ppvSpecials } from "@/data/content";

export default function PPV() {
  const ppv = ppvSpecials[0]; // Currently showcasing Mujibaad

  return (
    <section className="relative w-full bg-club-black border-t border-club-gray-light/10">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative bg-club-gray border border-club-red/30 p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12"
        >
          {/* Subtle Video Icon Background */}
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
            <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 8v8l6-4-6-4z" />
            </svg>
          </div>

          <div className="flex-1 space-y-4 relative z-10 text-center md:text-left">
            <span className="text-club-red font-heading tracking-widest uppercase text-sm">Now Available on Pay-Per-View</span>
            <h2 className="font-heading text-4xl md:text-5xl text-club-gray-light">
              {ppv.title}
            </h2>
            <p className="text-lg font-light text-club-gray-light/70 max-w-lg">
              {ppv.description}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 relative z-10 w-full md:w-auto">
            <span className="text-2xl font-serif text-club-gray-light font-bold">{ppv.price}</span>
            <a href={ppv.link} className="px-10 py-4 bg-club-red hover:bg-club-red-dark text-white font-heading text-lg uppercase tracking-widest transition-colors whitespace-nowrap shadow-lg shadow-club-black">
              Unlock Full Special
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
