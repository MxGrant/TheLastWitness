# The Last Witness

> Everyone remembers the murder. Nobody remembers the victim.

A six-chapter psychological murder mystery set at Blackwood Manor. You play Mara Vale, a detective called to a house where a man is said to have died — and where six guests are already lying about what they remember.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (Vite defaults to port 3000).

```bash
npm run build     # typecheck + production build
npm run typecheck # TypeScript only
```

## Play

- **Click / Space / Enter** — advance dialogue, skip the typewriter.
- **1–4** — choose a reply when options appear.
- **Esc** — close an open panel, or open the pause menu.
- **J / B** — journal and evidence board during story scenes.
- Everything you examine is a lead, but it only enters the case once you **file it** in the evidence journal.

Progress saves automatically at chapter boundaries and after major actions; use **Save** in the story HUD or **Save progress** in the chapter hub to save manually. **New Game** and **Restart Chapter** ask for confirmation first, and a single **Reset all progress** control clears the save.

Settings include music and SFX volume, text speed, reduced motion, and ambience subtitles.

## Structure

The story is data, not markup:

- `src/game/scenes.ts` and `src/game/interrogations.ts` — dialogue, choices, topics, accusations.
- `src/game/evidence.ts`, `deductions.ts`, `rooms.ts`, `timeline.ts` — the case file.
- `src/game/chapters.ts` — chapter gates and required objectives.
- `src/game/gameState.ts` / `src/state/GameProvider.tsx` — save state, effects, ending routing.
- `src/components/` — scene player, chapter hub, journal, evidence board, and all UI.
- `src/styles/global.css` — the design system, responsive rules, and scene art styling.

All art is hand-authored SVG and all audio is synthesized with the Web Audio API, so the game has no external assets or API keys.

## Validate the case

```bash
npx esbuild scripts/validate.ts --bundle --platform=node --format=esm --outfile=/tmp/validate.mjs --log-level=warning
node /tmp/validate.mjs
```

The validator simulates a complete playthrough and checks every chapter gate, evidence reference, deduction, essential clue, and all four endings.
