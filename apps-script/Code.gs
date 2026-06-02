/**
 * Knicks Fan Sudden Death — Apps Script members
 * ============================================================================
 * These are the Knicks-specific pieces of the SHARED Apps Script project that is
 * bound to the spreadsheet behind /pages/knicks (the same /exec endpoint used by
 * the typing game, Don Bot, /ideas and /rules). Paste/merge them into that
 * project's Code.gs and redeploy — they are additive and do not touch the
 * typing/chat actions. See the routing + deploy notes at the bottom.
 *
 * Sheet tab: "KnicksScores"
 * The header row AND every appended row MUST use this exact 11-column order:
 *
 *   Timestamp | Initials | Name | Hamlet | Score | Misses | Duration |
 *   Source | Session ID | User Agent | Page
 *
 * (Previously the appended row used a different order than the header, which
 *  misaligned every column. KNICKS_SCORE_HEADERS, submitKnicksScore_ and
 *  getKnicksLeaderboard_ below are all locked to the single order above.)
 */

var KNICKS_SHEET_NAME = 'KnicksScores';

var KNICKS_SCORE_HEADERS = [
  'Timestamp',
  'Initials',
  'Name',
  'Hamlet',
  'Score',
  'Misses',
  'Duration',
  'Source',
  'Session ID',
  'User Agent',
  'Page'
];

/**
 * Append one Knicks score. Column order matches KNICKS_SCORE_HEADERS exactly.
 * Called from doPost(e) when data.action === 'submitKnicksScore'.
 * Missing fields default safely so the existing page payload keeps working.
 */
function submitKnicksScore_(data) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(KNICKS_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(KNICKS_SHEET_NAME);
    sheet.appendRow(KNICKS_SCORE_HEADERS);
    sheet.setFrozenRows(1);
  }

  var initials = String(data.initials || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3);
  if (initials.length < 2) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, success: false, error: 'Invalid initials' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var timestamp = new Date();
  var name      = String(data.name || '').slice(0, 60);
  var hamlet    = String(data.hamlet || '').slice(0, 40);
  var score     = Math.max(0, Math.min(15, Math.round(Number(data.score) || 0)));
  var misses    = Math.max(0, Math.round(Number(data.misses) || 0));
  var duration  = Math.max(0, Math.round(Number(data.duration) || 0));
  var sessionId = String(data.sessionId || '').slice(0, 64);
  var userAgent = String(data.userAgent || '').slice(0, 300);
  var page      = String(data.page || '/pages/knicks').slice(0, 120);

  // EXACT order — must line up 1:1 with KNICKS_SCORE_HEADERS above.
  sheet.appendRow([
    timestamp,   // Timestamp
    initials,    // Initials
    name,        // Name
    hamlet,      // Hamlet
    score,       // Score
    misses,      // Misses
    duration,    // Duration
    'real',      // Source
    sessionId,   // Session ID
    userAgent,   // User Agent
    page         // Page
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Return all Knicks scores (plus a Top 10 + by-hamlet summary).
 * Reads each row in the SAME 11-column order written above.
 * Called from doGet(e) when e.parameter.action === 'getKnicksLeaderboard'.
 */
function getKnicksLeaderboard_() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(KNICKS_SHEET_NAME);
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, success: true, scores: [], top10: [], byHamlet: {} }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var rows   = sheet.getDataRange().getValues();
  var scores = rows.slice(1).filter(function (row) { return row[0]; }).map(function (row) {
    return {
      timestamp: row[0] instanceof Date ? row[0].toISOString() : String(row[0]), // row[0]  Timestamp
      initials:  row[1],                                                          // row[1]  Initials
      name:      row[2],                                                          // row[2]  Name
      hamlet:    row[3],                                                          // row[3]  Hamlet
      score:     Number(row[4]) || 0,                                             // row[4]  Score
      misses:    Number(row[5]) || 0,                                             // row[5]  Misses
      duration:  Number(row[6]) || 0,                                             // row[6]  Duration
      source:    row[7] || 'real',                                                // row[7]  Source
      sessionId: row[8] || '',                                                    // row[8]  Session ID
      userAgent: row[9] || '',                                                    // row[9]  User Agent
      page:      row[10] || ''                                                    // row[10] Page
    };
  });

  // Higher score first; earlier completion wins ties (mirrors the page sort).
  scores.sort(function (a, b) {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  var top10 = scores.slice(0, 10);

  var byHamlet = {};
  scores.forEach(function (s) {
    var h = s.hamlet;
    if (!h) return;
    if (!byHamlet[h]) byHamlet[h] = { players: 0, topScore: 0, totalScore: 0, averageScore: 0 };
    var b = byHamlet[h];
    b.players++;
    b.totalScore += s.score;
    if (s.score > b.topScore) b.topScore = s.score;
    b.averageScore = Math.round((b.totalScore / b.players) * 10) / 10;
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, success: true, scores: scores, top10: top10, byHamlet: byHamlet }))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ── Routing + deploy notes ──────────────────────────────────────────────────
   In the shared project's doPost(e), inside the action router, add:
       if (data.action === 'submitKnicksScore') return submitKnicksScore_(data);
   In doGet(e), add:
       if (e.parameter.action === 'getKnicksLeaderboard') return getKnicksLeaderboard_();

   Then redeploy: Deploy → Manage deployments → (edit existing) → Version: New
   version → Deploy. The /exec URL does NOT change, and the typing / Don Bot /
   ideas / rules actions are unaffected. The page works without this (it falls
   back to seeds + localStorage); apply it for live, synced, correctly-aligned
   Knicks scores. */
