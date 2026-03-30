"use client";

import { motion } from "framer-motion";
import { standUpVideos, podcasts } from "@/data/content";

export default function Showcase() {
  return (
    <section id="showcase" className="relative w-full py-24 px-6 md:px-16 bg-club-black overflow-hidden border-t border-club-blue/20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-4xl md:text-6xl text-club-gray-light mb-4 text-center md:text-left">
            STAND-UP <span className="text-club-blue">COMEDY</span>
          </h2>
          <p className="text-xl font-light text-club-gray-light/60 text-center md:text-left">
            The raw, unfiltered routines. Ordered by views.
          </p>
        </motion.div>

        {/* Videos Grid - Increased size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {standUpVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col"
            >
              <div className="aspect-video w-full bg-club-gray relative overflow-hidden mb-4 border-2 border-club-blue/10 group-hover:border-club-blue/50 transition-colors shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?controls=1&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
              <h3 className="font-heading text-2xl text-club-gray-light group-hover:text-club-blue transition-colors mb-1">
                {video.title}
              </h3>
              <p className="font-serif text-sm text-club-gray-light/50 italic tracking-widest uppercase">
                {video.views} Views
              </p>
            </motion.div>
          ))}
        </div>

        {/* Podcasts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 mb-10"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-club-gray-light/80 mb-2">
            GUEST <span className="text-club-red/80">APPEARANCES</span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {podcasts.map((podcast, idx) => (
            <motion.div
              key={podcast.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex gap-4 items-center bg-club-gray/30 p-4 border border-club-gray-light/5 hover:border-club-red/50 transition-colors"
            >
              <div className="w-32 aspect-video bg-club-gray shrink-0 relative overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${podcast.id}?controls=1&modestbranding=1`}
                  title={podcast.title}
                  allowFullScreen
                  className="w-full h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                ></iframe>
              </div>
              <div>
                <h3 className="font-heading text-lg text-club-gray-light">{podcast.title}</h3>
                <p className="font-serif text-sm text-club-gray-light/50 italic">via {podcast.host}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
