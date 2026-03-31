"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { standUpVideos, podcasts, sectionCopy } from "@/data/content";
import Image from "next/image";

export default function Showcase() {
  const [activeVideo, setActiveVideo] = useState(standUpVideos[0]);

  return (
    <section id="showcase" className="relative w-full py-24 px-6 md:px-16 bg-club-black overflow-hidden border-t border-club-blue/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading text-4xl md:text-6xl text-club-gray-light mb-4 text-center md:text-left tracking-wide">
            {sectionCopy.showcase.standUpHeading} <span className="text-club-blue">{sectionCopy.showcase.standUpHeadingAccent}</span>
          </h2>
          <p className="text-xl font-light text-club-gray-light/60 text-center md:text-left">
            {sectionCopy.showcase.standUpSubheading}
          </p>
        </motion.div>

        {/* Big Player */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full aspect-video bg-club-gray mb-6 border-4 border-club-gray-light/5 shadow-2xl relative group"
        >
            <iframe
              key={activeVideo.id} // Forces re-render on change
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=0&controls=1&modestbranding=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
        </motion.div>

        <div className="mb-8">
           <h3 className="font-heading text-3xl text-club-gray-light uppercase tracking-wide">
             {activeVideo.title}
           </h3>
           <p className="text-club-red font-serif tracking-widest uppercase text-sm">{activeVideo.views} Views</p>
        </div>

        {/* Thumbnails Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {standUpVideos.map((video, idx) => (
            <motion.button
              key={video.id}
              onClick={() => {
                setActiveVideo(video);
                document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative aspect-video overflow-hidden border-2 transition-all focus:outline-none ${activeVideo.id === video.id ? 'border-club-red scale-[1.02] shadow-xl shadow-club-red/20 opacity-100' : 'border-club-blue/10 hover:border-club-blue/50 opacity-50 hover:opacity-100 grayscale hover:grayscale-0'}`}
            >
              <Image 
                 src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} 
                 alt={video.title} 
                 fill 
                 className="object-cover"
                 sizes="(max-width: 768px) 50vw, 25vw" 
              />
              <div className="absolute inset-0 bg-club-black/20 hover:bg-transparent transition-colors"></div>
              
              {/* Overlay Play Icon */}
              {activeVideo.id !== video.id && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 bg-club-black/80 rounded-full flex items-center justify-center border border-white/20">
                    <svg className="w-4 h-4 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* PODCAST APPEARANCES */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mt-32 mb-12"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-club-gray-light mb-4 text-center md:text-left tracking-wide">
            {sectionCopy.showcase.podcastHeading} <span className="text-club-red">{sectionCopy.showcase.podcastHeadingAccent}</span>
          </h2>
          <p className="text-xl font-light text-club-gray-light/60 text-center md:text-left">
            {sectionCopy.showcase.podcastSubheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {podcasts.map((pod, idx) => (
             <motion.a
               key={pod.id}
               href={`https://youtube.com/watch?v=${pod.id}`}
               target="_blank"
               rel="noopener noreferrer"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: idx * 0.1 }}
               className="group flex flex-col focus:outline-none"
             >
                <div className="w-full aspect-video bg-club-gray relative overflow-hidden mb-4 border-2 border-club-blue/10 group-hover:border-club-red transition-all shadow-lg">
                   <Image src={`https://img.youtube.com/vi/${pod.id}/hqdefault.jpg`} alt={pod.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                   <div className="absolute inset-0 bg-club-black/40 group-hover:bg-transparent transition-colors"></div>
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="w-14 h-14 bg-club-red text-white flex items-center justify-center rounded-full shadow-lg shadow-club-black">
                       <svg className="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                     </div>
                   </div>
                </div>
                <h3 className="font-heading text-2xl text-club-gray-light group-hover:text-club-red transition-colors leading-tight mb-2">
                  {pod.title}
                </h3>
                <p className="font-serif text-sm text-club-gray-light/60 italic uppercase tracking-widest">
                  Hosted by {pod.host}
                </p>
             </motion.a>
          ))}
        </div>

        {/* YouTube nudge */}
        <div className="mt-16 pt-6 border-t border-club-blue/10 flex flex-wrap items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-club-red shrink-0">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span className="text-sm text-club-gray-light/50">{sectionCopy.showcase.youtubeNudge}</span>
          <a
            href="https://www.youtube.com/@AayushWho"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-club-blue hover:text-club-red transition-colors"
          >
            Subscribe on YouTube →
          </a>
        </div>

      </div>
    </section>
  );
}
