document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    document.querySelectorAll(".nav-item > a").forEach(link => {
      link.addEventListener("click", event => {
        if (window.matchMedia("(max-width: 900px)").matches) {
          const parent = link.closest(".nav-item");
          if (parent && parent.querySelector(".dropdown")) {
            event.preventDefault();
            parent.classList.toggle("open");
          }
        }
      });
    });
    document.querySelectorAll(".nested > a").forEach(link => {
      link.addEventListener("click", event => {
        if (window.matchMedia("(max-width: 900px)").matches) {
          event.preventDefault();
          link.parentElement.classList.toggle("open");
        }
      });
    });
  }

  // Fading homepage slideshow
  const slides = [...document.querySelectorAll(".hero-slide")];
  if (slides.length) {
    let current = 0;
    const count = document.querySelector(".slide-count");
    const show = index => {
      slides[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      if (count) count.innerHTML = `<b>${String(current + 1).padStart(2, "0")}</b> / ${String(slides.length).padStart(2, "0")}`;
    };
    document.querySelector(".slide-next")?.addEventListener("click", () => show(current + 1));
    document.querySelector(".slide-prev")?.addEventListener("click", () => show(current - 1));
    let timer = setInterval(() => show(current + 1), 5500);
    const hero = document.querySelector(".hero");
    hero?.addEventListener("mouseenter", () => clearInterval(timer));
    hero?.addEventListener("mouseleave", () => { clearInterval(timer); timer = setInterval(() => show(current + 1), 5500); });
  }

  // Filter homepage program cards
  const tabs = document.querySelectorAll(".program-tab");
  const cards = document.querySelectorAll(".program-card[data-level]");
  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
    const filter = tab.dataset.filter;
    cards.forEach(card => { card.hidden = filter !== "all" && card.dataset.level !== filter; });
  }));
});