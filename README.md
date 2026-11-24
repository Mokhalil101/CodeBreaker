# CODE BREAKER — Run From the System

2D parkour platformer where Python challenges open the way. Single-file build (HTML5 Canvas, no backend).

## Run
Open `index.html` in a browser, or serve the folder: `npx serve .`

## Deploy to GitHub Pages
Push this folder to a repository and enable Pages (GitHub Actions). The included workflow `.github/workflows/pages.yml` publishes the repo root. All paths are relative.

## The Hunter
In every non-boss campaign level a red HUNTER follows BYTE along the exact path BYTE took, a few seconds behind. Standing in one spot longer than the lead time gets you caught, and the lead shrinks slowly during a level. It resets at each respawn. Toggle it in Settings (Hunter chase). Checkpoints are limited by default (about one per level, two in the longest); Settings > Checkpoints: ALL restores them all.

## Enemies
Glitch Runners (yellow) charge you when you get close, and Security Turrets telegraph then fire aimed bolts; both die to a stomp or dash. Patrol drones (red; blue predictors) walk the ground and die to a stomp or dash. Scout drones hover and sweep a scanning cone; if you stay in it they raise the alert, aim and fire a bolt. Dash or stomp them to destroy them. Boss arenas have no scouts.

## Data files
`npm run export` writes `data/levels.json`, `data/worlds.json`, one file per level under `data/levels/world-0N/` and `data/questions.json` from the game. When the game is served with a `data/` folder next to `index.html` it loads `data/levels.json` and `data/questions.json` and uses them in place of the built-in content (invalid files are ignored and the built-in content is used).

## Look
BYTE wears a GDG Assiut-inspired shirt: Google-colour stripes with a white <> logo, red and green sleeves (Settings > GDG Assiut shirt turns it off).

## Boss terminals
After a boss stun ends (or the boss is hit) the terminal recharges for 5 seconds before you can hack it again.

## Systems
300 questions (about 40% handwritten, the rest generated from templates and verified by executing the Python), 3 vertical tower levels with a scrolling camera, dialogue scenes for every world, boss and ending, save slots (3) with copy/paste export and import, credits, world map and level select, key rebinding, text size, high contrast, hidden data files with story records, timed escape levels.

## Controls
A/D or arrows move, Space jump (hold = higher; double jump, wall jump, wall run by holding jump against a wall, auto vault over 1-tile steps and ledge climb, roll after a hard landing), S slide, Shift dash, E, Enter or a click/tap on the terminal hacks it (letter keys also work on an Arabic keyboard layout), Esc pause. Touch buttons appear on mobile.

## Content
- 6 worlds, 30 levels (24 standard + 6 bosses), final boss with 4 phases and 3 endings
- Modes: Campaign, Endless Escape, Code Rush, Time Attack, Daily Challenge, Training
- Skill trees (4), 30 achievements, 6 skins, local leaderboard, versioned local save (`cb_save`, schema v1)
- Question bank: `data/questions.json` is generated from the game (`npm test`). Questions live in the `QB` array / `Q()` calls in `index.html`.

## Tests
`npm install && npm test` — drives the real challenge screen (every question rendered, answered, wrong-answer retries, timer, keyboard, terminal-to-gate flow), validates question records and level data, runs the real game physics headlessly to confirm the jump distances used by the level gaps, and executes every predict-output snippet in Python.

## Known gaps vs the SRS
Phaser 3 / TypeScript / Vite port, 300 questions (currently 129), wall-run is only tested by hand, final music and sprite art, animated cinematics, full automated gameplay tests.

GDG Assiut-inspired fan project. Not an official Google product.
