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
      }}
      transition={{ duration: exiting ? 0.5 : 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Mobile — 9:16 */}
      <motion.div
        className="relative h-full w-full md:hidden"
        animate={active && !exiting ? { scale: [1, 1.006, 1] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/nevitubbies-hero-mobile.png"
          alt="Névi et les Névitubbies"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Desktop — 16:9 plein écran */}
      <motion.div
        className="absolute inset-0 hidden bg-[#5eb3e8] bg-cover bg-center md:block"
        style={{ backgroundImage: "url(/images/nevitubbies-hero-desktop.png)" }}
        animate={active && !exiting ? { scale: [1, 1.008, 1] } : { scale: 1 }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 22%, rgba(255,240,150,0.1) 0%, transparent 40%)",
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
