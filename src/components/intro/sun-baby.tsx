"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type SunBabyProps = {
  isActive: boolean;
  isOpening?: boolean;
  size?: "large" | "normal";
};

export function SunBaby({ isActive, isOpening = false, size = "normal" }: SunBabyProps) {
  const rayCount = 16;
  const isLarge = size === "large";
  const sunSize = isLarge ? 380 : 280;
  const faceSize = isLarge ? 200 : 160;
  const rayHeight = isLarge ? 180 : 140;

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ scale: 0.2, opacity: 0 }}
      animate={
        isOpening
          ? { scale: 0.75, opacity: 0.5, y: -10 }
          : isActive
            ? { scale: 1, opacity: 1, y: 0 }
            : { scale: 0.6, opacity: 0 }
      }
      transition={{ duration: isOpening ? 1 : 1.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Rotating rays */}
      <motion.div
        className="absolute"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        style={{ width: sunSize, height: sunSize }}
      >
        {Array.from({ length: rayCount }).map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 origin-bottom"
            style={{
              width: isLarge ? 4 : 3,
              height: rayHeight,
              transform: `rotate(${(360 / rayCount) * i}deg) translateY(-50%)`,
              background: `linear-gradient(to top, transparent, rgba(201,162,39,0.4), rgba(232,213,163,0.75))`,
            }}
          />
        ))}
      </motion.div>

      {/* Glow halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: sunSize * 0.85,
          height: sunSize * 0.85,
          background:
            "radial-gradient(circle, rgba(245,230,184,0.7) 0%, rgba(201,162,39,0.35) 45%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Jagged sun SVG */}
      <svg
        viewBox="0 0 200 200"
        className="absolute"
        style={{
          width: sunSize,
          height: sunSize,
          filter: "drop-shadow(0 0 40px rgba(201,162,39,0.55))",
        }}
      >
        <motion.path
          d={buildSunPath(200, 200, 68, 98, 32)}
          fill="url(#sunGrad)"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "100px 100px" }}
        />
        <defs>
          <radialGradient id="sunGrad" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#fff8e7" />
            <stop offset="45%" stopColor="#f0dfa0" />
            <stop offset="80%" stopColor="#e8c860" />
            <stop offset="100%" stopColor="#c9a227" />
          </radialGradient>
        </defs>
      </svg>

      {/* Baby face */}
      <motion.div
        className="relative z-10 overflow-hidden rounded-full border-[5px] border-white/60 shadow-2xl"
        style={{ width: faceSize, height: faceSize }}
        animate={isActive && !isOpening ? { y: [0, -8, 0] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/images/baby.png"
          alt="Névi Baroukh Sarfati"
          width={faceSize}
          height={faceSize}
          priority
          className="h-full w-full object-cover object-[center_12%]"
          style={{ transform: "scale(1.35)" }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-amber-200/30 via-transparent to-amber-400/20" />
      </motion.div>
    </motion.div>
  );
}

function buildSunPath(cx: number, cy: number, innerR: number, outerR: number, points: number) {
  const coords: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI / points) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    coords.push(`${i === 0 ? "M" : "L"} ${cx + r * Math.cos(angle)} ${cy + r * Math.sin(angle)}`);
  }
  return coords.join(" ") + " Z";
}
