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
          {/* Soleil Névi — grand */}
          <motion.div
            className="relative mx-auto mb-5 flex h-[140px] w-[140px] items-center justify-center md:mb-6 md:h-[170px] md:w-[170px]"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 origin-bottom"
                  style={{
                    width: 3,
                    height: 72,
                    transform: `rotate(${(360 / 12) * i}deg) translateY(-50%)`,
                    background:
                      "linear-gradient(to top, transparent, rgba(245,208,32,0.5), rgba(255,230,100,0.8))",
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-br from-[#ffe566] via-[#f5d020] to-[#e8a020]"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ boxShadow: "0 0 40px rgba(245,208,32,0.5)" }}
            />

            <div className="relative z-10 h-[88px] w-[88px] overflow-hidden rounded-full border-[3px] border-white/80 shadow-lg md:h-[108px] md:w-[108px]">
              <Image
                src="/images/sun-baby.png"
                alt="Névi"
                fill
                className="object-cover object-center scale-110"
                sizes="108px"
              />
            </div>
          </motion.div>

          <InvitationLines visible={showText} onConfirmClick={onConfirmClick} />
        </div>
      </motion.div>
    </div>
  );
}
