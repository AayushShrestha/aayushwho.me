"use client";

import { motion } from "framer-motion";
import { specialsList } from "@/data/content";
import Image from "next/image";

export default function Specials() {
  return (
    <section className="relative w-full py-16 md:py-20 bg-club-black border-t border-club-blue/20">
      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-heading text-3xl md:text-5xl text-club-gray-light">
            THE CURRENT <span className="text-club-red italic">HOUR</span>
          </h2>
          <p className="mt-2 text-lg font-light text-club-gray-light/60 max-w-xl mx-auto">
            My active stand-up comedy hours. Performing raw and unapologetic across the nation.
          </p>
        </motion.div>

        <div className="space-y-16">
          {specialsList.map((special, idx) => (
            <div key={special.title} className={`flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Poster Placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full md:w-1/3 relative aspect-[4/5] bg-club-gray group border-2 border-club-blue/10 shrink-0"
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-club-black via-transparent to-transparent opacity-80 pointer-events-none" />
                <Image
                  src={special.imagePath}
                  alt={`${special.title} Poster`}
                  fill
                  className="object-cover object-center grayscale contrast-125 mix-blend-screen group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute top-2 left-2 bg-club-red text-white font-heading px-2 py-1 uppercase tracking-widest text-xs z-20 shadow-lg shadow-club-black/50 rotate-[-2deg]">
                  Live
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: idx % 2 !== 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full md:w-1/2 space-y-4"
              >
                <h3 className="font-heading text-3xl md:text-4xl text-club-gray-light uppercase leading-none drop-shadow-md">
                  {special.title}
                </h3>
                <div className="h-[2px] w-12 bg-club-blue/60"></div>
                <p className="text-lg md:text-xl font-light text-club-gray-light/80 leading-relaxed italic">
                  &quot;{special.description}&quot;
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
