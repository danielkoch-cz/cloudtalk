// Tab order management
function updateFormTabOrder() {
  const isMobile = window.innerWidth < 990;
  const elements = {
    firstName: document.querySelector(".trial-form__input--first-name"),
    lastName: document.querySelector(".trial-form__input--last-name"),
    email: document.querySelector(".trial-form__input--email"),
    password: document.querySelector(".trial-form__input--password"),
    users: document.querySelector(".trial-form__select--users"),
    phone: document.querySelector(".phone-input__country"),
  };

  // Mobile order: firstName -> lastName -> email -> password -> users -> phone
  if (isMobile) {
    elements.firstName.tabIndex = 1;
    elements.lastName.tabIndex = 2;
    elements.email.tabIndex = 3;
    elements.password.tabIndex = 4;
    elements.users.tabIndex = 5;
    elements.phone.tabIndex = 6;
  }
  // Desktop order: firstName -> lastName -> email -> users -> password -> phone
  else {
    elements.firstName.tabIndex = 1;
    elements.lastName.tabIndex = 2;
    elements.email.tabIndex = 3;
    elements.users.tabIndex = 4;
    elements.password.tabIndex = 5;
    elements.phone.tabIndex = 6;
  }
}

class CountrySelect {
  constructor(container) {
    this.container = container;
    this.trigger = container.querySelector(".phone-input__country");
    this.dropdown = container.querySelector(".phone-input__dropdown");
    this.label = container.querySelector(".phone-input__label");
    this.flag = this.trigger.querySelector("img");
    this.phoneInput = container.querySelector(".phone-input__number");
    this.hiddenInput = container.querySelector(".phone-input__hidden");
    this.options = Array.from(
      container.querySelectorAll(".phone-input__option")
    );

    this.highlightedIndex = -1;

    this.bindEvents();
  }

  bindEvents() {
    this.trigger.addEventListener("click", () => this.toggleDropdown());

    this.trigger.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          this.openDropdown();
          this.moveHighlight(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          this.openDropdown();
          this.moveHighlight(-1);
          break;
        case "Enter":
        case " ":
        case "Spacebar":
          e.preventDefault();
          if (!this.isOpen()) {
            this.openDropdown();
            this.moveHighlight(0);
          } else if (this.highlightedIndex > -1) {
            this.selectOption(this.options[this.highlightedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          this.closeDropdown();
          break;
      }
    });

    // Add keyboard navigation for dropdown options
    this.dropdown.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          this.moveHighlight(1);
          break;
        case "ArrowUp":
          e.preventDefault();
          this.moveHighlight(-1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (this.highlightedIndex > -1) {
            this.selectOption(this.options[this.highlightedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          this.closeDropdown();
          break;
        case "Tab":
          this.closeDropdown();
          break;
      }
    });

    // Close dropdown if user tabs away from trigger
    this.trigger.addEventListener("blur", (e) => {
      setTimeout(() => {
        if (!this.container.contains(document.activeElement)) {
          this.closeDropdown();
        }
      }, 100);
    });

    // Mouse selection
    this.options.forEach((option) => {
      option.addEventListener("click", () => this.selectOption(option));
      option.addEventListener("mouseenter", () => {
        this.highlightedIndex = this.options.indexOf(option);
        this.clearHighlight();
        option.classList.add("phone-input__option--highlighted");
      });
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.container.contains(e.target)) {
        this.closeDropdown();
      }
    });
  }

  isOpen() {
    return this.trigger.getAttribute("aria-expanded") === "true";
  }

  toggleDropdown() {
    this.isOpen() ? this.closeDropdown() : this.openDropdown();
  }

  openDropdown() {
    this.trigger.setAttribute("aria-expanded", "true");
    this.dropdown.hidden = false;
    // Set initial highlight if none is set
    if (this.highlightedIndex === -1) {
      this.moveHighlight(0);
    }
  }

  closeDropdown() {
    this.trigger.setAttribute("aria-expanded", "false");
    this.dropdown.hidden = true;
    this.clearHighlight();
    this.highlightedIndex = -1;
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
    this.trigger.focus();
  }

  moveHighlight(direction) {
    this.clearHighlight();

    this.highlightedIndex += direction;
    if (this.highlightedIndex < 0)
      this.highlightedIndex = this.options.length - 1;
    if (this.highlightedIndex >= this.options.length) this.highlightedIndex = 0;

    const option = this.options[this.highlightedIndex];
    option.classList.add("phone-input__option--highlighted");
    option.focus();
  }

  clearHighlight() {
    this.options.forEach((opt) =>
      opt.classList.remove("phone-input__option--highlighted")
    );
  }
}

// Initialize all instances
document.addEventListener("DOMContentLoaded", () => {
  // Initialize country select
  document.querySelectorAll(".phone-input").forEach((container) => {
    new CountrySelect(container);
  });

  // Set initial tab order
  updateFormTabOrder();

  // Update tab order on window resize
  window.addEventListener("resize", updateFormTabOrder);
});
