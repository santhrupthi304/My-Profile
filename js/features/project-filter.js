(function () {
  let activeFilter = "All";

  function getCategories() {
    return ["All", ...new Set(projectsData.map((p) => p.category))];
  }

  function renderFilters() {
    const container = document.getElementById("filter-tags");
    if (!container) return;

    container.innerHTML = getCategories()
      .map(
        (cat) =>
          `<button class="filter-tag${cat === activeFilter ? " active" : ""}"
                   data-filter="${cat}">${cat}</button>`
      )
      .join("");

    container.querySelectorAll(".filter-tag").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeFilter = btn.dataset.filter;
        renderFilters();
        renderProjects();
      });
    });
  }

  // Expose so project-search can call renderProjects with filter
  window.getActiveFilter = () => activeFilter;

  // Initial render
  document.addEventListener("DOMContentLoaded", () => {
    renderFilters();
  });
})();
