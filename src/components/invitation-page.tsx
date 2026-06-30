"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RsvpForm } from "./rsvp-form";
import { SunHero } from "./intro/sun-hero";
import { InvitationScene } from "./intro/invitation-scene";
import { ThankYouScreen } from "./thank-you-screen";
import { lockScroll, smoothScrollTo } from "@/lib/scroll-utils";

type Phase = "sun" | "invitation" | "form" | "thanks";

const HERO_MS = 3000;
const SCROLL_MS = 500;
const PAUSE_MS = 500;
const TEXT_START_MS = HERO_MS + SCROLL_MS + PAUSE_MS;
const FORM_SCROLL_MS = 500;

export default function InvitationPage() {
  const invitationRef = useRef<HTMLElement>(null);
  const invitationCardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const thanksRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("sun");
  const [showText, setShowText] = useState(false);
  const [formRevealed, setFormRevealed] = useState(false);

  useEffect(() => {
    lockScroll(phase === "sun");
    return () => lockScroll(false);
  }, [phase]);

  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      setPhase("invitation");
      lockScroll(false);
      smoothScrollTo(invitationCardRef.current ?? invitationRef.current, {
        duration: SCROLL_MS,
        delay: 0,
        offset: -24,
      });
    }, HERO_MS);

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, TEXT_START_MS);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(textTimer);
    };
  }, []);

  // Afficher le formulaire si l'utilisateur scrolle jusqu'à la section RSVP
  useEffect(() => {
    if (formRevealed || phase === "thanks" || phase === "sun") return;

    const el = formContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setFormRevealed(true);
          setPhase((p) => (p === "thanks" ? p : "form"));
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [formRevealed, phase]);

  const handleConfirmClick = useCallback(() => {
    setFormRevealed(true);
    setPhase("form");
    smoothScrollTo(formRef.current, { duration: FORM_SCROLL_MS, delay: 0, offset: -16 });
  }, []);

  const handleRsvpSuccess = useCallback(() => {
    setPhase("thanks");
    smoothScrollTo(thanksRef.current, { duration: FORM_SCROLL_MS, delay: 0 });
  }, []);

  return (
    <main className="relative">
      <section className="relative h-[100dvh] w-full shrink-0">
        <SunHero active={phase === "sun"} exiting={phase !== "sun"} />
      </section>

      <section ref={invitationRef} className="relative w-full shrink-0">
        <InvitationScene
          revealed={phase !== "sun"}
          showText={showText}
          cardRef={invitationCardRef}
          onConfirmClick={handleConfirmClick}
        />
      </section>

      <section ref={formRef} id="rsvp" className="tubby-land relative w-full shrink-0 px-5 py-16 md:px-8 md:py-24">
        <div className="tubby-sky absolute inset-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-md">
          <div ref={formContainerRef} className="mb-10 flex justify-center">
            <RsvpForm visible={formRevealed} onSuccess={handleRsvpSuccess} />
          </div>

          {phase !== "thanks" && (
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
          )}

          <footer className="mt-16 pb-8 text-center text-sm font-medium text-[#6b4c9a]/60">
            <p>nevi-sarfati.fr · Big hug!</p>
          </footer>
        </div>
      </section>

      <section ref={thanksRef} className="tubby-land relative w-full shrink-0">
        <div className="tubby-hills absolute inset-0" />
        <div className="tubby-sky absolute inset-0" />
        <div className="relative z-10">
          <ThankYouScreen />
        </div>
      </section>
    </main>
  );
}
