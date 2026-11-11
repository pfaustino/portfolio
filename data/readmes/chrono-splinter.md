# Chrono-Splinter

Future humanity invading from a dying timeline — told as a Galaga-style Canvas space shooter with chapters, bosses, and ship upgrades.

## Run

```bash
npm run dev
```

Serves the repo root on `http://localhost:5183` (`npx serve`). Alternate local option: `start_server.bat` (Python `http.server` on the same port). No bundler step required. Public HTML5 build is on itch.io; `build_release.bat` packs `release/` for Butler.

## Stack

Vanilla JavaScript (multi-file scripts under `js/`) · HTML5 Canvas · CSS · no npm runtime dependencies · static `serve` / Python http.server for local play

## Scope / Status

Full playable loop at version `0.9.6.2`: waves, enemies, bullets, power-ups, coins, shop upgrades, drone, bosses, intro/ending, galaxy map, settings, audio. Twelve chapters from Mercury through The Edge (`js/main.js`). Portfolio lists status as development; the code is a complete shooter, not a turn-based strategy prototype.
