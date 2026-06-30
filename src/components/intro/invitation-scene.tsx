"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { InvitationLines } from "./invitation-lines";

type InvitationSceneProps = {
  showText: boolean;
  onConfirmClick?: () => void;
};

export function InvitationScene({ showText, onConfirmClick }: InvitationSceneProps) {
  return (
    <div className="tubby-land relative flex min-h-[100dvh] items-start justify-center overflow-hidden px-3 pt-8 pb-12 md:items-center md:px-6 md:py-16">
      <div className="tubby-hills absolute inset-0" />
      <div className="tubby-sky absolute inset-0" />

      {[10, 30, 70, 90].map((left, i) => (
        <motion.div
          key={left}
          className="absolute bottom-[12%] text-xl md:text-2xl"
          style={{ left: `${left}%` }}
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity }}
        >
          🌼
        </motion.div>
      ))}

      <motion.div
        className="relative z-10 w-full max-w-sm md:max-w-md"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="tubby-card overflow-hidden rounded-3xl px-5 py-6 md:p-8">
          <div className="mx-auto mb-4 flex h-12 w-16 items-center justify-center rounded-lg border-[3px] border-gray-400 bg-gradient-to-b from-gray-100 to-gray-200 shadow-inner md:h-14 md:w-20">
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Image
                src="/images/sun-baby.png"
                alt="Névi"
                width={48}
                height={48}
                className="h-9 w-9 rounded-full object-cover md:h-10 md:w-10"
              />
            </motion.div>
          </div>

          <motion.p
            className="mb-3 text-center font-hebrew text-sm text-[#6b4c9a]/70 md:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: showText ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            ב״ה
          </motion.p>

          <InvitationLines visible={showText} onConfirmClick={onConfirmClick} />
        </div>
      </motion.div>
    </div>
  );
}
