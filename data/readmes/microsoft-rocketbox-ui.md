# Rocketbox Studio

Browser studio for the 115 characters in [microsoft/Microsoft-Rocketbox](https://github.com/microsoft/Microsoft-Rocketbox). Drag a character onto the stage, play a shared body clip, and export a `.glb` with the mesh and the clips you checked.

[Microsoft Rocketbox](https://github.com/microsoft/Microsoft-Rocketbox) required.

`Assets/Avatars` is the FBX export used here. `Source/` is the parent authoring library (3ds Max files) and is not loaded. Two `Professions/Female_Party_*` folders only contain a misplaced facial FBX; the real party characters live under `Adults`, which is why the browser lists 115.

```bash
npm install
npm run dev
```

The dev server caches GitHub downloads in `.cache/rocketbox`. Color textures are converted from TGA and resized to 1024px before they reach the viewport and the GLB. Normal and specular maps are left out so a character does not pull tens of megabytes of extra textures.

Characters and the animation FBX files are MIT-licensed assets from Microsoft. If you use them in research, cite Gonzalez-Franco et al., “The Rocketbox Library and the Utility of Freely Available Rigged Avatars,” Frontiers in Virtual Reality, 2020.
