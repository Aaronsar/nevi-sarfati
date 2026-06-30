"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type SunHeroProps = {
  active: boolean;
  exiting: boolean;
};

export function SunHero({ active, exiting }: SunHeroProps) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden bg-[#5eb3e8]"
      initial={{ opacity: 0 }}
      animate={{
        opacity: exiting ? 0 : active ? 1 : 0,
        scale: exiting ? 1.06 : 1,
      }}
      transition={{ duration: exiting ? 1.4 : 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Fond flou = même image, remplit l'écran sans bandes */}
      <Image
        src="/images/nevitubbies-hero.png"
        alt=""
        fill
        priority
        aria-hidden
        className="scale-110 object-cover object-center blur-2xl brightness-105"
        sizes="100vw"
      />

      {/* Image nette centrée */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={active && !exiting ? { scale: [1, 1.008, 1] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/nevitubbies-hero.png"
            alt="Névi et les Névitubbies"
            fill
            priority
            className="object-contain object-center"
            sizes="100vw"
          />
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 28%, rgba(255,240,150,0.12) 0%, transparent 45%)",
        }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
