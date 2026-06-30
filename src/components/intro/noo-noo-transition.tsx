"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type NooNooTransitionProps = {
  active: boolean;
  onComplete?: () => void;
};

export function NooNooTransition({ active, onComplete }: NooNooTransitionProps) {
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => onComplete?.(), 3400);
    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 z-30 overflow-hidden">
      {/* Effet d'aspiration sur le soleil */}
      <motion.div
        className="absolute inset-0 bg-[#5eb3e8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0.6, 1] }}
        transition={{ duration: 2.8, times: [0, 0.3, 0.6, 1] }}
      />

      {/* Particules aspirées */}
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
            scale: [1, 0.3, 0],
            x: [0, 80 + i * 20, 200],
            y: [0, 40, 80],
          }}
          transition={{ duration: 2.2, delay: 0.4 + i * 0.08, ease: "easeIn" }}
        />
      ))}

      {/* Noo-Noo qui glisse */}
      <motion.div
        className="absolute bottom-[8%] z-40 w-[min(280px,55vw)] md:bottom-[10%] md:w-[340px]"
        initial={{ x: "-110vw", rotate: -3 }}
        animate={{ x: "110vw", rotate: [ -3, 2, -2, 3 ] }}
        transition={{
          x: { duration: 3.2, ease: [0.35, 0, 0.2, 1] },
          rotate: { duration: 0.6, repeat: 5, ease: "easeInOut" },
        }}
      >
        <motion.div
          animate={{ y: [0, -6, 0, -4, 0] }}
          transition={{ duration: 0.5, repeat: 6, ease: "easeInOut" }}
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

        {/* Onde d'aspiration devant le tuyau */}
        <motion.div
          className="absolute top-[38%] left-[55%] h-16 w-16 rounded-full border-2 border-white/40 md:h-20 md:w-20"
          animate={{ scale: [0.5, 1.2, 0.5], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 0.4, repeat: 8 }}
        />
      </motion.div>

      {/* Label fun */}
      <motion.p
        className="absolute bottom-[2%] left-1/2 z-50 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1 text-sm font-bold text-[#6b4c9a] shadow-lg md:text-base"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Noo-Noo passe…
      </motion.p>
    </div>
  );
}
