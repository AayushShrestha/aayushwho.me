"use client";

import { motion } from "framer-motion";
import { ppvSpecials } from "@/data/content";
import Image from "next/image";

export default function PPV() {
  const ppv = ppvSpecials[0];

  return (
    <section className="relative w-full py-16 md:py-32 bg-[#4a0101] border-y-4 border-club-black overflow-hidden bg-noise">
      <div className="absolute inset-0 bg-club-black/50 mix-blend-overlay"></div>
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-club-black flex flex-col md:flex-row shadow-2xl border-4 border-[#8a0303]"
        >
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
            <Image
              src="/images/mujibaad.png"
              alt="Mujibaad Special"
              fill
              className="object-cover object-top mix-blend-screen opacity-90 contrast-150 grayscale"
            />
            {/* Color Burn Overlay */}
            <div className="absolute inset-0 bg-[#8a0303] mix-blend-color z-10 opacity-70"></div>
          </div>
          
          {/* Content Side */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-20 space-y-6 bg-club-black">
            <div className="inline-block bg-[#8a0303] text-white px-3 py-1 font-heading uppercase text-xs tracking-widest w-max self-start mb-2">
              Exclusive Access
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-7xl text-white drop-shadow-md leading-none">
              {ppv.title}
            </h2>
            <div className="w-20 h-1 bg-[#8a0303]"></div>
            <p className="text-lg md:text-xl font-light text-club-gray-light/80 italic">
              {ppv.description}
            </p>
            
            <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
              <span className="text-4xl font-serif text-white font-bold tracking-tight">{ppv.price}</span>
              <a href={ppv.link} className="px-10 py-5 bg-[#8a0303] hover:bg-club-blue text-white font-heading text-lg uppercase tracking-widest transition-colors w-full sm:w-auto text-center shadow-lg transform hover:scale-105">
                Unlock Status
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
