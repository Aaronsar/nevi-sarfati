"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { InvitationLines } from "./invitation-lines";

type InvitationSceneProps = {
  showText: boolean;
  onCtaComplete?: () => void;
};

export function InvitationScene({ showText, onCtaComplete }: InvitationSceneProps) {
  return (
    <div className="tubby-land relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-3 py-10 md:px-6 md:py-16">
      {/* Collines Teletubbies */}
      <div className="tubby-hills absolute inset-0" />
      <div className="tubby-sky absolute inset-0" />

      {/* Fleurs */}
      {[10, 30, 70, 90].map((left, i) => (
        <motion.div
          key={left}
          className="absolute bottom-[18%] text-2xl md:text-3xl"
          style={{ left: `${left}%` }}
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity }}
        >
          🌼
        </motion.div>
      ))}

      {/* Carte invitation style Tubbytronic */}
      <motion.div
        className="relative z-10 w-full max-w-md md:max-w-lg"
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="tubby-card overflow-hidden rounded-3xl p-6 md:p-10">
          {/* Écran ventre Teletubbies en déco */}
          <div className="mx-auto mb-5 flex h-14 w-20 items-center justify-center rounded-lg border-4 border-gray-400 bg-gradient-to-b from-gray-100 to-gray-200 shadow-inner md:h-16 md:w-24">
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Image
                src="/images/sun-baby.png"
                alt="Névi"
                width={56}
                height={56}
                className="h-10 w-10 rounded-full object-cover md:h-12 md:w-12"
              />
            </motion.div>
          </div>

          <motion.p
            className="mb-4 text-center font-hebrew text-base text-[#6b4c9a]/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ב״ה
          </motion.p>

          <InvitationLines visible={showText} onCtaComplete={onCtaComplete} />

          <motion.p
            className="mt-5 text-center text-xs text-[#3d6b35]/70 md:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: showText ? 1 : 0 }}
            transition={{ delay: 6.5 }}
          >
            10 rue de Groslay · Montmorency
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
