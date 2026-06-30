import { put, list } from "@vercel/blob";
import type { RsvpEntry, RsvpInput } from "./rsvp-schema";

const BLOB_PREFIX = "rsvp/";

export async function saveRsvp(data: RsvpInput): Promise<RsvpEntry> {
  const entry: RsvpEntry = {
    ...data,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
  };

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  await put(`${BLOB_PREFIX}${entry.id}.json`, JSON.stringify(entry, null, 2), {
    access: "private",
    contentType: "application/json",
    token,
  });

  return entry;
}

export async function listRsvps(): Promise<RsvpEntry[]> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }

  const { blobs } = await list({ prefix: BLOB_PREFIX, token });
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
