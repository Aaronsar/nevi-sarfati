"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormState = "idle" | "loading" | "error";

type RsvpFormProps = {
  onSuccess?: () => void;
  visible?: boolean;
};

export function RsvpForm({ onSuccess, visible = false }: RsvpFormProps) {
  const [famille, setFamille] = useState("");
  const [present, setPresent] = useState<"oui" | "non" | "">("");
  const [nombrePersonnes, setNombrePersonnes] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          famille,
          present,
          nombrePersonnes: present === "oui" ? Number(nombrePersonnes) : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error ?? "Une erreur est survenue");
        setFormState("error");
        return;
      }

      onSuccess?.();
    } catch {
      setErrorMessage("Impossible d'envoyer votre réponse. Veuillez réessayer.");
      setFormState("error");
    }
  }

  return (
    <motion.form
      initial={false}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={!visible}
      className={`tubby-form w-full max-w-md rounded-3xl p-6 md:p-8 ${visible ? "" : "pointer-events-none"}`}
      onSubmit={handleSubmit}
    >
      <h3 className="mb-6 text-center text-xl font-bold text-[#6b4c9a] md:text-2xl">
        Votre réponse
      </h3>

      <div className="space-y-5">
        <div>
          <label htmlFor="famille" className="mb-1.5 block text-sm font-medium tracking-wider text-text-muted uppercase">
            Famille
          </label>
          <input
            id="famille"
            type="text"
            required
            value={famille}
            onChange={(e) => setFamille(e.target.value)}
            placeholder="Votre nom de famille"
            className="w-full rounded-xl border-2 border-[#e8d5f5] bg-white px-4 py-3 text-lg text-[#3d3428] outline-none focus:border-[#9b59b6] focus:ring-2 focus:ring-[#9b59b6]/20"
          />
        </div>

        <fieldset>
          <legend className="mb-3 block text-sm font-medium tracking-wider text-text-muted uppercase">
            Présent
          </legend>
          <div className="flex gap-4">
            {(["oui", "non"] as const).map((option) => (
              <label
                key={option}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-lg font-bold transition-all ${
                  present === option
                    ? "border-[#9b59b6] bg-[#9b59b6]/10 text-[#6b4c9a]"
                    : "border-[#e8d5f5] bg-white text-[#6b4c9a]/60 hover:border-[#9b59b6]/40"
                }`}
              >
                <input
                  type="radio"
                  name="present"
                  value={option}
                  checked={present === option}
                  onChange={() => setPresent(option)}
                  className="sr-only"
                  required
                />
                {option === "oui" ? "Oui" : "Non"}
              </label>
            ))}
          </div>
        </fieldset>

        <AnimatePresence>
          {present === "oui" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label
                htmlFor="nombre"
                className="mb-1.5 block text-sm font-medium tracking-wider text-text-muted uppercase"
              >
                Nombre de personnes
              </label>
              <input
                id="nombre"
                type="number"
                min={1}
                max={20}
                required
                value={nombrePersonnes}
                onChange={(e) => setNombrePersonnes(e.target.value)}
                placeholder="Ex : 2"
                className="w-full rounded-xl border-2 border-[#e8d5f5] bg-white px-4 py-3 text-lg text-[#3d3428] outline-none focus:border-[#9b59b6] focus:ring-2 focus:ring-[#9b59b6]/20"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {formState === "error" && errorMessage && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-red-600"
          >
            {errorMessage}
          </motion.p>
        )}

        <motion.button
          type="submit"
          disabled={formState === "loading"}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-xl bg-gradient-to-r from-[#9b59b6] via-[#e05090] to-[#9b59b6] px-6 py-3.5 text-lg font-bold text-white shadow-lg transition-opacity disabled:opacity-60"
        >
          {formState === "loading" ? "Envoi en cours..." : "Envoyer ma réponse"}
        </motion.button>
      </div>
    </motion.form>
  );
}
