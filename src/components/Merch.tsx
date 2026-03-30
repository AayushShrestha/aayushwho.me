"use client";

import { motion } from "framer-motion";
import { merchItems } from "@/data/content";

export default function Merch() {
  return (
    <section id="merch" className="relative w-full py-24 md:py-32 bg-club-black overflow-hidden border-t border-club-blue/20">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="font-heading text-4xl md:text-6xl text-club-gray-light uppercase">
            THE <span className="text-club-red">MERCH</span>
          </h2>
          <p className="mt-4 text-xl font-light text-club-gray-light/60">
            Official AAYUSHWHO apparel and artifacts. (Placeholders for now)
          </p>
        </motion.div>

        {/* Merch Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {merchItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col items-center"
            >
              {/* Product Image Placeholder */}
              <div className="aspect-square w-full bg-club-gray relative overflow-hidden mb-6 border border-club-blue/10 group-hover:border-club-red transition-colors flex items-center justify-center">
                
                {/* Simulated product placeholder icon */}
                <svg className="w-1/3 h-1/3 text-club-gray-light/20 group-hover:text-club-red/50 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>

                <div className="absolute inset-0 bg-club-blue/5 mix-blend-overlay group-hover:bg-club-red/10 transition-colors"></div>
              </div>

              {/* Product Info */}
              <h3 className="font-heading text-2xl text-club-gray-light group-hover:text-club-red transition-colors mb-2 text-center">
                {item.name}
              </h3>
              <p className="font-serif text-lg text-club-blue tracking-wider mb-6">
                {item.price}
              </p>

              <a href={item.link} className="px-8 py-3 bg-club-gray-light text-club-black font-heading uppercase tracking-widest text-sm hover:bg-club-red hover:text-white transition-colors w-full text-center">
                Add to Cart
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
