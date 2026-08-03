# Portfolio

A static portfolio site listing all [pfaustino](https://github.com/pfaustino) GitHub projects with links to live demos on GitHub Pages, itch.io, and Vercel.

**Live:** https://pfaustino.github.io/portfolio/

## Local preview

```bash
npm run dev
# http://localhost/  (port 80 — run terminal as Administrator on Windows)
```

**Local dev port buttons** (localhost only): blue **:5174** links are clickable only when that project's `npm run dev` is running. Grey dashed = offline — hover for `gdev <repo>` hint. Ports match `_devkit/dev-ports.json`.

## Updating projects

Edit `data/projects.json` — each entry includes name, description, stack, status, deploy links, and optional `devPort` (local Vite port; keep in sync with `_devkit/dev-ports.json`). Push to `main` to redeploy via GitHub Actions.

## Structure

```
index.html          Landing page
css/styles.css      Styles
js/app.js           Filter, search, card rendering
data/projects.json  Project catalog (source of truth)
```
