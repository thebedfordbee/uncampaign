# Apps Script Patch — Chat Requests Tab

## Context

The chat request modal on `/don-bot` and `/rules` POSTs to the same Google Apps Script
endpoint used by `/ideas`:

```
https://script.google.com/macros/s/AKfycbwjYjib02X1GLNhqqVnGCjEcAYPVNwSLceFhNUEFg5CvBIzqcBolAVeTMx09-i9_CFN/exec
```

The payload uses `action: "chatRequest"`. The existing script does not yet handle this
action. Add the code below to route it to a separate **"Chat Requests"** sheet tab.

---

## Payload shape (sent as JSON via POST body)

```json
{
  "action":          "chatRequest",
  "meeting_type":    "virtual | in-person",
  "preferred_time":  "morning | afternoon | evening",
  "name":            "Jane Resident",
  "street_address":  "123 Main St, Katonah",
  "email":           "jane@example.com",
  "phone":           "(914) 555-0100",
  "note":            "Optional free-text note",
  "source":          "/don-bot  (or /rules)",
  "page":            "https://uncampaign.pages.dev/pages/don-bot.html",
  "user_agent":      "Mozilla/5.0 ..."
}
```

`phone` is empty string `""` for virtual meetings.

---

## Google Apps Script code to add

Open the Apps Script project bound to this deployment, then find your `doPost(e)`
function. Inside the `switch` or `if/else` block that routes on `action`, add:

```javascript
// ── Chat Request ────────────────────────────────────────────────────────────
if (data.action === 'chatRequest') {
  var ss         = SpreadsheetApp.getActiveSpreadsheet();
  var tabName    = 'Chat Requests';
  var chatSheet  = ss.getSheetByName(tabName);

  // Create tab with header row if it doesn't exist yet
  if (!chatSheet) {
    chatSheet = ss.insertSheet(tabName);
    chatSheet.appendRow([
      'Timestamp',
      'Meeting Type',
      'Preferred Time',
      'Name',
      'Street Address',
      'Email',
      'Phone',
      'Note',
      'Source Page',
      'Full URL',
      'User Agent'
    ]);
    chatSheet.setFrozenRows(1);
  }

  chatSheet.appendRow([
    new Date(),
    data.meeting_type    || '',
    data.preferred_time  || '',
    data.name            || '',
    data.street_address  || '',
    data.email           || '',
    data.phone           || '',
    data.note            || '',
    data.source          || '',
    data.page            || '',
    data.user_agent      || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Where to add it

Your existing `doPost` likely looks like:

```javascript
function doPost(e) {
  var data = JSON.parse(e.postData.contents);

  if (data.action === 'vote') { ... }
  if (data.action === 'submitIdea') { ... }

  // ← Add the chatRequest block here, before the final return
}
```

---

## After editing the script

1. Click **Deploy → Manage deployments**.
2. Select the existing deployment and click the pencil (edit) icon.
3. Change **Version** to **"New version"**.
4. Click **Deploy**.

The URL does not change. Existing `/ideas` vote and idea-submission behaviour is
unaffected — this only adds a new `action` handler.

---

## Testing

Submit a test chat request from `/don-bot` or `/rules`, then check the Google Sheet.
A new **"Chat Requests"** tab should appear with the submission in row 2.
