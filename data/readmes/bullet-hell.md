# Bullet Hell

Top-down lane bullet-heaven survivor: auto-fire, endless waves, coin bank, and an ally fleet that fuses into larger ships.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5177`. `npm run check` runs the smoke script. Live builds: GitHub Pages and itch.io (saves do not share between those hosts).

## Stack

Vanilla JavaScript · Canvas 2D · Vite 6 · Web Audio · optional leaderboard env via Vite HTML inject · Playwright smoke e2e

## Scope / Status

Playable monolith at `game_v3.js` (wired from `index.html`; legacy `game.js` is not). Three lanes, wave/boss loop, special weapons, ally fusion, permanent coin upgrades, local and optional global leaderboards, SFX/music settings. Portfolio marks it active. Repo version `0.1.11`.
