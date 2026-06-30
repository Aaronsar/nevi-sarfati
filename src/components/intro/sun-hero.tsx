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
        scale: exiting ? 1.04 : 1,
      }}
      transition={{ duration: exiting ? 1.4 : 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={active && !exiting ? { scale: [1, 1.006, 1] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Mobile — 9:16 */}
        <Image
          src="/images/nevitubbies-hero-mobile.png"
          alt="Névi et les Névitubbies"
          fill
          priority
          className="object-cover object-center md:hidden"
          sizes="100vw"
        />
        {/* Desktop — 16:9 */}
        <Image
          src="/images/nevitubbies-hero-desktop.png"
          alt="Névi et les Névitubbies"
          fill
          priority
          className="hidden object-cover object-center md:block"
          sizes="100vw"
        />
      </motion.div>

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
