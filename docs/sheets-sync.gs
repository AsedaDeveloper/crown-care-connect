/**
 * CrownCare — Supabase → Google Sheets sync
 *
 * Paste this into the Apps Script editor bound to the "CrownCare Signups"
 * sheet (Extensions → Apps Script). Deploy as a Web App (see docs/SHEETS_SYNC_SETUP.md),
 * then point a Supabase Database Webhook (waitlist, INSERT) at the deployed URL
 * with ?token=YOUR_SECRET appended.
 *
 * Sheet header row (row 1) must be:
 *   Name | Email | WhatsApp | Signed Up At | Age | Gender | Newsletter | Source
 */

// Change this to any long random string. It must match the ?token= in the webhook URL.
var SHARED_SECRET = "REPLACE_WITH_A_LONG_RANDOM_TOKEN";

// Tab name inside the spreadsheet.
var SHEET_NAME = "Sheet1";

function doPost(e) {
  try {
    // Simple shared-secret check (Supabase appends ?token=... to the URL)
    if (!e || !e.parameter || e.parameter.token !== SHARED_SECRET) {
      return json_({ ok: false, error: "unauthorized" });
    }

    var payload = JSON.parse(e.postData.contents);
    // Supabase DB webhook shape: { type, table, record, old_record, schema }
    var r = payload.record || payload;

    var newsletter =
      r.newsletter === true || r.newsletter === "Yes" ? "Yes"
      : r.newsletter === false ? "No"
      : "";

    var lock = LockService.getScriptLock();
    lock.waitLock(30000);
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
      sheet.appendRow([
        r.name || "",
        r.email || "",
        r.whatsapp || "",
        r.created_at || r.signed_up_at || new Date().toISOString(),
        r.age || "",
        r.gender || "",
        newsletter,
        r.name || "", // Source column: name doubles as the source tag
                      // ("Newsletter subscriber" / "Premium interest" / person's name)
      ]);
    } finally {
      lock.releaseLock();
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Lets you open the /exec URL in a browser to confirm it deployed.
function doGet() {
  return json_({ ok: true, message: "CrownCare sheets sync is live. Use POST." });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
