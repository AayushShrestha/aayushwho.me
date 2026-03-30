"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-club-black/80 backdrop-blur-md border-b border-club-blue/20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 h-20 flex items-center justify-between">
        <Link href="/" className="font-heading text-2xl tracking-widest text-white hover:text-club-red transition-colors">
          AAYUSH<span className="text-club-blue">WHO</span>
        </Link>
        <div className="hidden md:flex gap-8 font-heading text-sm uppercase tracking-widest text-club-gray-light">
          <Link href="#bio" className="hover:text-club-blue transition-colors">The Comedian</Link>
          <Link href="#specials" className="hover:text-club-blue transition-colors">The Hour</Link>
          <Link href="#tours" className="hover:text-club-blue transition-colors">Tours</Link>
          <Link href="#showcase" className="hover:text-club-blue transition-colors">Stand-Up</Link>
          <Link href="#merch" className="hover:text-club-blue transition-colors">Merch</Link>
        </div>
      </div>
    </motion.nav>
  );
}
