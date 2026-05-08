/* js/features/project-search.js
   Also handles rendering project cards (combines filter + search). */

function renderProjects() {
  const container = document.getElementById("projects-container");
  if (!container) return;

  const filter = window.getActiveFilter ? window.getActiveFilter() : "All";
  const query  = (document.getElementById("project-search")?.value || "").toLowerCase();

  const filtered = projectsData.filter((p) => {
    const matchCat = filter === "All" || p.category === filter;
    const matchQ   =
      !query ||
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.technologies.some((t) => t.toLowerCase().includes(query));
    return matchCat && matchQ;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p class="no-results">No projects found.</p>`;
    return;
  }

  container.innerHTML = filtered
    .map(
      (p) => `
    <div class="project-card fade-up visible">
      <span class="project-badge">${p.category}</span>
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <div class="tech-stack">
        ${p.technologies.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
      </div>
      <div class="project-links">
        <a href="${p.liveDemo}" class="link-btn link-live">🚀 Live Demo</a>
        <a href="${p.github}"   class="link-btn link-gh">⭐ GitHub</a>
      </div>
    </div>`
    )
    .join("");
}

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    renderProjects();

    const searchInput = document.getElementById("project-search");
    if (searchInput) {
      searchInput.addEventListener("input", renderProjects);
    }
  });
})();
