"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  DecorativeSun,
  StarOfDavid,
  OliveBranch,
  SynagogueSilhouette,
  TorahScroll,
  SunRays,
} from "../decorations";
import { InvitationLines } from "./invitation-lines";

type InvitationSceneProps = {
  showText: boolean;
  onCtaComplete?: () => void;
};

export function InvitationScene({ showText, onCtaComplete }: InvitationSceneProps) {
  return (
    <div className="invitation-scene relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-3 py-10 md:px-6 md:py-16">
      {/* Fond chaleureux animé */}
      <div className="invitation-warm-bg absolute inset-0" />
      <SunRays />

      {/* Particules dorées */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-gold/30"
          style={{
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            left: `${(i * 11 + 8) % 92}%`,
            top: `${(i * 17 + 5) % 88}%`,
          }}
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 3.5 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      {/* Décorations autour */}
      <DecorativeSun className="absolute top-[8%] left-[6%] h-14 w-14 opacity-70 md:top-[10%] md:left-[10%] md:h-20 md:w-20" />
      <StarOfDavid className="absolute top-[8%] right-[6%] h-10 w-10 text-gold opacity-60 md:top-[10%] md:right-[10%] md:h-14 md:w-14" />
      <OliveBranch className="absolute bottom-[12%] left-0 h-16 w-28 opacity-55 md:h-24 md:w-40" />
      <OliveBranch className="absolute right-0 bottom-[8%] h-14 w-24 opacity-45 md:h-20 md:w-36" flip />
      <SynagogueSilhouette className="absolute top-[22%] right-[4%] h-24 w-20 opacity-45 md:top-[18%] md:right-[8%] md:h-32 md:w-28" />
      <TorahScroll className="absolute bottom-[18%] left-[4%] h-20 w-14 opacity-45 md:bottom-[20%] md:left-[8%] md:h-28 md:w-20" />

      {/* Carte d'invitation */}
      <motion.div
        className="invitation-card relative z-10 w-full max-w-md md:max-w-lg"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Cadre doré extérieur */}
        <div className="invitation-frame rounded-2xl p-[3px] md:rounded-3xl md:p-1">
          <div className="invitation-inner relative overflow-hidden rounded-[14px] px-5 py-7 md:rounded-[22px] md:px-10 md:py-10">
            {/* Texture papier */}
            <div className="invitation-paper-texture pointer-events-none absolute inset-0" />

            {/* En-tête hébreu */}
            <motion.div
              className="relative text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p className="font-hebrew text-lg tracking-widest text-gold-dark md:text-xl">ב״ה</p>
              <p className="mt-2 font-hebrew text-base text-gold md:text-lg">אני לדודי ודודי לי</p>
              <motion.span
                className="mt-1 inline-block text-lg text-gold"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ♥
              </motion.span>
            </motion.div>

            {/* Photo bébé ovale */}
            <motion.div
              className="relative mx-auto my-5 flex justify-center md:my-7"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-[50%] bg-gold/20 blur-md" />
                <div className="relative overflow-hidden rounded-[50%] border-[3px] border-gold-light shadow-lg shadow-gold/25"
                  style={{ width: 100, height: 130 }}
                >
                  <Image
                    src="/images/baby.png"
                    alt="Névi Baroukh Sarfati"
                    fill
                    className="object-cover object-top"
                    sizes="100px"
                  />
                </div>
              </div>
            </motion.div>

            {/* Ornement */}
            <motion.div
              className="mx-auto mb-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent md:mb-5 md:w-28"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />

            {/* Texte d'invitation */}
            <InvitationLines visible={showText} onCtaComplete={onCtaComplete} />

            {/* Adresse discrète */}
            <motion.p
              className="relative mt-6 text-center text-xs tracking-wider text-gold-dark/60 md:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: showText ? 1 : 0 }}
              transition={{ delay: 5.8, duration: 0.8 }}
            >
              10 rue de Groslay · Montmorency
            </motion.p>
          </div>
        </div>

        {/* Coins décoratifs */}
        <StarOfDavid className="absolute -top-3 -right-3 h-7 w-7 text-gold/50 md:h-9 md:w-9" />
        <StarOfDavid className="absolute -bottom-3 -left-3 h-7 w-7 text-gold/50 md:h-9 md:w-9" />
      </motion.div>
    </div>
  );
}
