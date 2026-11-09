# World of Wardom

Browser 3D RPG thin slice: procedural outdoor terrain (hills, mountains, water) and WoW-style ground hazards (fire / acid telegraphs).

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173` — add `?dev=1` for the cheat panel.

## Controls

- **WASD** — move
- **Click canvas** — pointer lock; mouse look
- **Left click** — melee attack (in range)
- **Q** — heal (+55 HP, 12s cooldown)

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local Vite server |
| `npm run check` | typecheck + unit tests + build |
| `npm run test` | Vitest |
| `npm run test:e2e` | Playwright smoke |

## Scope

See [GDD.md](GDD.md). Dev cheats: [DEV.md](DEV.md).
