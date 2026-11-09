const ICONS = {
  github: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  pages: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
  itch: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 2C3.67 2 3 2.67 3 3.5v17c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5h-15zm8.28 5.28c.39-.39 1.02-.39 1.41 0l4.5 4.5c.39.39.39 1.02 0 1.41l-4.5 4.5a.996.996 0 0 1-1.41-1.41L15.59 12l-3.3-3.31a.996.996 0 0 1 0-1.41z"/></svg>`,
  vercel: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L2 19.5h20L12 2z"/></svg>`,
  download: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a1 1 0 0 1 1 1v9.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42L11 13.59V4a1 1 0 0 1 1-1zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"/></svg>`,
  local: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v10H4V6zm2 2v6h12V8H6zm2 10h8v2H8v-2z"/></svg>`,
  railway: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7L8 5z"/></svg>`,
  readme: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h8l6 6v14H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1.5V9h5.5L13 3.5zM8 12h8v1.6H8V12zm0 3.4h8V17H8v-1.6z"/></svg>`,
  chevron: `<svg class="readme-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.3 5.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l5.3-5.3-5.3-5.3a1 1 0 0 1 0-1.4z"/></svg>`,
};

const CATEGORY_LABELS = {
  game: "Game",
  app: "App",
  prototype: "Prototype",
};

const STATUS_LABELS = {
  active: "Active",
  development: "In Dev",
  inactive: "Inactive",
  archived: "Archived",
};

/** @typedef {{ id: string, name: string, tagline: string, description: string, category: string, status: string, featured: boolean, stack: string[], topics: string[], updated: string, devPort?: number|null, links: { github: string, githubPages: string|null, itch: string|null, vercel: string|null, download?: string|null } }} Project */

function isLocalDev() {
  const host = location.hostname;
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]";
}

function localDevUrl(port) {
  if (port === 80) return "http://localhost/";
  return `http://localhost:${port}/`;
}

function localDevLabel(port) {
  return port === 80 ? ":80" : `:${port}`;
}

/** Folder name for `gdev <repo>` — matches _devkit/dev-ports.json keys */
function devRepoName(project) {
  if (project.devRepo) return project.devRepo;
  if (project.id === "gigazonk") return "GigaZonk";
  return project.id;
}

/** @returns {Promise<boolean>} */
async function probeDevPort(port) {
  const url = localDevUrl(port);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    await fetch(url, { method: "GET", mode: "no-cors", cache: "no-store", signal: controller.signal });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

function applyLocalDevLinkState(el, online, port, repoName) {
  const label = localDevLabel(port);
  const icon = ICONS.local;
  const next = document.createElement("a");
  next.className = `link-btn link-btn--local ${online ? "link-btn--online" : "link-btn--offline"}`;
  next.href = localDevUrl(port);
  next.target = "_blank";
  next.rel = "noopener noreferrer";
  next.dataset.devPort = String(port);
  next.dataset.devRepo = repoName;
  next.title = online
    ? `Dev server running on port ${port}`
    : `Dev server not detected on port ${port} — run: gdev ${repoName}`;
  next.innerHTML = `${icon}${label}`;
  el.replaceWith(next);
}

async function refreshLocalDevLinks() {
  if (!isLocalDev()) return;
  const nodes = document.querySelectorAll("[data-dev-port]");
  await Promise.all(
    [...nodes].map(async (el) => {
      const port = Number(el.dataset.devPort);
      const repoName = el.dataset.devRepo ?? "";
      const online = await probeDevPort(port);
      const wasOnline = el.classList.contains("link-btn--online");
      const wasOffline = el.classList.contains("link-btn--offline");
      if (online && wasOnline) return;
      if (!online && wasOffline) return;
      applyLocalDevLinkState(el, online, port, repoName);
    })
  );
}

let localDevProbeTimer = null;

function scheduleLocalDevProbe() {
  if (!isLocalDev()) return;
  if (localDevProbeTimer) clearTimeout(localDevProbeTimer);
  localDevProbeTimer = setTimeout(() => {
    refreshLocalDevLinks();
    scheduleLocalDevProbe();
  }, 8000);
}

/** @type {Record<string, string>} id -> rendered readme html (or "" when unavailable) */
const readmeCache = {};

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isTableSeparator(line) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function splitTableRow(line) {
  let row = line.trim();
  if (row.startsWith("|")) row = row.slice(1);
  if (row.endsWith("|")) row = row.slice(0, -1);
  return row.split("|").map((cell) => cell.trim());
}

function readmeLinkBase(project, sourceUrl) {
  const raw = String(sourceUrl || "").match(
    /^https:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.*)$/
  );
  if (raw) {
    const dir = raw[4].includes("/") ? raw[4].slice(0, raw[4].lastIndexOf("/") + 1) : "";
    return `https://github.com/${raw[1]}/${raw[2]}/blob/${raw[3]}/${dir}`;
  }
  const gh = project.links?.github?.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (!gh) return "";
  const branch = project.readmeBranch || "main";
  return `https://github.com/${gh[1]}/${gh[2]}/blob/${branch}/`;
}

