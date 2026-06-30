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
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{
        opacity: exiting ? 0 : active ? 1 : 0,
        scale: exiting ? 1.18 : 1,
      }}
      transition={{ duration: exiting ? 1.6 : 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ciel bleu — fond de l'image */}
      <div className="absolute inset-0 bg-[#5eb3e8]" />

      {/* Photo montage soleil + bébé */}
      <motion.div
        className="relative h-full w-full"
        animate={
          active && !exiting
            ? { scale: [1, 1.025, 1] }
            : {}
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/sun-baby.png"
          alt="Névi Baroukh Sarfati"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Rayons lumineux animés par-dessus */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute origin-bottom"
            style={{
              width: 2,
              height: "55vh",
              transform: `rotate(${(360 / 12) * i}deg)`,
              background: "linear-gradient(to top, transparent, rgba(255,220,100,0.12), transparent)",
            }}
          />
        ))}
      </motion.div>

      {/* Halo pulsant */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(255,240,150,0.25) 0%, transparent 45%)",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
