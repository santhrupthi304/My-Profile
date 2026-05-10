(function () {
  const bar = document.getElementById("scroll-bar");
  if (!bar) return;

  window.addEventListener("scroll", function () {
    const s   = document.documentElement;
    const pct = (s.scrollTop / (s.scrollHeight - s.clientHeight)) * 100;
    bar.style.width = pct + "%";
  });
})();
