import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { appendRsvpToGoogleSheet } from "./google-sheets";
import type { RsvpEntry, RsvpInput } from "./rsvp-schema";

const LOCAL_RSVP_DIR = path.join(process.cwd(), "data", "rsvps");

function createEntry(data: RsvpInput): RsvpEntry {
  return {
    ...data,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };
}

async function saveToLocalFile(entry: RsvpEntry): Promise<void> {
  await mkdir(LOCAL_RSVP_DIR, { recursive: true });
  await writeFile(
    path.join(LOCAL_RSVP_DIR, `${entry.id}.json`),
    JSON.stringify(entry, null, 2),
    "utf-8",
  );
}

export async function saveRsvp(data: RsvpInput): Promise<RsvpEntry> {
  const entry = createEntry(data);

  const hasGoogle =
    process.env.GOOGLE_SHEETS_WEBHOOK_URL ||
    (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY);

  if (hasGoogle) {
    await appendRsvpToGoogleSheet(entry);
    return entry;
  }

  if (process.env.NODE_ENV !== "production") {
    await saveToLocalFile(entry);
    return entry;
  }

  throw new Error(
    "Google Sheets non configuré. Ajoutez GOOGLE_SHEETS_WEBHOOK_URL sur Vercel.",
  );
}
