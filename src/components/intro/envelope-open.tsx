"use client";

import { motion } from "framer-motion";
import { SunBaby } from "./sun-baby";

type EnvelopePhase = "hidden" | "closed" | "opening" | "open";

type EnvelopeOpenProps = {
  phase: EnvelopePhase;
};

export function EnvelopeOpen({ phase }: EnvelopeOpenProps) {
  if (phase === "hidden") return null;

  const isClosed = phase === "closed";
  const isOpening = phase === "opening";
  const isOpen = phase === "open";

  return (
    <div className="mx-auto flex w-full max-w-[360px] flex-col items-center" style={{ perspective: 1400 }}>
      {/* Soleil / bébé au-dessus de l'enveloppe */}
      <motion.div
        className="relative z-20 -mb-12"
        initial={{ opacity: 0, y: -30, scale: 0.6 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <SunBaby isActive isOpening={isOpening || isOpen} size="normal" />
      </motion.div>

      {/* Enveloppe */}
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div
          className="relative overflow-hidden rounded-b-xl"
          style={{
            height: 220,
            background: "linear-gradient(180deg, #f8f0dc 0%, #e8dcc4 100%)",
            boxShadow: "0 24px 64px rgba(154,123,26,0.22), inset 0 2px 0 rgba(255,255,255,0.7)",
          }}
        >
          <motion.div
            className="absolute right-5 left-5 overflow-hidden rounded-t-lg bg-[#fffcf5]"
            initial={{ y: 70, height: 24 }}
            animate={
              isOpen
                ? { y: -190, height: 320 }
                : isOpening
                  ? { y: -10, height: 70 }
                  : { y: 70, height: 24 }
            }
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              boxShadow: "0 -8px 32px rgba(201,162,39,0.18)",
              border: "1px solid rgba(201,162,39,0.25)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          </motion.div>

          <div
            className="absolute right-0 bottom-0 left-0"
            style={{
              height: 110,
              clipPath: "polygon(0 100%, 50% 15%, 100% 100%)",
              background: "linear-gradient(180deg, transparent, rgba(201,162,39,0.1))",
            }}
          />
        </div>

        <motion.div
          className="envelope-flap absolute top-0 right-0 left-0"
          style={{ height: 130, transformOrigin: "top center", zIndex: 10 }}
          animate={{ rotateX: isOpen ? -168 : isOpening ? -125 : 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="h-full w-full"
            style={{
              background: "linear-gradient(180deg, #ede0c0 0%, #d9c8a0 100%)",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              boxShadow: "0 6px 24px rgba(154,123,26,0.12)",
            }}
          />
          <motion.div
            className="absolute top-[58%] left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #ddb830, #9a7b1a)",
              boxShadow: "0 4px 12px rgba(154,123,26,0.4)",
            }}
            animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.3 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-hebrew text-sm font-bold text-white/90">ב״ה</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
