(function () {
  "use strict";

  const body = document.body;
  const header = document.querySelector("#header");
  const preloader = document.querySelector("#preloader");
  const scrollTopBtn = document.querySelector(".scroll-top");
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  const onScroll = (fn) => document.addEventListener("scroll", fn);
  const onLoad = (fn) => window.addEventListener("load", fn);

  /* =============================
   * Header Scroll Effect
   * ============================= */
  function toggleScrolled() {
    if (!header) return;
    if (
      header.classList.contains("scroll-up-sticky") ||
      header.classList.contains("sticky-top") ||
      header.classList.contains("fixed-top")
    ) {
      body.classList.toggle("scrolled", window.scrollY > 100);
    }
  }

  /* =============================
   * Mobile Navigation
   * ============================= */
  function toggleMobileNav() {
    body.classList.toggle("mobile-nav-active");
    mobileNavToggleBtn?.classList.toggle("bi-list");
    mobileNavToggleBtn?.classList.toggle("bi-x");
  }

  mobileNavToggleBtn?.addEventListener("click", toggleMobileNav);

  document.querySelectorAll("#navmenu a").forEach((link) =>
    link.addEventListener("click", () => {
      if (body.classList.contains("mobile-nav-active")) toggleMobileNav();
    })
  );

  /* =============================
   * Preloader
   * ============================= */
  if (preloader) {
    onLoad(() => preloader.remove());
  }

  /* =============================
   * Scroll-to-Top Button
   * ============================= */
  function toggleScrollTop() {
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle("active", window.scrollY > 100);
    }
  }

  scrollTopBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* =============================
   * AOS Animation
   * ============================= */
  function aosInit() {
    if (window.AOS) {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }
  }

  /* =============================
   * Skills Progress Bars
   * ============================= */
  document.querySelectorAll(".skills-animation").forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: () => {
        item.querySelectorAll(".progress .progress-bar").forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /* =============================
   * PureCounter Init
   * ============================= */
  if (window.PureCounter) new PureCounter();

  /* =============================
   * Swiper Sliders
   * ============================= */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach((swiperElement) => {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  /* =============================
   * GLightbox Init
   * ============================= */
  if (window.GLightbox) {
    GLightbox({ selector: ".glightbox" });
  }

  /* =============================
   * Isotope Layout
   * ============================= */
  document.querySelectorAll(".isotope-layout").forEach((isotopeItem) => {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    imagesLoaded(isotopeItem.querySelector(".isotope-container"), () => {
      let initIsotope = new Isotope(isotopeItem.querySelector(".isotope-container"), {
        itemSelector: ".isotope-item",
        layoutMode: layout,
        filter: filter,
        sortBy: sort,
      });

      isotopeItem.querySelectorAll(".isotope-filters li").forEach((filterBtn) =>
        filterBtn.addEventListener("click", function () {
          isotopeItem
            .querySelector(".isotope-filters .filter-active")
            ?.classList.remove("filter-active");
          this.classList.add("filter-active");
          initIsotope.arrange({ filter: this.getAttribute("data-filter") });
          aosInit();
        })
      );
    });
  });

  /* =============================
   * Smooth Scroll & Active Link Highlight
   * ============================= */
  document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("#navmenu a[href^='#']");
    const sections = document.querySelectorAll("section[id]");

    // Smooth Scroll
    navLinks.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        if (!targetId) return;
        const target = document.getElementById(targetId);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 50,
            behavior: "smooth",
          });
        }
      })
    );

    // Highlight Active Section
    onScroll(() => {
      let scrollPos = window.scrollY + 65;
      sections.forEach((section) => {
        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const active = document.querySelector(`#navmenu a[href="#${section.id}"]`);
          active?.classList.add("active");
        }
      });
    });
  });

  /* =============================
   * Init on Load & Scroll
   * ============================= */
  onLoad(() => {
    toggleScrolled();
    toggleScrollTop();
    aosInit();
    initSwiper();
  });

  onScroll(() => {
    toggleScrolled();
    toggleScrollTop();
  });
})();

