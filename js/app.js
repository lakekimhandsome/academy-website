(function () {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const btnConsult = document.getElementById("btn-consult");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");
  const consultForm = document.getElementById("consult-form");
  const formSuccess = document.getElementById("form-success");

  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }

  function openModal() {
    modalOverlay.classList.remove("hidden");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.getElementById("name").focus();
  }

  function closeModal() {
    modalOverlay.classList.add("hidden");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function toggleNav() {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener("click", toggleNav);

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  btnConsult.addEventListener("click", openModal);

  document.querySelectorAll('a[href="#consult"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (link.classList.contains("nav-cta") || link.classList.contains("btn-primary")) {
        e.preventDefault();
        openModal();
      }
    });
  });

  modalClose.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
      closeModal();
    }
  });

  consultForm.addEventListener("submit", function (e) {
    e.preventDefault();
    consultForm.classList.add("hidden");
    formSuccess.classList.remove("hidden");

    setTimeout(function () {
      closeModal();
      consultForm.reset();
      consultForm.classList.remove("hidden");
      formSuccess.classList.add("hidden");
    }, 2500);
  });
})();
