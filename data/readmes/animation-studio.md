# Wardom Studio

Browser studio for the models and animation clips shipped with world-of-wardom.

```bash
npm install
npm run dev
```

The dev server reads two libraries. `../world-of-wardom/public/models` is the game's pruned set. `C:\Dev\wow-exports` is the wow.export output those models were cut down from, with every clip still in the file. `npm run dev` rebuilds both catalogs. Set `WARDOM_ROOT` or `WOW_EXPORTS` to point the extractors somewhere else, and `WARDOM_MODELS` if the game models are not in the sibling repo.

Import a `.glb`, a `.gltf` plus its `.bin` and textures, or a folder. Imports stay in this browser. Export writes a GLB of the visible parts, either every clip or the one currently playing.
