"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { communityContent, sectionCopy } from "@/data/content";

const copy = sectionCopy.community;

function DiscordIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

export default function Community() {
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
    <section id="community" className="relative w-full py-24 bg-club-black border-t border-club-blue/20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-4xl md:text-6xl text-club-gray-light">
            {copy.heading} <span className="text-club-red">{copy.headingAccent}</span>
          </h2>
          <p className="mt-4 text-xl font-light text-club-gray-light/60 max-w-xl">
            {copy.subheading}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">

          {/* Discord */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <div className="border border-club-blue/20 bg-club-gray p-8 h-full flex flex-col gap-5 hover:border-club-red/40 transition-colors group">
              <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
                <DiscordIcon />
              </span>
              <div className="flex-1">
                <h3 className="font-heading text-2xl text-club-gray-light">{copy.discord.title}</h3>
                <p className="mt-2 text-club-gray-light/60 font-light leading-relaxed text-sm">
                  {copy.discord.description}
                </p>
              </div>
              <a
                href={communityContent.discord.inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-indigo-400/50 text-indigo-400 font-heading uppercase tracking-widest text-xs hover:bg-indigo-400 hover:text-club-black transition-colors text-center"
              >
                {copy.discord.cta}
              </a>
            </div>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="border border-club-blue/20 bg-club-gray p-8 h-full flex flex-col gap-5 hover:border-club-red/40 transition-colors group">
              <span className="text-green-500 group-hover:text-green-400 transition-colors">
                <WhatsAppIcon />
              </span>
              <div className="flex-1">
                <h3 className="font-heading text-2xl text-club-gray-light">{copy.whatsapp.title}</h3>
                <p className="mt-2 text-club-gray-light/60 font-light leading-relaxed text-sm">
                  {copy.whatsapp.description}
                </p>
              </div>
              <a
                href={communityContent.whatsapp.inviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 border border-green-500/50 text-green-500 font-heading uppercase tracking-widest text-xs hover:bg-green-500 hover:text-club-black transition-colors text-center"
              >
                {copy.whatsapp.cta}
              </a>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="border border-club-blue/20 bg-club-gray p-8 h-full flex flex-col gap-5 hover:border-club-red/40 transition-colors">
              <span className="text-club-red">
                <MailIcon />
              </span>
              <div className="flex-1">
                <h3 className="font-heading text-2xl text-club-gray-light">{copy.newsletter.title}</h3>
                <p className="mt-2 text-club-gray-light/60 font-light leading-relaxed text-sm">
                  {copy.newsletter.description}
                </p>
              </div>

              {status === "success" ? (
                <p className="font-heading text-club-red uppercase tracking-widest text-sm">
                  {copy.newsletter.successMessage}
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "pending"}
                    placeholder={copy.newsletter.placeholder}
                    className="w-full bg-club-black border border-club-blue/20 px-4 py-3 text-club-gray-light placeholder-club-gray-light/30 text-sm focus:outline-none focus:border-club-red transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "pending"}
                    className="w-full px-6 py-3 bg-club-red text-white font-heading uppercase tracking-widest text-xs hover:bg-club-blue transition-colors disabled:opacity-50"
                  >
                    {status === "pending" ? "Sending..." : status === "error" ? "Try Again" : copy.newsletter.cta}
                  </button>
                  {status === "error" && (
                    <p className="text-xs text-club-red/80">{copy.newsletter.errorMessage}</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
