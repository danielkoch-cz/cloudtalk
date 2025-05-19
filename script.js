class CountrySelect {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.trigger = this.container.querySelector(".phone-input__country");
    this.dropdown = this.container.querySelector(".phone-input__dropdown");
    this.selectedText = this.container.querySelector(
      ".phone-input__selected-text"
    );
    this.selectedFlag = this.trigger.querySelector("img");

    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Toggle dropdown on trigger click
    this.trigger.addEventListener("click", () => {
      const expanded = this.trigger.getAttribute("aria-expanded") === "true";
      this.trigger.setAttribute("aria-expanded", String(!expanded));
      this.dropdown.hidden = expanded;
    });

    // Handle dropdown item selection
    this.dropdown.addEventListener("click", (e) => {
      const option = e.target.closest(".phone-input__option");
      if (option) this.selectOption(option);
    });

    // Close dropdown on outside click
    document.addEventListener("click", (e) => {
      if (!this.container.contains(e.target)) {
        this.closeDropdown();
      }
    });
  }

  selectOption(option) {
    const flag = option.querySelector("img");
    this.selectedText.textContent = option.textContent.trim();
    this.selectedFlag.src = flag.src;
    this.selectedFlag.alt = flag.alt;

    this.closeDropdown();
  }

  closeDropdown() {
    this.dropdown.hidden = true;
    this.trigger.setAttribute("aria-expanded", "false");
  }
}

// Initialize all instances on the page
document.addEventListener("DOMContentLoaded", () => {
  const selectors = document.querySelectorAll(".phone-input");
  selectors.forEach((el, i) => {
    el.classList.add(`phone-input--instance-${i}`);
    new CountrySelect(`.phone-input--instance-${i}`);
  });
});
