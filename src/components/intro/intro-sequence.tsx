"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SunBaby } from "./sun-baby";
import { EnvelopeOpen } from "./envelope-open";
import { InvitationLines } from "./invitation-lines";

type IntroPhase = "sun" | "envelope" | "opening" | "text" | "done";

type IntroSequenceProps = {
  onComplete: () => void;
  onScrollToForm: () => void;
};

export function IntroSequence({ onComplete, onScrollToForm }: IntroSequenceProps) {
  const [phase, setPhase] = useState<IntroPhase>("sun");
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("envelope"), 2600),
      setTimeout(() => setPhase("opening"), 3800),
      setTimeout(() => {
        setPhase("text");
        setShowText(true);
      }, 5200),
      setTimeout(() => setFadeOut(true), 10000),
      setTimeout(() => {
        document.body.style.overflow = "";
        onComplete();
        onScrollToForm();
      }, 11000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete, onScrollToForm]);

  const envelopePhase =
    phase === "sun"
      ? "hidden"
      : phase === "envelope"
        ? "closed"
        : phase === "opening"
          ? "opening"
          : "open";

  const showSunOnly = phase === "sun";
  const showEnvelope = phase !== "sun";

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cloud-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="pointer-events-none absolute rounded-full bg-gold/25"
              style={{
                width: 3 + (i % 4),
                height: 3 + (i % 4),
                left: `${(i * 13 + 5) % 95}%`,
                top: `${(i * 19 + 3) % 90}%`,
              }}
              animate={{ y: [0, -40, 0], opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.15 }}
            />
          ))}

          <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-8">
            {/* Soleil Teletubbies — phase 1 */}
            <AnimatePresence mode="wait">
              {showSunOnly && (
                <motion.div
                  key="sun"
                  className="flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.7 } }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SunBaby isActive isOpening={false} size="large" />
                  <motion.p
                    className="mt-10 font-hebrew text-2xl text-gold-dark/60"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    ב״ה
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enveloppe + texte — phases 2 à 4 */}
            {showEnvelope && (
              <motion.div
                className="flex w-full max-w-lg flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <EnvelopeOpen phase={envelopePhase} />

                <div className="mt-10 w-full">
                  <InvitationLines visible={showText} />
                </div>
              </motion.div>
            )}
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/40"
            animate={{ opacity: showText ? 1 : 0, y: showText ? [0, 8, 0] : 0 }}
            transition={{ y: { duration: 1.8, repeat: Infinity } }}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useAutoScroll() {
  const formRef = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);

  const scrollToForm = () => {
    const target = formRef.current;
    if (!target) return;

    setTimeout(() => {
      const start = window.scrollY;
      const end = target.getBoundingClientRect().top + window.scrollY - 32;
      const distance = end - start;
      const duration = 2800;
      let startTime: number | null = null;

      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start + distance * eased);
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }, 500);
  };

  return { formRef, introDone, setIntroDone, scrollToForm };
}