function resolveReadmeHref(href, base) {
  if (!base || /^(https?:|mailto:|#|\/\/)/i.test(href)) return href;
  return `${base}${href.replace(/^\.\//, "")}`;
}

/** Tiny markdown renderer — enough for repo READMEs, no dependencies. */
function markdownToHtml(md, linkBase) {
  const codeBlocks = [];
  let text = md.replace(/\r\n/g, "\n").replace(/```([a-zA-Z0-9]*)\n?([\s\S]*?)```/g, (_m, lang, code) => {
    const cls = lang ? ` class="language-${escapeHtml(lang)}"` : "";
    codeBlocks.push(`<pre class="readme-pre"><code${cls}>${escapeHtml(code.replace(/\n$/, ""))}</code></pre>`);
    return `\u0000CODEBLOCK${codeBlocks.length - 1}\u0000`;
  });

  text = escapeHtml(text);

  const lines = text.split(/\r?\n/);
  const out = [];
  let listType = null;
  let inParagraph = false;

  const closeList = () => {
    if (listType) {
      out.push(`</${listType}>`);
      listType = null;
    }
  };
  const closeParagraph = () => {
    if (inParagraph) {
      out.push("</p>");
      inParagraph = false;
    }
  };

  const inline = (s) =>
    s
      .replace(/!\[([^\]]*)\]\(([^)\s]+)[^)]*\)/g, '<span class="readme-img">🖼 $1</span>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)[^)]*\)/g, (_m, label, href) => {
        const url = resolveReadmeHref(href, linkBase);
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
      })
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|\W)\*([^*]+)\*/g, "$1<em>$2</em>")
      .replace(/(^|\W)_([^_]+)_/g, "$1<em>$2</em>");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].replace(/\s+$/, "");

    if (!line.trim()) {
      closeParagraph();
      closeList();
      continue;
    }

    const block = line.match(/^\u0000CODEBLOCK(\d+)\u0000$/);
    if (block) {
      closeParagraph();
      closeList();
      out.push(codeBlocks[Number(block[1])]);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      closeParagraph();
      closeList();
      const level = Math.min(heading[1].length + 3, 6);
      out.push(`<h${level} class="readme-h">${inline(heading[2].trim())}</h${level}>`);
      continue;
    }

    if (/^\s*([-*+]|\d+\.)\s+/.test(line)) {
      closeParagraph();
      const want = /^\s*\d+\./.test(line) ? "ol" : "ul";
      if (listType !== want) {
        closeList();
        out.push(`<${want} class="readme-list">`);
        listType = want;
      }
      out.push(`<li>${inline(line.replace(/^\s*([-*+]|\d+\.)\s+/, ""))}</li>`);
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      closeParagraph();
      closeList();
      out.push(`<blockquote class="readme-quote">${inline(line.replace(/^\s*>\s?/, ""))}</blockquote>`);
      continue;
    }

    if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) {
      closeParagraph();
      closeList();
      out.push('<hr class="readme-hr" />');
      continue;
    }

    if (line.trim().startsWith("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      closeParagraph();
      closeList();
      const header = splitTableRow(line);
      i += 2;
      const body = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        if (!isTableSeparator(lines[i])) body.push(splitTableRow(lines[i]));
        i += 1;
      }
      i -= 1;
      const headHtml = header.map((cell) => `<th>${inline(cell)}</th>`).join("");
      const bodyHtml = body
        .map((row) => `<tr>${row.map((cell) => `<td>${inline(cell)}</td>`).join("")}</tr>`)
        .join("");
      out.push(`<table class="readme-table"><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>`);
      continue;
    }

    closeList();
    if (!inParagraph) {
      out.push("<p>");
      inParagraph = true;
    } else {
      out.push(" ");
    }
    out.push(inline(line.trim()));
  }

  closeParagraph();
  closeList();
  return out.join("");
}

