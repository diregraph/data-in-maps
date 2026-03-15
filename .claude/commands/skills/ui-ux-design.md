---
description: UI/UX design principles for building intuitive, accessible interfaces
allowed-tools: Read, Write, Edit
---

Apply **The Eight Golden Rules of Interface Design** (Shneiderman) to all UI decisions.

## The Rules

**1. Strive for consistency.**
Identical terminology, uniform color, layout, capitalization, and fonts throughout. Exceptions (e.g., destructive confirmations) must be limited and comprehensible.

**2. Seek universal usability.**
Design for diverse users — novices to experts, varying ages, disabilities, screen sizes, and international contexts. Add explanations for novices; shortcuts for power users.

**3. Offer informative feedback.**
Every user action must produce interface feedback. Minor actions → modest response. Infrequent or major actions → substantial, visible feedback (e.g., a toast, progress indicator).

**4. Design dialogs to yield closure.**
Organize sequences with a clear beginning, middle, and end. Provide completion feedback when a task group finishes (e.g., a confirmation after saving a view).

**5. Prevent errors.**
Design so users cannot make serious mistakes — disable inapplicable controls, restrict invalid inputs. If an error occurs, provide specific, constructive recovery instructions without losing valid prior input.

**6. Permit easy reversal of actions.**
Make actions undoable wherever possible. This reduces anxiety and encourages exploration of unfamiliar features.

**7. Keep users in control.**
Avoid surprises or unexpected state changes. Users expect the interface to respond predictably. Don't interrupt their flow with unsolicited dialogs or loading states that block interaction.

**8. Reduce short-term memory load.**
Don't require users to remember information from one screen to use on another. Keep current context visible. Compact multi-step flows into a single view where possible.

## Application to Data In Maps

- **Map interactions:** Pan, zoom, and click must feel instant. Use optimistic UI for selections.
- **Data panels:** Show data inline alongside the map — avoid requiring navigation away from the map to see country details.
- **Loading states:** Use skeleton loaders, not spinners, for data panels. The map itself should render immediately.
- **Error states:** If country data fails to load, show a non-blocking inline error in the panel — never a full-page error.
- **Tooltips:** Keep map tooltips minimal. Show the country name on hover; surface full data on click.
