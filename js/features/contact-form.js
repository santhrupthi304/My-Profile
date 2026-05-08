/* js/features/contact-form.js
   Email notifications via EmailJS.

   SETUP INSTRUCTIONS:
   1. Create a free account at https://www.emailjs.com
   2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID
   3. Create an Email Template with these variables:
        {{from_name}}   — sender's name
        {{from_email}}  — sender's email
        {{subject}}     — subject line
        {{message}}     — message body
      Copy the Template ID.
   4. Go to Account → API Keys → copy your Public Key.
   5. Replace the three placeholder strings below with your real IDs.
*/

const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";   // ← replace
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";   // ← replace
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";  // ← replace

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // Initialise EmailJS
    if (typeof emailjs !== "undefined") {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const sendBtn = document.getElementById("send-btn");
    if (sendBtn) sendBtn.addEventListener("click", sendContact);
  });

  function setStatus(msg, color) {
    const el = document.getElementById("form-status");
    if (!el) return;
    el.style.color   = color || "var(--text2)";
    el.textContent   = msg;
  }

  function sendContact() {
    const name    = document.getElementById("c-name")?.value.trim()    || "";
    const email   = document.getElementById("c-email")?.value.trim()   || "";
    const subject = document.getElementById("c-subject")?.value.trim() || "";
    const message = document.getElementById("c-message")?.value.trim() || "";
    const btn     = document.getElementById("send-btn");

    // Validation
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

    if (typeof emailjs === "undefined") {
      setStatus("EmailJS not loaded. Check your internet connection.", "var(--accent)");
      if (btn) btn.disabled = false;
      return;
    }

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:  name,
        from_email: email,
        subject:    subject || "(no subject)",
        message:    message
      })
      .then(() => {
        setStatus("✅ Message sent! I'll reply soon.", "var(--teal)");
        ["c-name", "c-email", "c-subject", "c-message"].forEach(
          (id) => { if (document.getElementById(id)) document.getElementById(id).value = ""; }
        );
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("❌ Failed to send. Please email me directly.", "var(--accent)");
      })
      .finally(() => {
        if (btn) btn.disabled = false;
      });
  }
})();