function slugify(name) {
  return String(name).toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Candidate locations for a project's README, most specific first. */
function readmeCandidates(project) {
  const sources = [];
  const localName = project.readme || `${slugify(project.id)}.md`;
  sources.push(new URL(`../data/readmes/${localName}`, import.meta.url).href);

  const gh = project.links?.github;
  if (gh) {
    const m = gh.match(/github\.com\/([^/]+)\/([^/]+)/i);
    if (m) {
      const [, owner, repo] = m;
      const branch = project.readmeBranch || "main";
      const path = project.readmePath || "README.md";
      sources.push(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`);
      sources.push(`https://raw.githubusercontent.com/${owner}/${repo}/master/${path}`);
    }
  }
  return sources;
}

async function fetchReadme(project) {
  if (project.id in readmeCache) return readmeCache[project.id];

  for (const url of readmeCandidates(project)) {
    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) continue;
      const md = await res.text();
      if (!md.trim()) continue;
      readmeCache[project.id] = markdownToHtml(md, readmeLinkBase(project, url));
      return readmeCache[project.id];
    } catch {
      /* try next source */
    }
  }

  readmeCache[project.id] = "";
  return "";
}

async function toggleReadme(panel, project) {
  const isOpen = panel.classList.contains("readme-panel--open");
  const trigger = panel.previousElementSibling;

  if (isOpen) {
    panel.classList.remove("readme-panel--open");
    panel.setAttribute("aria-hidden", "true");
    trigger?.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    return;
  }

  panel.hidden = false;
  panel.classList.add("readme-panel--open");
  panel.setAttribute("aria-hidden", "false");
  trigger?.setAttribute("aria-expanded", "true");

  if (panel.dataset.loaded === "1") return;

  const body = panel.querySelector(".readme-body");
  body.innerHTML = '<p class="readme-note">Loading README…</p>';

  const html = await fetchReadme(project);
  panel.dataset.loaded = "1";

  if (!html) {
    const gh = project.links?.github;
    body.innerHTML = `<p class="readme-note">This project has no README yet.${
      gh ? ` <a href="${gh}" target="_blank" rel="noopener noreferrer">View the repository</a>.` : ""
    }</p>`;
    return;
  }

  body.innerHTML = html;
}

let allProjects = [];
let activeFilter = "all";
let searchQuery = "";
let ownerHandle = "pfaustino";

