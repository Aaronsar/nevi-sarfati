"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const spring = { type: "spring" as const, stiffness: 130, damping: 22 };

export function ThankYouScreen() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-5 py-16 text-center">
      <motion.div
        className="w-full max-w-sm overflow-hidden rounded-3xl border-4 border-white shadow-xl md:max-w-md"
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...spring, delay: 0.1 }}
      >
        <Image
          src="/images/nevitubbies.png"
          alt="Les Névitubbies"
          width={400}
          height={300}
          className="h-auto w-full"
          priority
        />
      </motion.div>

      <motion.p
        className="mt-8 max-w-md text-xl font-bold leading-snug text-[#6b4c9a] md:text-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.35 }}
      >
        Les <span className="text-[#e05090]">Névitubbies</span>, leurs enfants et leur
        petit-fils vous remercie&nbsp;!
      </motion.p>

      <motion.div
        className="mt-8 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {["#9b59b6", "#f5d020", "#3d6b35", "#e05090"].map((color) => (
          <span
            key={color}
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: color }}
          />
        ))}
      </motion.div>
    </div>
  );
}
