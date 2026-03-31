"use client";

import { motion } from "framer-motion";
import { upcomingShows, sectionCopy } from "@/data/content";

export default function Tours() {
  return (
    <section id="tours" className="relative w-full py-24 md:py-32 bg-club-black overflow-hidden border-t border-club-blue/20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 text-center"
        >
          <h2 className="font-heading text-4xl md:text-6xl text-club-gray-light uppercase">
            {sectionCopy.tours.heading} <span className="text-club-red">{sectionCopy.tours.headingAccent}</span>
          </h2>
          <p className="mt-4 text-xl font-light text-club-gray-light/60">
            {sectionCopy.tours.subheading}
          </p>
        </motion.div>

        {/* Tour List Layout */}
        <div className="flex flex-col border-t border-club-gray">
          {upcomingShows.map((show, idx) => (
            <motion.div
              key={show.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 md:py-8 border-b border-club-gray hover:bg-club-gray/20 transition-colors px-4 md:px-8"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12 w-full md:w-auto mb-4 md:mb-0">
                {/* Date */}
                <div className="w-40">
                  <span className="font-heading text-xl text-club-red tracking-wider">{show.date}</span>
                </div>
                {/* Location */}
                <div className="flex flex-col">
                  {show.showName && (
                    <span className="text-2xl md:text-3xl text-club-red font-heading tracking-widest uppercase mb-1">
                      {show.showName}
                    </span>
                  )}
                  <span className="text-lg md:text-xl font-serif text-club-gray-light font-bold">
                    {show.city}
                  </span>
                  <span className="text-club-gray-light/50 font-light mt-1">
                    {show.venue}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mt-6 md:mt-0 w-full md:w-auto">
                {show.status === "Selling Fast" && (
                  <span className="text-club-blue uppercase tracking-widest text-xs font-bold animate-pulse">
                    Selling Fast
                  </span>
                )}
                {show.status === "Sold Out" ? (
                  <button disabled className="w-full md:w-auto px-8 py-4 md:py-3 border border-club-gray-light/20 text-club-gray-light/40 font-heading uppercase tracking-widest cursor-not-allowed">
                    Sold Out
                  </button>
                ) : (
                  <a href={show.ticketLink} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto text-center px-8 py-4 md:py-3 bg-club-red hover:bg-club-red-dark text-white font-heading uppercase tracking-widest transition-colors shadow-lg shadow-club-black">
                    Tickets
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {upcomingShows.length === 0 && (
          <div className="text-center py-20 text-club-gray-light/40 italic text-xl">
            Nothing scheduled right now. Get on the list and you&apos;ll hear it first.
          </div>
        )}

        {/* YouTube nudge */}
        <div className="mt-12 pt-6 border-t border-club-blue/10 flex flex-wrap items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-club-red shrink-0">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <span className="text-sm text-club-gray-light/50">{sectionCopy.tours.youtubeNudge}</span>
          <a
            href="https://www.youtube.com/@AayushWho"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-club-blue hover:text-club-red transition-colors"
          >
            Watch on YouTube →
          </a>
        </div>

      </div>
    </section>
  );
}
