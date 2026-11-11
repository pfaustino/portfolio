# The Docket: Every Accusation Against Donald J. Trump

A static, dependency-free web app that lists the impeachments, criminal cases, civil suits, and ballot challenges aimed at Donald J. Trump. Each matter shows what is alleged, where it stands, how it has been handled, and how it could (or could not) end in a conviction.

Status is as of Nov 11, 2026. Allegations are not findings. Trump denies wrongdoing in every matter listed. Confirm against court dockets before relying on any item. This is an educational overview, not legal advice.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# http://localhost:8000
```

## Structure

```
index.html   Page layout
app.js       Rendering, filters, timeline, and case detail dialog
data.js      All matters, tracks, and pathways (the source of truth)
styles.css   Styles
```

To add or change a matter, edit `data.js`.
