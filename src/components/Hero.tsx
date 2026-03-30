"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] flex flex-col justify-center overflow-hidden">
      {/* Background Image with Gritty Filter */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-image.png"
          alt="Aayush Shrestha Stand Up Comedy"
          fill
          className="object-cover object-top opacity-60 contrast-125"
          priority
        />
        {/* Soft edge gradients so it blends with the dark background */}
        <div className="absolute inset-0 bg-gradient-to-t from-club-black via-club-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-club-black/80 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-6 md:px-16 max-w-7xl mx-auto w-full pt-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-heading text-6xl shadow-club-black drop-shadow-2xl md:text-8xl lg:text-[10rem] leading-none text-white tracking-tight">
            AAYUSH<br className="hidden md:block"/><span className="text-club-red mix-blend-screen drop-shadow-xl">WHO</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="mt-6 md:mt-10 max-w-xl"
        >
          <p className="text-xl md:text-3xl font-light tracking-wide text-club-gray-light leading-snug drop-shadow-md">
            Raw, unfiltered socio-political commentary <span className="text-club-blue italic font-medium">served with extreme aloofness.</span>
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-heading text-club-blue">Scroll</span>
        <div className="w-[1px] h-12 bg-club-blue"></div>
      </motion.div>
    </section>
  );
}
