# CLAUDE.md — PSC Quiz Battle

Read `SPEC.md` before any task. It says what to build and what "done" means.

## How to build
- Plain HTML, CSS and JavaScript only. Use plain JavaScript instead of React, Vue or any other framework. No build step, no npm packages.
- Four files: `index.html` (the screens), `style.css` (the look), `app.js` (the logic), `questions.js` (the question bank). Add a new file only when I ask for it.
- It must work by double-clicking `index.html`. So load scripts with plain `<script src>` tags, `questions.js` before `app.js`. No `import`, no `fetch()` of local files.
- Phone first: design for a 360-pixel-wide screen, then check it also looks fine on a laptop.
- Malayalam text: the Noto Sans Malayalam font from Google Fonts, line height 1.5.

## Questions
- Every question in `questions.js` has: `topic`, `question`, `options` (exactly 4), `answer` (0–3), `explanation` (one line), `source` (where I can check it).
- Never invent a source. If you are not sure an answer is correct, add `checked: false` to that question and tell me.

## How to work with me
- I am a beginner. After every change, tell me in three short lines: what changed, which files, and how to check it in the browser.
- Change only what the task needs. If you want to change anything else, ask first.
- Code comments in short, simple English.
