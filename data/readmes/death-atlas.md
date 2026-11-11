# Death Atlas

Live site: [https://pfaustino.github.io/death-atlas/](https://pfaustino.github.io/death-atlas/)

A globe of major battles from the Late Bronze Age to the present. The camera turns to each fight, the timeline slows on a details card (who fought, the years, who won, how many died), and you can run time forward or backward.

```bash
npm install
npm run dev
```

## Controls

| Action | How |
| --- | --- |
| Pause / play | Space or **Pause** |
| Play forward | **Forward ▶** |
| Play backward | **◀ Reverse** |
| Previous / next battle | ← → or **Previous** / **Next** |
| Jump in time | Timeline scrubber |
| Filter | Era chips and minimum deaths |
| Speak the article paragraph | **Speak (UK male)** — Microsoft Ryan via Edge TTS |

Marks on the globe stay for battles at or before the playhead, so reversing time erases later scars.

## Data

The catalog is built from Wikipedia’s [List of battles (alphabetical)](https://en.wikipedia.org/wiki/List_of_battles_(alphabetical)). Each card uses the first paragraph of that battle’s article as narration. Entries without a usable year, coordinates, or lead paragraph are skipped. Death tolls are often estimates and can be disputed; the card labels uncertain figures as `est.`

Refresh the downloaded catalog with `npm run fetch-wiki`.

Globe texture: NASA *Blue Marble* / land shallow topography (see `ASSETS.md`).