async function loadData() {
  const url = new URL("../data/projects.json", import.meta.url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load projects: ${res.status}`);
  return res.json();
}

function renderStats(projects) {
  const playable = projects.filter(
    (p) => p.links.githubPages || p.links.itch || p.links.vercel || p.links.download || p.links.railway
  ).length;

  const stats = [
    { value: projects.length, label: "Projects" },
    { value: projects.filter((p) => p.category === "game").length, label: "Games" },
    { value: playable, label: "Playable" },
    { value: projects.filter((p) => p.status === "active").length, label: "Active" },
  ];

  document.getElementById("stats-bar").innerHTML = stats
    .map(
      (s) => `
      <div class="stat-pill">
        <span class="stat-value">${s.value}</span>
        <span class="stat-label">${s.label}</span>
      </div>`
    )
    .join("");
}

function renderLink(type, url, label) {
  if (url) {
    const filename = url.split("/").pop() || "download";
    const download = type === "download" ? ` download="${filename}"` : "";
    return `<a href="${url}" class="link-btn link-btn--${type}" target="_blank" rel="noopener noreferrer"${download}>${ICONS[type]}${label}</a>`;
  }
  return `<span class="link-btn link-btn--${type} link-btn--disabled" aria-hidden="true">${ICONS[type]}${label}</span>`;
}

/** Local dev server link — only on localhost; probes port before enabling */
function renderLocalDevLink(port, repoName) {
  if (!isLocalDev()) return "";
  if (port) {
    const label = localDevLabel(port);
    return `<a href="${localDevUrl(port)}" class="link-btn link-btn--local link-btn--pending" data-dev-port="${port}" data-dev-repo="${repoName}" target="_blank" rel="noopener noreferrer" title="Checking dev server…">${ICONS.local}${label}</a>`;
  }
  return `<span class="link-btn link-btn--local link-btn--disabled" aria-hidden="true" title="No local dev port configured">${ICONS.local}—</span>`;
}

/** @param {Project} project */
function renderCard(project) {
  const stackTags = project.stack
    .map((s) => `<span class="stack-tag">${s}</span>`)
    .join("");

  const updated = new Date(project.updated).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return `
    <article class="project-card" role="listitem" data-id="${project.id}">
      <div class="card-header">
        <div class="card-title-group">
          <h3 class="card-title">${project.name}</h3>
          <p class="card-tagline">${project.tagline}</p>
        </div>
        <div class="card-badges">
          <span class="badge badge-category">${CATEGORY_LABELS[project.category] ?? project.category}</span>
          <span class="badge badge-status-${project.status}">${STATUS_LABELS[project.status] ?? project.status}</span>
          ${project.private ? '<span class="badge badge-private">Private repo</span>' : ""}
        </div>
      </div>
      <p class="card-description">${project.description}</p>
      <div class="card-stack">${stackTags}</div>
      <p class="card-meta">Updated ${updated}</p>
      <div class="card-links">
        ${project.links.download ? renderLink("download", project.links.download, "Download") : ""}
        ${project.links.railway ? renderLink("railway", project.links.railway, "Play") : ""}
        ${renderLink("github", project.links.github, "GitHub")}
        ${renderLink("pages", project.links.githubPages, "Pages")}
        ${renderLink("itch", project.links.itch, "itch.io")}
        ${renderLocalDevLink(project.devPort ?? null, devRepoName(project))}
        ${renderLink("vercel", project.links.vercel, "Vercel")}
      </div>
      <button class="readme-toggle" type="button" data-readme-toggle
        aria-expanded="false" aria-controls="readme-${project.id}">
        ${ICONS.readme}<span>readme.md</span>${ICONS.chevron}
      </button>
      <div class="readme-panel" id="readme-${project.id}" data-readme-id="${project.id}"
        aria-hidden="true" hidden>
        <div class="readme-body"></div>
      </div>
    </article>`;
}

/** Public play links stay in All, Games, Apps, and Prototypes even when the repo is private. */
function hasPublicPlayLink(project) {
  const links = project.links ?? {};
  return Boolean(links.githubPages || links.itch || links.vercel || links.railway);
}

function getFilteredProjects() {
  return allProjects.filter((p) => {
    const isPrivate = Boolean(p.private);
    const hiddenPrivate = isPrivate && !hasPublicPlayLink(p);
    const matchesFilter =
      activeFilter === "private"
        ? isPrivate
        : !hiddenPrivate && (activeFilter === "all" || p.category === activeFilter);
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.stack.some((s) => s.toLowerCase().includes(q)) ||
      p.topics.some((t) => t.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });
}

function renderProjects() {
  const filtered = getFilteredProjects();
  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  const featuredSection = document.getElementById("featured-section");
  const featuredGrid = document.getElementById("featured-grid");
  const projectGrid = document.getElementById("project-grid");
  const emptyState = document.getElementById("empty-state");
  const heading = document.getElementById("projects-heading");

  if (activeFilter === "all" && !searchQuery && featured.length > 0) {
    featuredSection.hidden = false;
    featuredGrid.innerHTML = featured.map(renderCard).join("");
    heading.textContent = "More Projects";
    projectGrid.innerHTML = rest.map(renderCard).join("");
  } else {
    featuredSection.hidden = true;
    heading.textContent = "Projects";
    projectGrid.innerHTML = filtered.map(renderCard).join("");
  }

  emptyState.hidden = filtered.length > 0;
  refreshLocalDevLinks();
  scheduleLocalDevProbe();
}

function setupReadmeToggles() {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-readme-toggle]");
    if (!trigger) return;
    const panel = trigger.nextElementSibling;
    if (!panel || !panel.classList.contains("readme-panel")) return;
    const id = panel.dataset.readmeId;
    const project = allProjects.find((p) => p.id === id);
    if (!project) return;
    toggleReadme(panel, project);
  });
}

function setupFilters() {
  document.getElementById("category-filters").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects();
  });

  document.getElementById("search").addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderProjects();
  });
}

async function init() {
  try {
    setupThemeToggle();
    const data = await loadData();
    allProjects = data.projects;

    if (data.owner?.bio) {
      document.getElementById("owner-bio").textContent = data.owner.bio;
    }

    renderStats(allProjects);
    setupFilters();
    setupReadmeToggles();
    renderProjects();
    window.addEventListener("focus", () => refreshLocalDevLinks());
  } catch (err) {
    document.getElementById("project-grid").innerHTML = `
      <p class="empty-state">Could not load project data. ${err.message}</p>`;
  }
}

const THEME_KEY = "portfolio-theme";
const THEMES = ["midnight", "brutal", "aero", "glass", "chrome", "clay", "terminal", "lego"];
const THEME_LABELS = {
  midnight: "Midnight",
  brutal: "Brutal",
  aero: "Aero",
  glass: "Glass",
  chrome: "Y2K",
  clay: "Clay",
  terminal: "Terminal",
  lego: "Lego",
};

function getTheme() {
  const attr = document.documentElement.getAttribute("data-theme");
  return THEMES.includes(attr) ? attr : "midnight";
}

function nextTheme(current) {
  const i = THEMES.indexOf(current);
  return THEMES[(i < 0 ? 0 : i + 1) % THEMES.length];
}

function applyTheme(theme) {
  const next = THEMES.includes(theme) ? theme : "midnight";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (_) {
    /* ignore quota / private mode */
  }
  const btn = document.getElementById("theme-toggle");
  const label = document.getElementById("theme-toggle-label");
  const thumb = document.getElementById("theme-toggle-thumb");
  const upcoming = nextTheme(next);
  if (btn) {
    btn.title = `Next: ${THEME_LABELS[upcoming]}`;
    btn.setAttribute(
      "aria-label",
      `Theme ${THEME_LABELS[next]}. Click for ${THEME_LABELS[upcoming]}`
    );
  }
  if (label) label.textContent = THEME_LABELS[next];
  if (thumb) {
    const idx = THEMES.indexOf(next);
    const max = THEMES.length - 1;
    thumb.style.left = `calc(${(idx / max) * 100}% - ${(idx / max) * 0.7}rem)`;
  }
}

function setupThemeToggle() {
  applyTheme(getTheme());
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    applyTheme(nextTheme(getTheme()));
    dismissStylesCallout(true);
  });
  setupStylesCallout(btn);
}

const CALLOUT_KEY = "portfolio-styles-bubble-v1";

function setupStylesCallout(themeBtn) {
  const callout = document.getElementById("styles-callout");
  const dismissBtn = document.getElementById("styles-callout-dismiss");
  if (!callout || !dismissBtn) return;

  // Clear the old banner dismiss flag so the bubble can appear.
  try {
    localStorage.removeItem("portfolio-styles-callout-dismissed");
  } catch (_) {
    /* ignore */
  }

  let dismissed = false;
  try {
    dismissed = localStorage.getItem(CALLOUT_KEY) === "1";
  } catch (_) {
    dismissed = false;
  }
  if (dismissed) {
    callout.hidden = true;
    return;
  }

  callout.hidden = false;
  callout.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest(".styles-bubble__dismiss")) return;
    themeBtn.click();
    themeBtn.focus({ preventScroll: true });
  });
  dismissBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    dismissStylesCallout(true);
  });
}

function dismissStylesCallout(persist) {
  const callout = document.getElementById("styles-callout");
  if (callout) {
    callout.classList.add("styles-bubble--gone");
    window.setTimeout(() => {
      callout.hidden = true;
    }, 220);
  }
  if (!persist) return;
  try {
    localStorage.setItem(CALLOUT_KEY, "1");
  } catch (_) {
    /* ignore */
  }
}

init();
