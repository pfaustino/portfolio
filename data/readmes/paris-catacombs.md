# Paris Catacombs

Desktop first-person walk through an **ossuary-inspired** gallery in the browser.

This is an original, atmosphere-led recreation — **not** a photogrammetry scan of the municipal Catacombs, and **not** a map or access guide to any underground network.

## Play

**Live:** [pfaustino.github.io/paris-catacombs](https://pfaustino.github.io/paris-catacombs/)

```bash
npm install
npm run dev
```

Open the URL Vite prints (port `5173`). Click **Enter**, then walk with **WASD** and mouse look. **F** toggles the flashlight. **Esc** pauses. **M** toggles the minimap.

Dev tools: append `?dev=1` for noclip, teleport, and flashlight controls.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local play |
| `npm run build` | Production build |
| `npm run check` | Build gate |
| `npm run test:e2e` | Playwright smoke |

## Controls

- **WASD** — move
- **Mouse** — look
- **F** — flashlight
- **M** — toggle minimap
- **Esc** — unlock pointer / title

## Disclaimer

Inspired by the public Paris Catacombs ossuary experience. All geometry and bone dressing are procedural/original. Do not use this project as guidance for entering closed quarries.
