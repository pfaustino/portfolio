const ICONS = {
  github: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  pages: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
  itch: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 2C3.67 2 3 2.67 3 3.5v17c0 .83.67 1.5 1.5 1.5h15c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5h-15zm8.28 5.28c.39-.39 1.02-.39 1.41 0l4.5 4.5c.39.39.39 1.02 0 1.41l-4.5 4.5a.996.996 0 0 1-1.41-1.41L15.59 12l-3.3-3.31a.996.996 0 0 1 0-1.41z"/></svg>`,
  vercel: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L2 19.5h20L12 2z"/></svg>`,
  download: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a1 1 0 0 1 1 1v9.59l2.3-2.3a1 1 0 1 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.42L11 13.59V4a1 1 0 0 1 1-1zm-7 14a1 1 0 0 1 1 1v1h12v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1z"/></svg>`,
  local: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v10H4V6zm2 2v6h12V8H6zm2 10h8v2H8v-2z"/></svg>`,
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

let allProjects = [];
let activeFilter = "all";
let searchQuery = "";

async function loadData() {
  const url = new URL("../data/projects.json", import.meta.url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load projects: ${res.status}`);
  return res.json();
}

function renderStats(projects) {
  const playable = projects.filter(
    (p) => p.links.githubPages || p.links.itch || p.links.vercel || p.links.download
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
        ${renderLink("github", project.links.github, "GitHub")}
        ${renderLink("pages", project.links.githubPages, "Pages")}
        ${renderLink("itch", project.links.itch, "itch.io")}
        ${renderLocalDevLink(project.devPort ?? null, devRepoName(project))}
        ${renderLink("vercel", project.links.vercel, "Vercel")}
      </div>
    </article>`;
}

function getFilteredProjects() {
  return allProjects.filter((p) => {
    const matchesFilter = activeFilter === "all" || p.category === activeFilter;
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
  });
}

init();
