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
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#5eb3e8]"
      initial={{ opacity: 0 }}
      animate={{
        opacity: exiting ? 0 : active ? 1 : 0,
        scale: exiting ? 1.08 : 1,
      }}
      transition={{ duration: exiting ? 1.4 : 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image complète : soleil Névi + Névitubbies */}
      <motion.div
        className="relative h-full w-full"
        animate={active && !exiting ? { scale: [1, 1.012, 1] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/nevitubbies-hero.png"
          alt="Névi et les Névitubbies"
          fill
          priority
          className="object-contain object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Légère lueur sur le soleil */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 28%, rgba(255,240,150,0.15) 0%, transparent 40%)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
