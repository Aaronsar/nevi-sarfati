/**
 * À coller dans Google Sheets → Extensions → Apps Script
 * Sheet : https://docs.google.com/spreadsheets/d/13JQsuYOSTT62DN6xl5U_yx8cKBKkVeWIE360Ujj4Hwc
 *
 * 1. Coller ce code
 * 2. Déployer → Nouveau déploiement → Application web
 * 3. Exécuter en tant que : Moi · Accès : Tout le monde
 * 4. Copier l'URL dans Vercel : GOOGLE_SHEETS_WEBHOOK_URL
 */

const SHEET_ID = "13JQsuYOSTT62DN6xl5U_yx8cKBKkVeWIE360Ujj4Hwc";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    const data = JSON.parse(e.postData.contents);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Date", "Famille", "Présent", "Nombre de personnes"]);
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.famille || "",
      data.present || "",
      data.nombrePersonnes || "",
    ]);

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: String(err) })).setMimeType(
      ContentService.MimeType.JSON,
    );
  }
}

function doGet() {
  return ContentService.createTextOutput("RSVP webhook actif");
}
