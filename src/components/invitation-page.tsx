"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import {
  StarOfDavid,
  OliveBranch,
  SynagogueSilhouette,
  TorahScroll,
} from "./decorations";
import { RsvpForm } from "./rsvp-form";
import { IntroSequence, useAutoScroll } from "./intro/intro-sequence";

export default function InvitationPage() {
  const { formRef, introDone, setIntroDone, scrollToForm } = useAutoScroll();
  const [showContent, setShowContent] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
    setShowContent(true);
  }, [setIntroDone]);

  return (
    <>
      {!introDone && (
        <IntroSequence
          onComplete={handleIntroComplete}
          onScrollToForm={scrollToForm}
        />
      )}

      <main
        className={`cloud-bg relative min-h-screen overflow-hidden transition-opacity duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <StarOfDavid className="absolute top-8 right-6 h-10 w-10 text-gold opacity-40 md:top-12 md:right-12 md:h-14 md:w-14" />
        <OliveBranch className="absolute bottom-32 left-0 h-20 w-32 opacity-40 md:h-28 md:w-44" />
        <OliveBranch className="absolute right-0 bottom-16 h-16 w-28 opacity-30 md:h-24 md:w-40" flip />
        <SynagogueSilhouette className="absolute top-32 right-4 h-28 w-24 opacity-30 md:top-40 md:right-16 md:h-40 md:w-32" />
        <TorahScroll className="absolute bottom-48 left-4 h-20 w-16 opacity-30 md:bottom-56 md:left-12 md:h-28 md:w-20" />

        <div className="relative z-10 mx-auto max-w-2xl px-5 py-16 md:px-8 md:py-24">
          {/* Spacer so auto-scroll lands nicely */}
          <div className="h-[30vh]" />

          {/* Hebrew accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-12 text-center"
          >
            <p className="font-hebrew text-lg tracking-widest text-gold-dark md:text-xl">ב״ה</p>
            <p className="mt-2 font-hebrew text-xl text-gold-dark md:text-2xl">אני לדודי ודודי לי</p>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-2 inline-block text-gold"
            >
              ♥
            </motion.span>
          </motion.div>

          {/* RSVP Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 60 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex justify-center"
            id="rsvp"
          >
            <RsvpForm />
          </motion.div>

          {/* Location details */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-14 space-y-6 text-center md:mt-20"
          >
            <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />

            <div>
              <p className="text-sm tracking-[0.25em] text-text-muted uppercase">Lieu</p>
              <a
                href="https://maps.google.com/?q=10+rue+de+Groslay,+Montmorency,+95160"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex flex-col items-center gap-1 text-xl font-semibold text-gold-dark transition-colors hover:text-gold md:text-2xl"
              >
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  10 rue de Groslay
                </span>
                <span>Montmorency, 95160</span>
              </a>
            </div>

            <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </motion.div>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ delay: 1.4 }}
            className="mt-16 pb-8 text-center text-sm text-text-muted"
          >
            <StarOfDavid className="mx-auto mb-3 h-6 w-6 text-gold opacity-40" />
            <p>nevi-sarfati.fr</p>
          </motion.footer>
        </div>
      </main>
    </>
  );
}
