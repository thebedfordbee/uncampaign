# Apps Script Patch — Knicks Fan Sudden Death

## Context

The page at `/knicks` (`/pages/knicks.html`) POSTs scores and GETs the leaderboard
from the **same** Google Apps Script endpoint already used by the typing game,
Don Bot, `/ideas`, and `/rules`:

```
https://script.google.com/macros/s/AKfycbwjYjib02X1GLNhqqVnGCjEcAYPVNwSLceFhNUEFg5CvBIzqcBolAVeTMx09-i9_CFN/exec
```

**The page works fully without this patch.** Until the endpoint is patched, the
leaderboard falls back to seeded entries + the player's own `localStorage`, and the
submit button reports "Saved on this device." Apply this patch when you want live,
synced Knicks scores in the spreadsheet.

The new actions are **additive** — they do not touch the existing typing/chat
behaviour. No existing action is modified.

---

## Sheet structure

A new tab named **KnicksScores** is created automatically on first write, with:

| Timestamp | GameType | Initials | Hamlet | Score | MaxScore | Rating | UserAgent | AnswersSummary |
|-----------|----------|----------|--------|-------|----------|--------|-----------|----------------|

---

## Apps Script code to add

Open the Apps Script project bound to this deployment.

### In `doGet(e)` — add before the final return:

```javascript
// ── Knicks Leaderboard GET ───────────────────────────────────────────────────
if (e.parameter.action === 'getKnicksLeaderboard') {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('KnicksScores');
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, scores: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  var rows   = sheet.getDataRange().getValues();
  var scores = rows.slice(1).filter(function (r) { return r[0]; }).map(function (r) {
    return {
      timestamp:      r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
      gameType:       r[1],
      initials:       r[2],
      hamlet:         r[3],
      score:          Number(r[4]) || 0,
      maxScore:       Number(r[5]) || 15,
      rating:         r[6],
      answersSummary: r[8] || '',
      source:         'real'
    };
  });
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, scores: scores }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### In `doPost(e)` — add inside the action routing block:

```javascript
// ── Knicks Score Submit ──────────────────────────────────────────────────────
if (data.action === 'submitKnicksScore') {
  var ss      = SpreadsheetApp.getActiveSpreadsheet();
  var tabName = 'KnicksScores';
  var sheet   = ss.getSheetByName(tabName);

  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    sheet.appendRow(['Timestamp','GameType','Initials','Hamlet','Score','MaxScore','Rating','UserAgent','AnswersSummary']);
    sheet.setFrozenRows(1);
  }

  var initials = String(data.initials || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3);
  if (initials.length < 2) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'Invalid initials' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var score    = Math.max(0, Math.min(15, Math.round(Number(data.score) || 0)));
  var maxScore = Math.round(Number(data.maxScore) || 15);

  sheet.appendRow([
    new Date(),
    data.gameType        || 'knicks-sudden-death',
    initials,
    data.hamlet          || '',
    score,
    maxScore,
    data.rating          || '',
    String(data.userAgent || '').slice(0, 300),
    String(data.answersSummary || '').slice(0, 300)
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

The URL does not change. Existing typing / Don Bot / ideas / rules behaviour is unaffected.

---

## Payload reference (what the page sends)

POST body (`Content-Type: text/plain;charset=utf-8`, JSON string):

```json
{
  "action": "submitKnicksScore",
  "gameType": "knicks-sudden-death",
  "initials": "ABC",
  "hamlet": "Katonah",
  "score": 9,
  "maxScore": 15,
  "rating": "Oakley Would Nod",
  "completedAt": "2026-05-29T18:00:00.000Z",
  "userAgent": "...",
  "answersSummary": "ok:brun,hart,kat,brid,og,mrob,deuce,prec,kolek;miss:ewing(timeout)"
}
```

- `answersSummary` is a compact, no-PII record: `ok:<comma-separated correct ids>;miss:<id>(<wrong|timeout>)`.
  A perfect run reads `...;miss:none`. Question ids map to players in the `QUESTIONS`
  array inside `/pages/knicks.html`.
- The page also stores a copy in `localStorage` and blocks a second submission in the
  same browser session (`sessionStorage` flag `knx_submitted_v1`).

---

## Seeded data

The page ships with 8 seeded leaderboard entries (`source:'seed'`) in the inline
`<script>` (`SEED_SCORES`). They display immediately without any backend. Once you have
enough real scores, trim or remove `SEED_SCORES`.

---

## Rollback

```
git revert HEAD
git push
```

The page is self-contained. Removing `/pages/knicks.html`, the two `_redirects` lines,
the sitemap entry, and the homepage card restores the prior state. No shared CSS/JS was
modified. The Apps Script additions are inert if the page is removed.
