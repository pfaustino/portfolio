# Ghouls n Orcs

Ghosts 'n Goblins-style 2.5D gothic platformer: undead, orcs, and multiple weapons across side-scrolling levels.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5176`. Build with `npm run build` (Vite outDir `dist`, base `/ghouls-n-orcs/`).

## Stack

Vanilla JavaScript (ES modules) · Three.js 0.160 (import map / unpkg) · Vite 6 · Web Audio · Playwright smoke e2e

## Scope / Status

Playable browser game (`index.html` → `src/main.js`). Three authored levels in `src/config/Levels.js`: graveyard, crypt, mines. Enemy types include Ghoul, Orc, OrcWarlord, Ogre, Gargoyle, and Goleling. Weapons in `WeaponFactory`: spear, knife, axe, torch. Keyboard, gamepad, and mobile touch via `InputManager`. Portfolio marks it active; itch.io lists a public build. Version file reads `0.9.15.2` (early-access / demo territory).
