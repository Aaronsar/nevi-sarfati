import type { RsvpEntry } from "./rsvp-schema";

/** Sheet fourni : https://docs.google.com/spreadsheets/d/13JQsuYOSTT62DN6xl5U_yx8cKBKkVeWIE360Ujj4Hwc */
export const GOOGLE_SHEET_ID =
  process.env.GOOGLE_SHEET_ID ?? "13JQsuYOSTT62DN6xl5U_yx8cKBKkVeWIE360Ujj4Hwc";

const HEADERS = ["Date", "Famille", "Présent", "Nombre de personnes"];

async function saveViaAppsScript(entry: RsvpEntry): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) throw new Error("GOOGLE_SHEETS_WEBHOOK_URL manquant");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
    redirect: "follow",
  });

  const data = (await response.json().catch(() => ({}))) as { success?: boolean; error?: string };
  if (!response.ok || data.error) {
    throw new Error(data.error ?? `Apps Script HTTP ${response.status}`);
  }
}

async function saveViaServiceAccount(entry: RsvpEntry): Promise<void> {
  const email = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    throw new Error("GOOGLE_CLIENT_EMAIL ou GOOGLE_PRIVATE_KEY manquant");
  }

  const { google } = await import("googleapis");

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const range = process.env.GOOGLE_SHEET_RANGE ?? "Feuille 1!A:D";

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: `${range.split("!")[0]}!A1:D1`,
  });

  if (!existing.data.values?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${range.split("!")[0]}!A1:D1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [HEADERS] },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[entry.submittedAt, entry.famille, entry.present, entry.nombrePersonnes ?? ""]],
    },
  });
}

export async function appendRsvpToGoogleSheet(entry: RsvpEntry): Promise<void> {
  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    await saveViaAppsScript(entry);
    return;
  }

  await saveViaServiceAccount(entry);
}
