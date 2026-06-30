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
    const timers = [
      setTimeout(() => setPhase("envelope"), 2600),
      setTimeout(() => setPhase("opening"), 3600),
      setTimeout(() => setShowText(true), 5200),
      setTimeout(() => setPhase("text"), 5200),
      setTimeout(() => setFadeOut(true), 10000),
      setTimeout(() => {
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

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden cloud-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Floating gold particles */}
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

          <div className="relative flex w-full flex-col items-center justify-center px-4">
            {/* Phase 1 : soleil Teletubbies seul */}
            <AnimatePresence mode="wait">
              {phase === "sun" && (
                <motion.div
                  key="sun-only"
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <SunBaby isActive isOpening={false} size="large" />
                  <motion.p
                    className="mt-8 font-hebrew text-xl text-gold-dark/70 md:text-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    ב״ה
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 2+ : enveloppe qui s'ouvre */}
            {phase !== "sun" && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <EnvelopeOpen phase={envelopePhase} showSun={false} />

                <div className="mt-6 min-h-[260px] md:min-h-[300px]">
                  <InvitationLines visible={showText} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Indicateur défilement */}
          <motion.div
            className="absolute bottom-8 flex flex-col items-center gap-2 text-gold/50"
            animate={{ opacity: showText ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7" />
              </svg>
            </motion.div>
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
      const end = target.getBoundingClientRect().top + window.scrollY - 40;
      const distance = end - start;
      const duration = 2800;
      let startTime: number | null = null;

      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start + distance * eased);
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }, 500);
  };

  return { formRef, introDone, setIntroDone, scrollToForm };
}
