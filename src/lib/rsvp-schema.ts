import { z } from "zod";

export const rsvpSchema = z
  .object({
    famille: z
      .string()
      .trim()
      .min(2, "Veuillez indiquer votre nom de famille")
      .max(100, "Nom de famille trop long"),
    present: z.enum(["oui", "non"], {
      message: "Veuillez indiquer si vous serez présents",
    }),
    nombrePersonnes: z.coerce.number().int().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.present === "oui") {
      if (data.nombrePersonnes === undefined || Number.isNaN(data.nombrePersonnes)) {
        ctx.addIssue({
          code: "custom",
          message: "Veuillez indiquer le nombre de personnes",
          path: ["nombrePersonnes"],
        });
        return;
      }
      if (data.nombrePersonnes < 1 || data.nombrePersonnes > 20) {
        ctx.addIssue({
          code: "custom",
          message: "Le nombre de personnes doit être entre 1 et 20",
          path: ["nombrePersonnes"],
        });
      }
    }
  });

export type RsvpInput = z.infer<typeof rsvpSchema>;

export type RsvpEntry = RsvpInput & {
  id: string;
  submittedAt: string;
};
