/* js/features/certificates-render.js */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("certs-container");
    if (!container || typeof certificatesData === "undefined") return;

    container.innerHTML = certificatesData
      .map(
        (c) => `
      <div class="cert-card fade-up">
        <div class="cert-icon">${c.icon}</div>
        <div class="cert-info">
          <h3>${c.title}</h3>
          <div class="issuer">${c.issuer}</div>
          <div class="year">${c.year}</div>
        </div>
      </div>`
      )
      .join("");
  });
})();
