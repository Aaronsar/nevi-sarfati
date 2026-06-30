"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/** Durée du trajet de Noo-Noo (ms) — synchronise animation + callback */
export const NOO_NOO_DURATION_MS = 7000;

type NooNooTransitionProps = {
  active: boolean;
  onComplete?: () => void;
};

export function NooNooTransition({ active, onComplete }: NooNooTransitionProps) {
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => onComplete?.(), NOO_NOO_DURATION_MS);
    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (!active) return null;

  const glideDuration = NOO_NOO_DURATION_MS / 1000;

  return (
    <div className="absolute inset-0 z-30 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-[#5eb3e8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0.45, 0.7] }}
        transition={{ duration: glideDuration * 0.85, ease: "easeInOut" }}
      />

      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-yellow-300/80"
          style={{
            width: 6 + (i % 4) * 3,
            height: 6 + (i % 4) * 3,
            left: `${15 + i * 7}%`,
            top: `${20 + (i % 5) * 12}%`,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: [1, 1, 0],
            scale: [1, 0.4, 0],
            x: [0, 60 + i * 15, 160],
            y: [0, 30, 60],
          }}
          transition={{
            duration: glideDuration * 0.7,
            delay: 0.8 + i * 0.12,
            ease: "easeIn",
          }}
        />
      ))}

      <motion.div
        className="absolute bottom-[8%] z-40 w-[min(280px,55vw)] md:bottom-[10%] md:w-[340px]"
        initial={{ x: "-110vw", rotate: -2 }}
        animate={{ x: "110vw", rotate: [-2, 1.5, -1.5, 2, -1, 1.5] }}
        transition={{
          x: { duration: glideDuration, ease: [0.25, 0.1, 0.25, 1] },
          rotate: { duration: 1.2, repeat: Math.ceil(glideDuration / 1.2), ease: "easeInOut" },
        }}
      >
        <motion.div
          animate={{ y: [0, -5, 0, -3, 0] }}
          transition={{ duration: 1.1, repeat: Math.ceil(glideDuration / 1.1), ease: "easeInOut" }}
        >
          <Image
            src="/images/noo-noo.png"
            alt="Noo-Noo"
            width={340}
            height={400}
            className="h-auto w-full drop-shadow-2xl"
            priority
          />
        </motion.div>

        <motion.div
          className="absolute top-[38%] left-[55%] h-16 w-16 rounded-full border-2 border-white/40 md:h-20 md:w-20"
          animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 0.7, repeat: Math.ceil(glideDuration / 0.7) }}
        />
      </motion.div>

      <motion.p
        className="absolute bottom-[2%] left-1/2 z-50 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1 text-sm font-bold text-[#6b4c9a] shadow-lg md:text-base"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        Noo-Noo passe…
      </motion.p>
    </div>
  );
}
