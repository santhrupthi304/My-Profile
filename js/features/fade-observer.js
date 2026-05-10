(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  function observeAll() {
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
  }

  // Run after DOM + dynamic renders complete
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(observeAll, 100);
  });
})();
