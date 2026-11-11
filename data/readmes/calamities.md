# Calamity Atlas

Live site: [https://pfaustino.github.io/calamities/](https://pfaustino.github.io/calamities/)

A globe of named famines, epidemics, floods, and disasters from antiquity to the present. The camera turns to each event, the timeline slows on a details card (type, place, year, deaths, Wikipedia lead), and you can run time forward or backward.

This is not [Death Atlas](https://pfaustino.github.io/death-atlas/) (battles) and not [World Disasters](https://pfaustino.github.io/disasters/) (modern instrumented hazards).

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
| Previous / next event | ← → |
| Jump in time | Timeline scrubber |
| Filter | Era chips, calamity type, and minimum deaths |
| Speak the article paragraph | **Speak (UK male)** — Microsoft Ryan via Edge TTS |

Pause immediately pauses speech. Narration is on by default; the Wikipedia paragraph auto-scrolls while it is spoken. Hover the lead image to fill the window.

## Data

The catalog merges Wikipedia’s [List of famines](https://en.wikipedia.org/wiki/List_of_famines), [List of epidemics](https://en.wikipedia.org/wiki/List_of_epidemics), [List of deadliest floods](https://en.wikipedia.org/wiki/List_of_deadliest_floods), and [List of natural disasters by death toll](https://en.wikipedia.org/wiki/List_of_natural_disasters_by_death_toll), then dedupes by article title. Each card uses the first paragraph of that article as narration. Entries without a usable year, coordinates, or lead paragraph are skipped. Death tolls are often estimates and can be disputed; the card labels them as `est.` or `unknown`.

This is the same named-event grain as Death Atlas. It is not EM-DAT and not a 1900–present disaster database.

Refresh the downloaded catalog with `npm run fetch-wiki`.

Globe texture: NASA *Blue Marble* / land shallow topography (see `ASSETS.md`).
