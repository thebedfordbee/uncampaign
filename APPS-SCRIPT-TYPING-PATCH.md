# Apps Script Patch — Typing Challenge Tab

## Context

The Bedford Typing Challenge on `/best-of-bedford` POSTs scores and GETs the leaderboard
from the same Google Apps Script endpoint used by `/ideas`, `/don-bot`, and `/rules`:

```
https://script.google.com/macros/s/AKfycbwjYjib02X1GLNhqqVnGCjEcAYPVNwSLceFhNUEFg5CvBIzqcBolAVeTMx09-i9_CFN/exec
```

The page works fully without this patch (falls back to seeded data + localStorage).
Add this code when you want live leaderboard scores synced to Google Sheets.

---

## Sheet structure

Create a new tab called **TypingScores** with this header row (or the script creates it automatically):

| Timestamp | Initials | Hamlet | WPM | Accuracy | PassageId | Source | RoundDuration |
|-----------|----------|--------|-----|----------|-----------|--------|---------------|

---

## Apps Script code to add

Open the Apps Script project bound to this deployment.

### In `doGet(e)` — add before the final return:

```javascript
// ── Typing Leaderboard GET ───────────────────────────────────────────────────
if (e.parameter.action === 'getTypingLeaderboard') {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('TypingScores');
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, scores: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  var rows    = sheet.getDataRange().getValues();
  var headers = rows[0];
  var scores  = rows.slice(1).filter(function(r) { return r[0]; }).map(function(r) {
    return {
      initials:      r[1],
      hamlet:        r[2],
      wpm:           r[3],
      accuracy:      r[4],
      passageId:     r[5],
      source:        r[6] || 'real',
      roundDuration: r[7] || 60,
      timestamp:     r[0] instanceof Date ? r[0].toISOString() : String(r[0])
    };
  });
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, scores: scores }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### In `doPost(e)` — add inside the action routing block:

```javascript
// ── Typing Score Submit ──────────────────────────────────────────────────────
if (data.action === 'submitTypingScore') {
  var ss      = SpreadsheetApp.getActiveSpreadsheet();
  var tabName = 'TypingScores';
  var sheet   = ss.getSheetByName(tabName);

  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.appendRow(['Timestamp','Initials','Hamlet','WPM','Accuracy','PassageId','Source','RoundDuration']);
    sheet.setFrozenRows(1);
  }

  var initials = String(data.initials || '').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,3);
  if (initials.length < 2) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'Invalid initials' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([
    new Date(),
    initials,
    data.hamlet        || '',
    Math.round(Number(data.wpm)      || 0),
    Math.round(Number(data.accuracy) || 0),
    Number(data.passageId)            || 0,
    'real',
    Number(data.roundDuration)        || 60
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## After editing the script

1. Click **Deploy → Manage deployments**.
2. Select the existing deployment → pencil (edit) icon.
3. Change **Version** to **"New version"**.
4. Click **Deploy**.

The URL does not change. Existing `/ideas`, `/don-bot`, and `/rules` behaviour is unaffected.

---

## Seeded data

The page ships with 73 pre-seeded entries (source='seed') stored in client-side JavaScript.
These display immediately without any backend. They are clearly flagged as `source: 'seed'`
in the data model.

**To phase out seeded entries:**
1. Once you have 50+ real scores, remove or comment out the `SEED_RAW` array and `SEED_SCORES`
   constant in the page's inline `<script>` block (search for `SEED_RAW`).
2. The leaderboard will then show only real scores from the server + localStorage.

**To keep seeds mixed with real scores permanently:**
Leave the code as-is. Seeds are distinguishable by `source: 'seed'` in any analytics export.

---

## Adding more passages

The 30 passages live in the `PASSAGES` array in the inline `<script>` block of
`/pages/best-of-bedford.html`. Each entry: `{ id: N, text: "..." }`.

- Target: 90–115 words per passage
- Content: factual, civic, geographic, historical Bedford content
- Avoid: partisan framing, campaign persuasion, unusually hard or easy text

Add new entries at the end of the array and increment IDs sequentially.

---

## Adding future Best of Bedford modules

The page structure is designed for extension. To add a new module:
1. Create a new `<section>` in `/pages/best-of-bedford.html` following existing section patterns.
2. Add a card to the "What comes next" grid (update the dashed-border card to a solid one).
3. If the module needs its own full page, create `/pages/best-of-bedford-[module].html`
   and add a redirect in `_redirects`.

---

## Rollback

If anything breaks, the rollback path is:
```
git revert HEAD
git push
```
The page is fully self-contained. Removing `best-of-bedford.html` restores the site
to its previous state. The `_redirects` and `sitemap.xml` entries can be reverted
in the same commit. No shared CSS or JS was modified.
