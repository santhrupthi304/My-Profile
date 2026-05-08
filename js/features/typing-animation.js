/* js/features/typing-animation.js */

(function () {
  const words = [
    "MERN Developer",
    "Full-Stack Engineer",
    "Competitive Programmer",
    "React Enthusiast"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const el = document.getElementById("typing-text");
    if (!el) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
      el.textContent = currentWord.slice(0, --charIndex);
    } else {
      el.textContent = currentWord.slice(0, ++charIndex);
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(type, isDeleting ? 60 : 110);
  }

  document.addEventListener("DOMContentLoaded", type);
})();
