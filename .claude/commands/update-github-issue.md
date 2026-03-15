---
description: Updates a GitHub issue body from a task description or plan
allowed-tools: Read, Bash
---

**Issue number:** $ARGUMENTS

When the user asks to update a GitHub issue, follow these steps:

1. **Gather the updated content.**
   - If the user references a file or plan, read it and locate the relevant section.
   - If the user describes the update directly, use that.

2. **Review the current issue state.**
   ```bash
   gh issue view $ARGUMENTS
   ```

3. **Write the updated body to a temp file.**
   - Create `/tmp/issue-<number>-update.md` maintaining the standard format:
     ```
     ## Goal
     ## Tasks
     - [ ] ...
     ## Acceptance Criteria
     - [ ] ...
     ```

4. **Apply the update.**
   ```bash
   gh issue edit $ARGUMENTS --body-file /tmp/issue-<number>-update.md
   ```

5. **Share the issue URL with the user.**
