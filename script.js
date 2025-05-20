/**
 * Manages the tab order of the form fields based on screen size (mobile/desktop).
 * Sets the tabIndex for each relevant input/select/trigger.
 */
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

/**
 * CountrySelect class
 * Handles custom dropdown for country selection in phone input.
 * Supports keyboard navigation, type-ahead search, ARIA accessibility, and mouse interaction.
 */
class CountrySelect {
  /**
   * @param {HTMLElement} container - The root element for the phone input instance.
   */
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
    this.searchString = "";
    this.searchTimeout = null;

    // Set initial tabindex for options
    this.options.forEach((option, index) => {
      option.setAttribute("tabindex", "-1");
    });

    this.bindEvents();
  }

  /**
   * Binds all event listeners for the dropdown and its options.
   */
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
        default:
          // Handle type-ahead search
          if (this.isOpen() && e.key.length === 1) {
            e.preventDefault();
            this.handleSearch(e.key);
          }
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
        default:
          // Handle type-ahead search
          if (e.key.length === 1) {
            e.preventDefault();
            this.handleSearch(e.key);
          }
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

  /**
   * Handles type-ahead search for dropdown options.
   * @param {string} key - The character typed by the user.
   */
  handleSearch(key) {
    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Add character to search string
    this.searchString += key.toLowerCase();
    // Find matching option
    const matchingOption = this.options.find((option) => {
      const text = option.textContent.toLowerCase().trim();
      return text.startsWith(this.searchString);
    });

    if (matchingOption) {
      const index = this.options.indexOf(matchingOption);
      this.highlightedIndex = index;
      this.clearHighlight();
      matchingOption.classList.add("phone-input__option--highlighted");
      matchingOption.focus();
    }

    // Reset search string after 1 second of inactivity
    this.searchTimeout = setTimeout(() => {
      this.searchString = "";
    }, 1000);
  }

  /**
   * Checks if the dropdown is currently open.
   * @returns {boolean}
   */
  isOpen() {
    return this.trigger.getAttribute("aria-expanded") === "true";
  }

  /**
   * Toggles the dropdown open/closed.
   */
  toggleDropdown() {
    this.isOpen() ? this.closeDropdown() : this.openDropdown();
  }

  /**
   * Opens the dropdown and highlights the current selection.
   */
  openDropdown() {
    this.trigger.setAttribute("aria-expanded", "true");
    this.dropdown.hidden = false;

    // Find the currently selected option or default to first
    const currentLabel = this.label.textContent;
    const currentIndex = this.options.findIndex(
      (opt) => opt.dataset.label === currentLabel
    );
    this.highlightedIndex = currentIndex >= 0 ? currentIndex : 0;

    // Set initial highlight
    this.clearHighlight();
    this.options[this.highlightedIndex].classList.add(
      "phone-input__option--highlighted"
    );
  }

  /**
   * Closes the dropdown and resets highlight/search.
   */
  closeDropdown() {
    this.trigger.setAttribute("aria-expanded", "false");
    this.dropdown.hidden = true;
    this.clearHighlight();
    this.highlightedIndex = -1;
    this.searchString = "";
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }

  /**
   * Selects an option, updates the UI, and closes the dropdown.
   * @param {HTMLElement} option - The option element to select.
   */
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

  /**
   * Moves the highlight up or down in the dropdown options.
   * @param {number} direction - 1 for down, -1 for up.
   */
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

  /**
   * Removes highlight from all options.
   */
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

  // Handle form submission
  const form = document.querySelector(".trial-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check if form is valid
    if (!form.checkValidity()) {
      // Trigger browser's default validation UI
      form.reportValidity();
      return;
    }

    // If form is valid, proceed with submission
    const formData = new FormData(form);
    console.log(Object.fromEntries(formData));

    alert("Form submitted successfully, data sent to console.");

    form.reset();
  });
});
