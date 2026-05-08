/* js/features/skills-render.js */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("skills-container");
    if (!container || typeof skillsData === "undefined") return;

    container.innerHTML = skillsData
      .map(
        (s) => `
      <div class="skill-card fade-up">
        <div class="skill-icon">${s.shortLabel}</div>
        <h3>${s.name}</h3>
        <p>${s.description}</p>
      </div>`
      )
      .join("");
  });
})();
