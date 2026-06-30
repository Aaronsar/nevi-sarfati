"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { StarOfDavid } from "./decorations";
import { RsvpForm } from "./rsvp-form";
import { SunHero } from "./intro/sun-hero";
import { BloomEffect } from "./intro/bloom-effect";
import { InvitationScene } from "./intro/invitation-scene";
import { lockScroll, smoothScrollTo } from "@/lib/scroll-utils";

type Phase = "sun" | "bloom" | "invitation" | "form";

export default function InvitationPage() {
  const invitationRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("sun");
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    lockScroll(phase === "sun" || phase === "bloom");
    return () => lockScroll(false);
  }, [phase]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("bloom"), 3500),
      setTimeout(() => {
        setPhase("invitation");
        setShowText(true);
        lockScroll(false);
        smoothScrollTo(invitationRef.current, { duration: 2200, delay: 200 });
      }, 4800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleCtaComplete = useCallback(() => {
    setPhase("form");
    smoothScrollTo(formRef.current, { duration: 2600, delay: 600, offset: -24 });
  }, []);

  return (
    <main className="relative">
      {/* Section 1 — Soleil Teletubbies */}
      <section className="relative h-[100dvh] w-full shrink-0">
        <SunHero active={phase === "sun" || phase === "bloom"} exiting={phase !== "sun"} />
        <AnimatePresence>{phase === "bloom" && <BloomEffect />}</AnimatePresence>
      </section>

      {/* Section 2 — Carte d'invitation */}
      <section ref={invitationRef} className="relative w-full shrink-0">
        <InvitationScene showText={showText} onCtaComplete={handleCtaComplete} />
      </section>

      {/* Section 3 — Formulaire (même page, scroll naturel) */}
      <section
        ref={formRef}
        id="rsvp"
        className="invitation-warm-bg relative w-full shrink-0 px-5 py-16 md:px-8 md:py-24"
      >
        <div className="relative z-10 mx-auto max-w-md">
          <div className="mb-10 flex justify-center">
            <RsvpForm />
          </div>

          <div className="space-y-6 text-center">
            <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div>
              <p className="text-sm tracking-[0.25em] text-gold-dark/70 uppercase">Lieu</p>
              <a
                href="https://maps.google.com/?q=10+rue+de+Groslay,+Montmorency,+95160"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex flex-col items-center gap-1 text-xl font-semibold text-gold-dark transition-colors hover:text-gold md:text-2xl"
              >
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  10 rue de Groslay
                </span>
                <span>Montmorency, 95160</span>
              </a>
            </div>
            <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <footer className="mt-16 pb-8 text-center text-sm text-gold-dark/50">
            <StarOfDavid className="mx-auto mb-3 h-6 w-6 text-gold opacity-40" />
            <p>nevi-sarfati.fr</p>
          </footer>
        </div>
      </section>
    </main>
  );
}
