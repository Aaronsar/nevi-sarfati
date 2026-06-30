"use client";

import { motion, type Variants } from "framer-motion";
import { NevitubbiesBlock } from "./nevitubbies-block";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.55, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const nameItem: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

type InvitationLinesProps = {
  visible: boolean;
  onConfirmClick?: () => void;
};

export function InvitationLines({ visible, onConfirmClick }: InvitationLinesProps) {
  if (!visible) return null;

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        variants={item}
        className="text-xl font-bold text-[#6b4c9a] md:text-2xl"
      >
        Aaron et Néorah Sarfati
      </motion.p>

      <motion.div variants={item}>
        <NevitubbiesBlock />
      </motion.div>

      <motion.p
        variants={item}
        className="mt-1 max-w-[280px] text-sm leading-relaxed font-medium text-[#3d6b35] md:max-w-sm md:text-base"
      >
        sont heureux de vous inviter au Pydion de leur fils et petit-fils
      </motion.p>

      <motion.p
        variants={nameItem}
        className="my-3 text-3xl font-extrabold leading-tight tubby-name-text md:text-5xl"
      >
        Névi Sarfati
      </motion.p>

      <motion.p
        variants={item}
        className="text-lg font-bold text-[#6b4c9a] md:text-xl"
      >
        le mercredi 8 juillet à 20h
      </motion.p>

      <motion.p
        variants={item}
        className="mt-2 text-sm font-semibold leading-snug text-[#3d6b35] md:text-base"
      >
        10 rue de Groslay
        <br />
        95160 Montmorency
      </motion.p>

      <motion.button
        type="button"
        variants={item}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onConfirmClick}
        className="mt-6 rounded-full bg-gradient-to-r from-[#9b59b6] via-[#e05090] to-[#9b59b6] px-8 py-3.5 text-base font-bold tracking-wide text-white shadow-lg shadow-[#9b59b6]/30 md:px-10 md:py-4 md:text-lg"
      >
        Confirmer ma présence
      </motion.button>

      <motion.div variants={item} className="mt-5 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#9b59b6]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#f5d020]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3d6b35]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e05090]" />
      </motion.div>
    </motion.div>
  );
}
