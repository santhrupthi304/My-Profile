/* js/features/theme-toggle.js */

(function () {
  const html   = document.documentElement;
  const btn    = document.getElementById("theme-toggle");
  let   isDark = localStorage.getItem("theme") === "dark";

  function applyTheme() {
    html.setAttribute("data-theme", isDark ? "dark" : "light");
    if (btn) btn.textContent = isDark ? "☀️ Light" : "🌙 Dark";
  }

  function toggleTheme() {
    isDark = !isDark;
    localStorage.setItem("theme", isDark ? "dark" : "light");
    applyTheme();
  }

  // Apply saved theme on load
  applyTheme();

  // Attach click listener
  if (btn) btn.addEventListener("click", toggleTheme);
})();
