"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { communityContent, sectionCopy } from "@/data/content";

const copy = sectionCopy.community;

export default function InnerCircleBar() {
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
    <section className="w-full bg-club-gray border-y border-club-blue/20">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10"
      >
        {/* Headline */}
        <div className="shrink-0">
          <p className="font-heading text-xl md:text-2xl text-club-gray-light uppercase tracking-wide leading-tight">
            Never Miss<br className="md:hidden" /> <span className="text-club-red">a Show.</span>
          </p>
          <p className="text-xs text-club-gray-light/50 font-light mt-1 hidden md:block">
            Show dates and exclusives — before the general public.
          </p>
        </div>

        {/* Divider (desktop only) */}
        <div className="hidden md:block w-px h-10 bg-club-blue/20 shrink-0" />

        {/* CTAs — two rows on mobile: [Discord | WhatsApp] then [email form]; single row on desktop */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 flex-1">

          {/* Row 1: Discord + WhatsApp */}
          <div className="flex gap-3">
            <a
              href={communityContent.discord.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-indigo-400/40 text-indigo-400 font-heading uppercase tracking-widest text-xs hover:bg-indigo-400 hover:text-club-black transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join The Server
            </a>
            <a
              href={communityContent.whatsapp.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-green-500/40 text-green-500 font-heading uppercase tracking-widest text-xs hover:bg-green-500 hover:text-club-black transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Join Whatsapp List
            </a>
          </div>

          {/* Row 2: Email — full width */}
          {status === "success" ? (
            <span className="font-heading text-club-red uppercase tracking-widest text-xs">{copy.newsletter.successMessage}</span>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto md:max-w-xs">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "pending"}
                placeholder="your@email.com"
                className="flex-1 min-w-0 bg-club-black border border-club-blue/20 px-3 py-2 text-club-gray-light placeholder-club-gray-light/30 text-xs focus:outline-none focus:border-club-red transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "pending"}
                className="px-4 py-2 bg-club-red text-white font-heading uppercase tracking-widest text-xs hover:bg-club-blue transition-colors disabled:opacity-50 shrink-0"
              >
                {status === "pending" ? "..." : "Notify Me"}
              </button>
            </form>
          )}

        </div>
      </motion.div>
    </section>
  );
}
