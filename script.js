(function () {
  const menuButton = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      document.body.classList.toggle("menu-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        nav.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  const defaultCount = 1284;
  const countKey = "optiqWaitlistCount";
  const countNodes = document.querySelectorAll("[data-waitlist-count]");
  const getCount = () => Number(localStorage.getItem(countKey) || defaultCount);
  const setCountText = () => {
    const count = getCount().toLocaleString();
    countNodes.forEach((node) => {
      node.textContent = count;
    });
  };

  setCountText();

  document.querySelectorAll("[data-waitlist-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const message = form.querySelector("[data-form-message]");

      if (!(input instanceof HTMLInputElement) || !(message instanceof HTMLElement)) {
        return;
      }

      const email = input.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValid) {
        message.textContent = "Enter a valid work email to request access.";
        message.classList.remove("success");
        input.focus();
        return;
      }

      localStorage.setItem(countKey, String(getCount() + 1));
      setCountText();
      message.textContent = "You're on the waitlist. We'll send early-access details soon.";
      message.classList.add("success");
      input.value = "";
    });
  });

  document.querySelectorAll("[data-pricing-toggle]").forEach((toggle) => {
    const buttons = toggle.querySelectorAll("[data-billing]");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const mode = button.getAttribute("data-billing") || "annual";
        buttons.forEach((item) => item.classList.toggle("active", item === button));
        document.querySelectorAll("[data-price]").forEach((price) => {
          const value = price.getAttribute(mode === "monthly" ? "data-monthly" : "data-annual");
          if (value) {
            price.textContent = value;
          }
        });
      });
    });
  });

  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const list = button.closest(".faq-list");
      if (!item || !list) {
        return;
      }

      list.querySelectorAll(".faq-item").forEach((faqItem) => {
        if (faqItem !== item) {
          faqItem.classList.remove("open");
        }
      });
      item.classList.toggle("open");
    });
  });

  document.querySelectorAll("[data-faq-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-faq-tab");
      document.querySelectorAll("[data-faq-tab]").forEach((item) => {
        item.classList.toggle("active", item === tab);
      });
      document.querySelectorAll("[data-faq-list]").forEach((list) => {
        list.classList.toggle("hidden", list.getAttribute("data-faq-list") !== target);
      });
    });
  });

  document.querySelectorAll("[data-card-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const prev = carousel.querySelector("[data-carousel-prev]");
    const next = carousel.querySelector("[data-carousel-next]");

    if (!(track instanceof HTMLElement)) {
      return;
    }

    const scrollByCard = (direction) => {
      const firstCard = track.firstElementChild;
      const cardWidth = firstCard instanceof HTMLElement ? firstCard.offsetWidth + 24 : 540;
      track.scrollBy({ left: cardWidth * direction, behavior: "smooth" });
    };

    if (prev) {
      prev.addEventListener("click", () => scrollByCard(-1));
    }

    if (next) {
      next.addEventListener("click", () => scrollByCard(1));
    }
  });
})();
