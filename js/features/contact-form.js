const FORMSPREE_ENDPOINT = "https://formspree.io/f/xzdoydak"; // ← replace YOUR_FORM_ID

(function () {

  document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("send-btn");
    if (sendBtn) sendBtn.addEventListener("click", sendContact);
  });

  function setStatus(msg, color) {
    const el = document.getElementById("form-status");
    if (!el) return;
    el.style.color = color || "var(--text2)";
    el.textContent = msg;
  }

  async function sendContact() {
    const nameEl    = document.getElementById("c-name");
    const emailEl   = document.getElementById("c-email");
    const subjectEl = document.getElementById("c-subject");
    const messageEl = document.getElementById("c-message");
    const btn       = document.getElementById("send-btn");

    const name    = nameEl?.value.trim()    || "";
    const email   = emailEl?.value.trim()   || "";
    const subject = subjectEl?.value.trim() || "";
    const message = messageEl?.value.trim() || "";

    if (!name || !email || !message) {
      setStatus("Please fill in all required fields.", "var(--accent)");
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      setStatus("Please enter a valid email address.", "var(--accent)");
      return;
    }

    setStatus("Sending…", "var(--text2)");
    if (btn) btn.disabled = true;

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name:    name,
          email:   email,
          subject: subject || "(no subject)",
          message: message
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Message sent! I'll reply soon.", "var(--teal)");
        [nameEl, emailEl, subjectEl, messageEl].forEach((el) => {
          if (el) el.value = "";
        });
      } else {
        const errorMsg =
          data?.errors?.map((e) => e.message).join(", ") ||
          "Something went wrong. Please try again.";
        setStatus("❌ " + errorMsg, "var(--accent)");
      }

    } catch (err) {
      console.error("Formspree error:", err);
      setStatus("❌ Network error. Please check your connection.", "var(--accent)");
    } finally {
      if (btn) btn.disabled = false;
    }
  }

})();