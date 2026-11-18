# Career mode (archived)

Career mode let you create one player (Handler, Cutter or Defender), join a school and play four
seasons, freshman to senior. You earned XP from wins, goals, assists, blocks and points played,
levelled up, and spent skill points on your own six ratings. After senior year you got a
graduation screen with a recruiting outcome.

It was removed in **Version 13** so the game could focus on head coach mode. Nothing about it is
lost.

## Play it as it was

`pacific-huck-v12-with-career.html` in this folder is the complete game at Version 12, the last
version with career mode. Open it in a browser, or on the GitHub Pages site at
`https://zealacy.github.io/Huck/archive/career-mode/pacific-huck-v12-with-career.html`.

It shares browser storage with the main game, so an existing career save shows up there.

The same version is also commit `62061b1` in git history (`git show 62061b1:index.html`).

## Add it back to the current game

The current game keeps everything career mode builds on: seasons, standings, playoffs, the match
engine, and the engine's support for highlighting your own player (`meId`, the YOU marker, and the
coach picking you for lines). To plug career mode back in:

1. Paste the functions and constants from `career.js` back into `src/pacific-huck.html`, in the
   "seasons" section near `let CAR=null`.
2. In that code, rename `saveCareer()` to `saveProgram()`, or add a `saveCareer` function that
   writes to `SAVE_KEY` when `CAR.mode` isn't `'coach'`. The archived `saveCareer` wrote to
   whichever key matched the mode.
3. Make `myRoster()` return `[CAR.me].concat(CAR.rosters[CAR.teamId])` for career saves (the
   archived version checked `CAR.mode==='coach'`).
4. Replace the one-line `endSeasonAwards()` with the archived version, which handles both modes.
5. Put the career buttons back on the title screen (`showTitle`): the snippets are at the bottom
   of `career.js`. Load the save with `loadCareer()` next to `loadCoach()`.
6. Add the career save back to the hot-reload snapshot and `boot()` (snippet at the bottom of
   `career.js`).
7. Paste `career.css` back into the `<style>` block.
8. Rebuild `index.html` from `src/pacific-huck.html` and play a season to check it.

Or ask Claude: "add career mode back from archive/career-mode".
