"use client";

import { motion } from "framer-motion";

export function SunRays() {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative h-[500px] w-[500px] md:h-[700px] md:w-[700px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {rays.map((angle) => (
          <div
            key={angle}
            className="absolute top-1/2 left-1/2 h-1/2 w-1 origin-bottom animate-ray-pulse"
            style={{
              transform: `rotate(${angle}deg)`,
              background: `linear-gradient(to top, transparent, rgba(201, 162, 39, 0.15), rgba(232, 213, 163, 0.3))`,
              animationDelay: `${angle * 0.05}s`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function StarOfDavid({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <polygon points="50,5 95,75 5,75" fill="none" stroke="currentColor" strokeWidth="2" />
      <polygon points="50,95 95,25 5,25" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function DecorativeSun({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`${className} animate-shimmer`}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 80 80" className="h-full w-full">
        <circle cx="40" cy="40" r="14" fill="#c9a227" opacity="0.9" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="40"
            y1="40"
            x2={40 + 30 * Math.cos((i * Math.PI) / 4)}
            y2={40 + 30 * Math.sin((i * Math.PI) / 4)}
            stroke="#c9a227"
            strokeWidth="2"
            opacity="0.6"
          />
        ))}
      </svg>
    </motion.div>
  );
}

export function OliveBranch({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={`${className} ${flip ? "scale-x-[-1]" : ""}`}
      fill="none"
    >
      <path
        d="M10 60 Q40 30 110 20"
        stroke="#9a7b1a"
        strokeWidth="1.5"
        opacity="0.5"
      />
      {[20, 35, 50, 65, 80, 95].map((x, i) => (
        <ellipse
          key={i}
          cx={x}
          cy={55 - i * 4}
          rx="8"
          ry="4"
          fill="#c9a227"
          opacity="0.4"
          transform={`rotate(${-20 + i * 5}, ${x}, ${55 - i * 4})`}
        />
      ))}
    </svg>
  );
}

export function SynagogueSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} fill="none">
      <rect x="20" y="60" width="80" height="70" fill="#d4c4a8" opacity="0.3" />
      <path d="M10 60 L60 20 L110 60 Z" fill="#c9a227" opacity="0.25" />
      <circle cx="60" cy="18" r="8" fill="none" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
      <rect x="50" y="90" width="20" height="40" fill="#9a7b1a" opacity="0.2" />
      {[30, 50, 70, 90].map((x) => (
        <rect key={x} x={x} y="70" width="8" height="12" rx="4" fill="#c9a227" opacity="0.3" />
      ))}
    </svg>
  );
}

export function TorahScroll({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} fill="none">
      <ellipse cx="12" cy="40" rx="10" ry="30" fill="#d4c4a8" opacity="0.4" />
      <ellipse cx="48" cy="40" rx="10" ry="30" fill="#d4c4a8" opacity="0.4" />
      <rect x="12" y="10" width="36" height="60" fill="#f0e8d8" opacity="0.6" />
      <polygon points="30,25 35,35 25,35" fill="none" stroke="#c9a227" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}
