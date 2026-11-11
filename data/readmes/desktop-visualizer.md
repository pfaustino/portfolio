# Desktop Visualizer

A floating Windows desktop orb that reacts to whatever is playing on the machine. The orb is 250px across. Right-click it to switch animation models.

## Animation models

| Model | Type | Look |
| --- | --- | --- |
| **Helios** | Mesh | Living sun. A molten icosphere swells with bass and wrinkles with treble. |
| **Nimbus** | Particles | Nebula swarm. Thousands of soft motes breathe and swirl as a cloud. |
| **Aegis** | Mesh | Crystal lattice. Geodesic armor over a faceted core that flashes on beats. |
| **Kepler** | Hybrid | Orbital rings. Four band-driven belts around a dense core. |
| **Volt** | Hybrid | Lightning veins. Electric arcs crawl the sphere on transients. |
| **Prism** | Mesh | Orthogonal spectrum. Colorful 3D bars that climb the mix. |
| **Flow** | Particles | Spherical current. A dense fluid of bricks swirling inside the orb. |
| **Lumen** | Mesh | Glossy marbles. Physical spheres that cluster and flash with the mix. |
| **Pulp** | Mesh | Jelly cluster. Soft bodies that squash and wobble with the mix. |

## Use

```bash
npm install
npm run dev
```

- Drag the orb to move it.
- Right-click for **Animation Model**, **Size**, audio source, always-on-top, and quit.
- **System playback** listens to Windows WASAPI loopback (what you hear).
- If loopback is blocked, the app falls back to a silent **Demo tone** so the models still move. Switch back from the menu after granting capture permission.

The window is 300×300 so the 250px orb has a little room for glow and rings. Clicks outside the circle pass through to the desktop.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Electron overlay with Vite HMR |
| `npm run dev:web` | Browser preview of the renderer (keys `1`–`9` switch models) |
| `npm run check` | Typecheck, unit tests, production build |
| `npm run build:win` | Windows NSIS installer in `release/` |
