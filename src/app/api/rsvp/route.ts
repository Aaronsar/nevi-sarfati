import { NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/rsvp-schema";
import { saveRsvp } from "@/lib/rsvp-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = rsvpSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Données invalides";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const entry = await saveRsvp(parsed.data);
    return NextResponse.json({ success: true, id: entry.id });
  } catch (error) {
    console.error("RSVP submission error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 },
    );
  }
}
