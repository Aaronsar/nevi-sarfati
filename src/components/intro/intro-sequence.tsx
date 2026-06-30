"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SunHero } from "./sun-hero";
import { InvitationLines } from "./invitation-lines";

type Phase = "sun" | "bloom" | "text" | "exit";

type IntroSequenceProps = {
  onComplete: () => void;
  onScrollToForm: () => void;
};

export function IntroSequence({ onComplete, onScrollToForm }: IntroSequenceProps) {
  const [phase, setPhase] = useState<Phase>("sun");
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("bloom"), 3500),
      setTimeout(() => {
        setPhase("text");
        setShowText(true);
      }, 4800),
      setTimeout(() => setPhase("exit"), 11500),
      setTimeout(() => {
        document.body.style.overflow = "";
        onComplete();
        onScrollToForm();
      }, 12800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete, onScrollToForm]);

  const showBloom = phase === "bloom";
  const showInvitation = phase === "text" || phase === "exit";

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      animate={{ opacity: phase === "exit" ? 0 : 1 }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <SunHero active={phase === "sun" || phase === "bloom"} exiting={phase !== "sun"} />

      <AnimatePresence>
        {showBloom && phase === "bloom" && (
          <motion.div
            key="bloom"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="rounded-full"
              style={{
                width: "30vmax",
                height: "30vmax",
                background:
                  "radial-gradient(circle, rgba(255,248,220,0.95) 0%, rgba(232,213,163,0.7) 35%, rgba(201,162,39,0.25) 60%, transparent 70%)",
              }}
              initial={{ scale: 0.15, opacity: 0 }}
              animate={{ scale: 5.5, opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showInvitation && (
          <motion.div
            key="invitation"
            className="cloud-bg absolute inset-0 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative mb-8 overflow-hidden rounded-full shadow-xl shadow-gold/30"
              style={{ width: 80, height: 80 }}
              initial={{ opacity: 0, scale: 0, y: -30 }}
              animate={{ opacity: 0.9, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <Image
                src="/images/sun-baby.png"
                alt=""
                fill
                className="object-cover object-center scale-125"
                sizes="80px"
              />
            </motion.div>

            <motion.p
              className="mb-8 font-hebrew text-xl text-gold-dark/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ב״ה
            </motion.p>

            <InvitationLines visible={showText} />

            <motion.div
              className="absolute bottom-10 text-gold/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{
                opacity: { delay: 5 },
                y: { duration: 1.8, repeat: Infinity, delay: 5 },
              }}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
      const end = target.getBoundingClientRect().top + window.scrollY - 24;
      const distance = end - start;
      const duration = 3000;
      let startTime: number | null = null;

      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start + distance * eased);
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }, 600);
  };

  return { formRef, introDone, setIntroDone, scrollToForm };
}
