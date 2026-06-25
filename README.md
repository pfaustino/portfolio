# Portfolio

A static portfolio site listing all [pfaustino](https://github.com/pfaustino) GitHub projects with links to live demos on GitHub Pages, itch.io, and Vercel.

**Live:** https://pfaustino.github.io/portfolio/

## Local preview

```bash
npx serve .
# open http://localhost:3000
```

## Updating projects

Edit `data/projects.json` — each entry includes name, description, stack, status, and deploy links. Push to `main` to redeploy via GitHub Actions.

## Structure

```
index.html          Landing page
css/styles.css      Styles
js/app.js           Filter, search, card rendering
data/projects.json  Project catalog (source of truth)
```
