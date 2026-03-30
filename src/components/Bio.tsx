"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Bio() {
  return (
    <section className="relative w-full py-24 md:py-40 px-6 md:px-16 bg-club-black overflow-hidden border-t border-club-gray">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Bio Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1 space-y-8 relative z-10"
        >
          <h2 className="font-heading text-4xl md:text-7xl text-club-gray-light">
            THE <span className="text-club-red">COMEDIAN</span>
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-club-gray-light/80 leading-relaxed font-light">
            <p>
              I started stand-up comedy in 2017. Back then, I helped found a group called <strong className="text-white font-normal uppercase tracking-wide">"Comedy Tuk Tuk"</strong>—we were the first to bring Stand-Up Comedy Open Mics to the gritty streets of Nepal.
            </p>
            <p>
              My comedic voice? It&apos;s socio-political commentary dripping with an unapologetic aloofness and wrapped in sheer silliness. It&apos;s the uncomfortable truth told by a guy who looks like he&apos;d rather be anywhere else.
            </p>
            <p className="italic text-club-red font-normal">
              Currently, I&apos;m causing trouble with the comedy group &quot;Laugh and Clap&quot;.
            </p>
          </div>
        </motion.div>

        {/* Bio Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2 relative max-w-md mx-auto w-full group"
        >
          <div className="relative aspect-[3/4] w-full bg-club-red">
            <Image
              src="/images/mujibaad.png"
              alt="Aayush performing Stand Up"
              fill
              className="object-cover object-center grayscale contrast-150 transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-100 mix-blend-screen"
            />
          </div>
          {/* Grungy border frame */}
          <div className="absolute inset-0 border-2 border-club-gray z-20 translate-x-4 translate-y-4 pointer-events-none transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
        </motion.div>

      </div>
    </section>
  );
}
