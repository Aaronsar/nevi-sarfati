"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RsvpForm } from "./rsvp-form";
import { SunHero } from "./intro/sun-hero";
import { InvitationScene } from "./intro/invitation-scene";
import { lockScroll, smoothScrollTo } from "@/lib/scroll-utils";

type Phase = "sun" | "invitation" | "form";

const SUN_DISPLAY_MS = 3500;

export default function InvitationPage() {
  const invitationRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("sun");
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    lockScroll(phase === "sun");
    return () => lockScroll(false);
  }, [phase]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("invitation");
      setShowText(true);
      lockScroll(false);
      smoothScrollTo(invitationRef.current, { duration: 1800, delay: 200 });
    }, SUN_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleCtaComplete = useCallback(() => {
    setPhase("form");
    smoothScrollTo(formRef.current, { duration: 2600, delay: 500, offset: -24 });
  }, []);

  return (
    <main className="relative">
      <section className="relative h-[100dvh] w-full shrink-0">
        <SunHero active={phase === "sun"} exiting={phase !== "sun"} />
      </section>

      <section ref={invitationRef} className="relative w-full shrink-0">
        <InvitationScene showText={showText} onCtaComplete={handleCtaComplete} />
      </section>

      <section ref={formRef} id="rsvp" className="tubby-land relative w-full shrink-0 px-5 py-16 md:px-8 md:py-24">
        <div className="tubby-sky absolute inset-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-md">
          <div className="mb-10 flex justify-center">
            <RsvpForm />
          </div>

          <div className="space-y-6 text-center">
            <div className="mx-auto flex justify-center gap-2">
              <span className="h-2 w-8 rounded-full bg-[#9b59b6]" />
              <span className="h-2 w-8 rounded-full bg-[#f5d020]" />
              <span className="h-2 w-8 rounded-full bg-[#3d6b35]" />
              <span className="h-2 w-8 rounded-full bg-[#e05090]" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-wider text-[#6b4c9a] uppercase">Lieu</p>
              <a
                href="https://maps.google.com/?q=10+rue+de+Groslay,+Montmorency,+95160"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex flex-col items-center gap-1 text-xl font-bold text-[#3d6b35] transition-colors hover:text-[#6b4c9a] md:text-2xl"
              >
                10 rue de Groslay
                <span>Montmorency, 95160</span>
              </a>
            </div>
          </div>

          <footer className="mt-16 pb-8 text-center text-sm font-medium text-[#6b4c9a]/60">
            <p>nevi-sarfati.fr · Big hug!</p>
          </footer>
        </div>
      </section>
    </main>
  );
}
