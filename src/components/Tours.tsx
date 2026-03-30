"use client";

import { motion } from "framer-motion";
import { upcomingShows } from "@/data/content";

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
            LIVE <span className="text-club-red">ON TOUR</span>
          </h2>
          <p className="mt-4 text-xl font-light text-club-gray-light/60">
            Grab your tickets before they run out. External links point to our ticketing partners.
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
                  <span className="text-xl md:text-2xl font-serif text-club-gray-light font-bold">
                    {show.city}
                  </span>
                  <span className="text-club-gray-light/50 font-light">
                    {show.venue}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-6 mt-2 md:mt-0">
                {show.status === "Selling Fast" && (
                  <span className="text-club-blue uppercase tracking-widest text-xs font-bold animate-pulse">
                    Selling Fast
                  </span>
                )}
                {show.status === "Sold Out" ? (
                  <button disabled className="px-8 py-3 border border-club-gray-light/20 text-club-gray-light/40 font-heading uppercase tracking-widest cursor-not-allowed">
                    Sold Out
                  </button>
                ) : (
                  <a href={show.ticketLink} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-club-red hover:bg-club-red-dark text-white font-heading uppercase tracking-widest transition-colors shadow-lg shadow-club-black">
                    Tickets
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {upcomingShows.length === 0 && (
          <div className="text-center py-20 text-club-gray-light/40 italic text-xl">
            No upcoming shows. Join the Green Room to be first in line when they drop.
          </div>
        )}

      </div>
    </section>
  );
}
