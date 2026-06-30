"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type NevitubbiesBlockProps = {
  delay?: number;
};

export function NevitubbiesBlock({ delay = 1.1 }: NevitubbiesBlockProps) {
  return (
    <motion.div
      className="relative my-4 w-full max-w-xs md:max-w-sm"
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="mb-3 text-center text-lg font-bold text-[#6b4c9a] md:text-xl">
        et les <span className="text-[#e05090]">Névitubbies</span>
      </p>

      <div className="relative mx-auto">
        <div className="overflow-hidden rounded-2xl border-4 border-white shadow-xl">
          <Image
            src="/images/nevitubbies.png"
            alt="Les Névitubbies"
            width={400}
            height={300}
            className="h-auto w-full"
          />
        </div>

        {/* Flèche + "eux" */}
        <motion.div
          className="absolute -right-2 -bottom-2 flex flex-col items-center md:-right-6 md:-bottom-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.6, duration: 0.7 }}
        >
          <span className="mb-1 rounded-full bg-[#e05090] px-3 py-0.5 text-sm font-bold text-white shadow-md md:text-base">
            eux
          </span>
          <svg
            viewBox="0 0 80 60"
            className="h-12 w-16 text-[#e05090] md:h-14 md:w-20"
            fill="none"
          >
            <path
              d="M75 10 C40 15, 20 30, 5 50"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              markerEnd="url(#arrowhead)"
            />
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" fill="#e05090" />
              </marker>
            </defs>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
