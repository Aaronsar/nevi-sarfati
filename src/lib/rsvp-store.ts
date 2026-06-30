import { put, list } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import type { RsvpEntry, RsvpInput } from "./rsvp-schema";

const BLOB_PREFIX = "rsvp/";
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

async function saveToBlob(entry: RsvpEntry): Promise<void> {
  await put(`${BLOB_PREFIX}${entry.id}.json`, JSON.stringify(entry, null, 2), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}

export async function saveRsvp(data: RsvpInput): Promise<RsvpEntry> {
  const entry = createEntry(data);

  try {
    await saveToBlob(entry);
    return entry;
  } catch (error) {
    console.error("Blob save failed:", error);

    if (process.env.NODE_ENV !== "production") {
      await saveToLocalFile(entry);
      return entry;
    }

    throw error;
  }
}

export async function listRsvps(): Promise<RsvpEntry[]> {
  const { blobs } = await list({ prefix: BLOB_PREFIX });
  const entries: RsvpEntry[] = [];

  for (const blob of blobs) {
    const response = await fetch(blob.url);
    if (response.ok) {
      entries.push((await response.json()) as RsvpEntry);
    }
  }

  return entries.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}
