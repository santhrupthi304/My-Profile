(function () {
  const btn = document.getElementById("topBtn");
  if (!btn) return;

  window.addEventListener("scroll", function () {
    const scrolled = document.documentElement.scrollTop;
    btn.style.display = scrolled > 300 ? "flex" : "none";
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
