"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Tours", href: "#tours" },
    { name: "The Hour", href: "#specials" },
    { name: "Watch", href: "#showcase" },
    { name: "Inner Circle", href: "#contact" },
    { name: "Merch", href: "#merch" },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled || mobileMenuOpen
            ? "bg-club-black/90 backdrop-blur-md border-club-blue/20 py-0" 
            : "bg-transparent border-transparent py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16 h-20 flex items-center justify-between">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-heading text-xl tracking-widest text-white hover:text-club-red transition-colors z-50 relative">
            AAYUSH <span className="text-club-blue">SHRESTHA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 font-heading text-sm uppercase tracking-widest text-club-gray-light">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href} className="hover:text-club-red hover:drop-shadow-[0_0_12px_rgba(138,3,3,0.8)] hover:scale-110 transition-all duration-300">
                {item.name}
              </Link>
            ))}
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button 
            className="md:hidden z-50 relative p-2 focus:outline-none text-club-gray-light hover:text-club-red transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle mobile menu</span>
            <svg className="w-8 h-8 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-club-black/95 backdrop-blur-2xl flex flex-col items-center justify-center border-b-4 border-club-red"
          >
            <div className="flex flex-col gap-10 text-center font-heading text-4xl uppercase tracking-widest text-club-gray-light">
              {navLinks.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <Link 
                    href={item.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-club-red transition-colors drop-shadow-[0_0_12px_rgba(138,3,3,0.5)] block focus:outline-none"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
