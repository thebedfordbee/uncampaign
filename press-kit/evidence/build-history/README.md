# evidence/build-history/

The campaign's build timeline — useful for the "built fast and cheap" framing and for case-study/awards documentation. The Git history is itself the primary artifact.

## Capture list (from the outreach angle audit)

- [ ] **Git commit-history export** — a dated log showing the build timeline. For example:
  - `git log --pretty=format:"%ad %h %s" --date=short > commit-timeline.txt`
- [ ] *(Optional)* a short milestone summary (first commit, when each flagship tool shipped) for reporters who don't read raw logs.

## Rules

- Keep the actual Git history intact in the repo; this folder holds exported, human-readable snapshots.
- Re-export at meaningful milestones rather than constantly.
- Don't editorialize the log into claims the commits don't support.
