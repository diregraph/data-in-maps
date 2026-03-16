---
description: Creates a new GitHub issue from a task description or plan, optionally copying properties from a reference issue
allowed-tools: Read, Bash, WebFetch
---

**Reference issue (optional):** $ARGUMENTS

When the user asks to create a GitHub issue, follow these steps:

1. **Gather the task description.**
   - If the user references a `plan.md` or specific file, read it and locate the relevant section.
   - If the user describes the task directly in the prompt, use that as the source.

2. **Extract properties from a reference issue (if provided).**
   - If a reference issue number was provided, run:
     ```bash
     gh issue view <number> --json assignees,labels,milestone
     ```
   - Skip this step if no reference was given.

3. **Write the issue body to a temp file.**
   - Create `/tmp/issue-<task-name>.md` with the following structure:

     ```
     ## Goal
     <what this issue achieves>

     ## Tasks
     - [ ] Task 1
     - [ ] Task 2

     ## Acceptance Criteria
     - [ ] Criterion 1
     ```

4. **Create the issue.**

   ```bash
   gh issue create --title "<title>" --body-file /tmp/issue-<task-name>.md [--label <labels>] [--assignee <assignee>]
   ```

5. **Share the issue URL with the user.**
