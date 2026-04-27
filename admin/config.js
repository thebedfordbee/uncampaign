/* ============================================================
   UNCAMPAIGN Command Center — Config
   PRIVATE. /admin/ is disallowed by robots.txt + noindex meta.
   For stronger security: use Cloudflare Access on /admin/.
   ============================================================ */

const CFG = {

  /* PASSWORD
     Demo mode: leave as placeholder — any non-empty password works (warning shown).
     Real password: generate SHA-256 hash at https://emn178.github.io/online-tools/sha256.html
     then replace the placeholder string below.                                         */
  passwordHash: 'ADMIN_PASSWORD_HASH_OR_PLACEHOLDER',

  /* APPS SCRIPT
     Replace with your deployed Google Apps Script Web App URL.
     Format: https://script.google.com/macros/s/XXXXXXX/exec
     Leave as placeholder to run in demo mode (sample data shown).                       */
  appsScriptUrl: 'APPS_SCRIPT_URL_PLACEHOLDER',

  /* ADMIN TOKEN — included in every Apps Script POST */
  adminToken: 'lastoftherepublicans2026',

  /* CAMPAIGN DATES */
  electionDay:    '2026-11-03',
  campaignStart:  '2026-05-04',

  /* CAMPAIGN INFO */
  siteUrl:   'https://uncampaign.pages.dev',
  candidate: 'Don Scott',
  race:      'Bedford Town Supervisor',
  location:  'Bedford, New York',

  /* SPENDING — update spendActual as expenses occur */
  spendBudget: 49.99,
  spendActual: 0.00

};
