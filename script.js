class CountrySelect {
  constructor(container) {
    this.container = container;
    this.trigger = container.querySelector(".phone-input__country");
    this.dropdown = container.querySelector(".phone-input__dropdown");
    this.label = container.querySelector(".phone-input__label");
    this.flag = this.trigger.querySelector("img");
    this.phoneInput = container.querySelector(".phone-input__number");
    this.hiddenInput = container.querySelector(".phone-input__hidden");
    this.options = container.querySelectorAll(".phone-input__option");

    this.bindEvents();
  }

  bindEvents() {
    this.trigger.addEventListener("click", () => this.toggleDropdown());

    this.options.forEach((option) => {
      option.addEventListener("click", () => this.selectOption(option));
    });

    document.addEventListener("click", (e) => {
      if (!this.container.contains(e.target)) {
        this.closeDropdown();
      }
    });

    this.container.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeDropdown();
    });
  }

  toggleDropdown() {
    const expanded = this.trigger.getAttribute("aria-expanded") === "true";
    this.trigger.setAttribute("aria-expanded", String(!expanded));
    this.dropdown.hidden = expanded;
  }

  selectOption(option) {
    const label = option.dataset.label;
    const code = option.dataset.code;
    const flag = option.querySelector("img");

    this.label.textContent = label;
    this.flag.src = flag.src;
    this.flag.alt = flag.alt;
    this.phoneInput.placeholder = code;
    this.hiddenInput.value = code;

    this.closeDropdown();
  }

  closeDropdown() {
    this.trigger.setAttribute("aria-expanded", "false");
    this.dropdown.hidden = true;
  }
}

// Initialize all instances
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".phone-input").forEach((container) => {
    new CountrySelect(container);
  });
});
