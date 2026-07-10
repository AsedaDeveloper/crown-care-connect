# CrownCare — Own Google Sheets sync (replaces Zapier)

Every insert into the Supabase `waitlist` table (signups, newsletter subs,
premium-interest clicks) is mirrored into the **CrownCare Signups** Google Sheet
by a Supabase Database Webhook that calls a Google Apps Script Web App.

No Zapier, no monthly fee. ~10 minutes of one-time setup.

---

## Step 1 — Add the Apps Script (in the Google Sheet)

1. Open the **CrownCare Signups** sheet.
2. Make sure row 1 headers are exactly:
   `Name | Email | WhatsApp | Signed Up At | Age | Gender | Newsletter | Source`
   (add the `Source` column in H1 if missing).
3. **Extensions → Apps Script.**
4. Delete any starter code, paste the contents of [`sheets-sync.gs`](./sheets-sync.gs).
5. Change `SHARED_SECRET` to a long random string (e.g. mash the keyboard —
   `k7Qz9mT4wRv2Xp8Lb3Nf6`). Remember it for Step 3.
6. Confirm `SHEET_NAME` matches your tab name (default `Sheet1`).
7. **Save.**

## Step 2 — Deploy as a Web App

1. In the Apps Script editor: **Deploy → New deployment.**
2. Gear icon → **Web app.**
3. Settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. **Deploy.** Authorise when prompted (allow it to manage the spreadsheet).
5. Copy the **Web app URL** — it ends in `/exec`. This is your sync endpoint.

Test it: paste that `/exec` URL in a browser. You should see
`{"ok":true,"message":"CrownCare sheets sync is live. Use POST."}`.

## Step 3 — Point Supabase at it

1. Supabase dashboard → your project → **Database → Webhooks** (may be under
   "Integrations" / "Database Webhooks").
2. **Create a new webhook:**
   - **Name:** `sheets-sync`
   - **Table:** `waitlist`
   - **Events:** Insert
   - **Type:** HTTP Request
   - **Method:** POST
   - **URL:** your `/exec` URL **with the token appended**:
     `https://script.google.com/…/exec?token=YOUR_SECRET`
     (the same secret you set in Step 1.5)
   - **HTTP headers:** add `Content-Type: application/json` if not default.
3. **Save.**

## Step 4 — Test end to end

1. Go to the live site, submit a signup (or newsletter, or premium interest).
2. The row should appear in Supabase `waitlist` **and** in the Google Sheet
   within a few seconds.

If the sheet doesn't update, check Supabase → Webhooks → the webhook's
**recent deliveries** log for the response. `unauthorized` means the token in
the URL doesn't match `SHARED_SECRET` in the script.

---

## Notes

- The `Source` column shows how each lead arrived: a person's real name = a
  full signup; `Newsletter subscriber` = footer subscribe; `Premium interest`
  = clicked the premium/paywall button.
- To change the sheet layout, update the `appendRow([...])` order in
  `sheets-sync.gs` and redeploy (Deploy → Manage deployments → edit → new version).
