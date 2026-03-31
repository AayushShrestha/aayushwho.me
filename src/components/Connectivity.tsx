"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { socialLinks, communityContent, sectionCopy } from "@/data/content";

const socialIconPaths: Record<string, string> = {
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  youtube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  tiktok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.37-1.13 4.67-2.9 6.22-1.74 1.54-4.14 2.22-6.42 1.84-2.31-.37-4.41-1.7-5.59-3.66-1.16-1.92-1.42-4.28-.79-6.41.64-2.11 2.2-3.87 4.19-4.75 1.54-.68 3.32-.83 4.96-.54V13.8c-.89-.25-1.84-.21-2.69.11-.84.3-1.57.88-2.03 1.65-.45.75-.6 1.66-.41 2.51.19.85.74 1.58 1.48 2.01.76.44 1.69.54 2.54.27.84-.25 1.55-.83 1.94-1.62.19-.39.29-.83.3-1.28V.02z",
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
};

const copy = sectionCopy.community;
const connectCopy = sectionCopy.connectivity;

export default function Connectivity() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus("pending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative w-full py-24 bg-club-black border-t border-club-blue/20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

        {/* Inner Circle — Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-club-gray-light">
              {copy.heading} <span className="text-club-red">{copy.headingAccent}</span>
            </h2>
          </div>

          <div className="space-y-3">
            {/* Discord — compact row */}
            <div className="flex items-center justify-between gap-4 border border-club-blue/20 bg-club-gray px-4 py-3 hover:border-indigo-400/40 transition-colors">
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-400 shrink-0">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="font-heading text-sm text-club-gray-light uppercase tracking-wide">{copy.discord.title}</span>
              </div>
              <a href={communityContent.discord.inviteUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs font-heading uppercase tracking-widest text-indigo-400 hover:text-white transition-colors shrink-0">
                {copy.discord.cta} →
              </a>
            </div>

            {/* WhatsApp — compact row */}
            <div className="flex items-center justify-between gap-4 border border-club-blue/20 bg-club-gray px-4 py-3 hover:border-green-500/40 transition-colors">
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-500 shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                <span className="font-heading text-sm text-club-gray-light uppercase tracking-wide">{copy.whatsapp.title}</span>
              </div>
              <a href={communityContent.whatsapp.inviteUrl} target="_blank" rel="noopener noreferrer"
                className="text-xs font-heading uppercase tracking-widest text-green-500 hover:text-white transition-colors shrink-0">
                {copy.whatsapp.cta} →
              </a>
            </div>

            {/* Newsletter — compact row */}
            <div className="border border-club-blue/20 bg-club-gray px-4 py-3 hover:border-club-red/40 transition-colors">
              {status === "success" ? (
                <p className="font-heading text-club-red uppercase tracking-widest text-xs">{copy.newsletter.successMessage}</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-club-red shrink-0">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "pending"}
                    placeholder={copy.newsletter.placeholder}
                    className="flex-1 min-w-0 bg-club-black border border-club-blue/20 px-3 py-1.5 text-club-gray-light placeholder-club-gray-light/30 text-xs focus:outline-none focus:border-club-red transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "pending"}
                    className="px-3 py-1.5 bg-club-red text-white font-heading uppercase tracking-widest text-xs hover:bg-club-blue transition-colors disabled:opacity-50 shrink-0"
                  >
                    {status === "pending" ? "..." : status === "error" ? "Retry" : copy.newsletter.cta}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>

        {/* Socials & Booking — Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-between gap-12"
        >
          <div>
            <h3 className="font-heading text-3xl text-club-gray-light mb-6 uppercase tracking-widest">{connectCopy.connectHeading}</h3>
            <div className="flex flex-wrap gap-4 text-club-gray-light/80">
              {socialLinks.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.platform}
                  className="hover:text-club-red transition-colors flex items-center justify-center w-12 h-12 bg-club-gray border border-club-blue/10 hover:border-club-red shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={socialIconPaths[s.icon]} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-club-blue/20 pt-8">
            <h3 className="font-heading text-2xl text-club-gray-light mb-2 uppercase tracking-widest">{connectCopy.bookingHeading}</h3>
            <p className="text-club-gray-light/60 font-light mb-6">{connectCopy.bookingSubheading}</p>
            <a
              href="mailto:contact@aayushwho.me"
              className="inline-block px-8 py-4 border border-club-red text-club-red font-heading uppercase tracking-widest text-sm hover:bg-club-red hover:text-white transition-colors"
            >
              contact@aayushwho.me
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
