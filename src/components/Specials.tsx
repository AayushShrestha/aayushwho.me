"use client";

import { motion } from "framer-motion";
import { specialsList, sectionCopy } from "@/data/content";
import Image from "next/image";

export default function Specials() {
  return (
    <section id="specials" className="relative w-full py-16 md:py-24 bg-club-black border-t border-club-blue/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="font-heading text-4xl md:text-6xl text-club-gray-light tracking-wide">
            {sectionCopy.specials.heading} <span className="text-club-red">{sectionCopy.specials.headingAccent}</span>
          </h2>
          <p className="mt-4 text-lg font-light text-club-gray-light/60 max-w-2xl mx-auto">
            {sectionCopy.specials.subheading}
          </p>
        </motion.div>

        {/* Horizontal Layout (Grid for desktop, stack/scroll for mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {specialsList.map((special, idx) => (
            <motion.div 
              key={special.title} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="flex flex-col group"
            >
              
              {/* Poster Placeholder */}
              <div
                className="w-full relative aspect-[4/5] bg-club-gray border-2 border-club-blue/10 overflow-hidden shadow-xl mb-6"
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-club-black/90 via-transparent to-transparent pointer-events-none" />
                <Image
                  src={special.imagePath}
                  alt={`${special.title} Poster`}
                  fill
                  className="object-cover object-center grayscale contrast-125 mix-blend-screen group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-club-red text-white font-heading px-3 py-1 uppercase tracking-widest text-sm z-20 shadow-lg shadow-club-black/50 rotate-[-3deg]">
                  Live
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col space-y-3">
                <h3 className="font-heading text-3xl md:text-4xl text-club-gray-light uppercase leading-[1.1] drop-shadow-md">
                  {special.title}
                </h3>
                <div className="h-[3px] w-12 bg-club-blue/60 group-hover:w-full transition-all duration-500"></div>
                <p className="text-base lg:text-lg font-light text-club-gray-light/80 leading-relaxed italic">
                  &quot;{special.description}&quot;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
