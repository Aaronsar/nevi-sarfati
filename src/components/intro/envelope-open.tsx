"use client";

import { motion } from "framer-motion";
import { SunBaby } from "./sun-baby";

type EnvelopePhase = "hidden" | "closed" | "opening" | "open";

type EnvelopeOpenProps = {
  phase: EnvelopePhase;
  showSun?: boolean;
};

export function EnvelopeOpen({ phase, showSun = true }: EnvelopeOpenProps) {
  if (phase === "hidden") return null;

  const isClosed = phase === "closed";
  const isOpening = phase === "opening";
  const isOpen = phase === "open";

  return (
    <div className="relative flex flex-col items-center" style={{ perspective: 1400 }}>
      {showSun && (
        <div className="relative z-20 mb-[-50px]">
          <SunBaby isActive={isClosed || isOpening} isOpening={isOpening || isOpen} />
        </div>
      )}

      <motion.div
        className="relative w-[min(360px,90vw)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Corps de l'enveloppe */}
        <div
          className="relative overflow-hidden rounded-b-xl"
          style={{
            height: 230,
            background: "linear-gradient(180deg, #f8f0dc 0%, #e8dcc4 100%)",
            boxShadow: "0 24px 64px rgba(154,123,26,0.22), inset 0 2px 0 rgba(255,255,255,0.7)",
          }}
        >
          {/* Lettre qui sort */}
          <motion.div
            className="absolute right-5 left-5 overflow-hidden rounded-t-lg bg-[#fffcf5]"
            initial={{ y: 80, height: 30 }}
            animate={
              isOpen
                ? { y: -200, height: 340 }
                : isOpening
                  ? { y: -20, height: 80 }
                  : { y: 80, height: 30 }
            }
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              boxShadow: "0 -8px 32px rgba(201,162,39,0.18)",
              border: "1px solid rgba(201,162,39,0.25)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          </motion.div>

          {/* Pli inférieur en V */}
          <div
            className="absolute right-0 bottom-0 left-0"
            style={{
              height: 120,
              background: "linear-gradient(180deg, transparent 0%, rgba(201,162,39,0.1) 100%)",
              clipPath: "polygon(0 100%, 50% 15%, 100% 100%)",
            }}
          />

          {/* Plis latéraux */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(135deg, rgba(154,123,26,0.06) 0%, transparent 50%), linear-gradient(225deg, rgba(154,123,26,0.06) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Rabat supérieur */}
        <motion.div
          className="absolute top-0 right-0 left-0"
          style={{ height: 140, transformOrigin: "top center", transformStyle: "preserve-3d", zIndex: 10 }}
          animate={{ rotateX: isOpen ? -170 : isOpening ? -130 : 0 }}
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
          {/* Sceau de cire */}
          <motion.div
            className="absolute top-[58%] left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, #ddb830, #9a7b1a)",
              boxShadow: "0 4px 12px rgba(154,123,26,0.4), inset 0 -2px 4px rgba(0,0,0,0.15)",
            }}
            animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.3 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-hebrew text-sm font-bold text-white/90">ב״ה</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
