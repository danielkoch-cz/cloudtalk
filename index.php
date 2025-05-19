<?php get_header(); ?>

<main id="main" class="main">
    <form class="trial-form" novalidate>
        <h1 class="trial-form__heading">👋 14-Day Free Trial</h1>

        <ul class="trial-form__benefits">
            <li class="trial-form__benefit">1 Number</li>
            <li class="trial-form__benefit">$5 Credit</li>
            <li class="trial-form__benefit">No credit card required</li>
        </ul>

        <div class="trial-form__grid">
            <input type="text" name="firstName" class="trial-form__input" placeholder="First name*" required />
            <input type="text" name="lastName" class="trial-form__input" placeholder="Last name*" required />
            <input type="email" name="email" class="trial-form__input" placeholder="Company email*" required />
            <input type="password" name="password" class="trial-form__input" placeholder="Password*" required
                aria-describedby="passwordHelp" />
            <small id="passwordHelp">Password must contain 1 small letter, 1 capital letter, 1 number.</small>

            <select name="users" class="trial-form__select" required>
                <option value="">Number of users</option>
                <option value="1">1</option>
                <option value="2-10">2–10</option>
                <option value="10+">10+</option>
            </select>

            <div class="phone-input">
                <div class="phone-input__country" tabindex="0" role="combobox" aria-haspopup="listbox"
                    aria-expanded="false">
                    <img src="flags/cz.svg" alt="Czech flag" class="phone-input__flag" />
                    <span class="phone-input__selected-text">CZ</span>
                </div>
                <ul class="phone-input__dropdown" role="listbox" hidden>
                    <li class="phone-input__option" role="option" tabindex="0">
                        <img src="flags/cz.svg" alt="Czech flag" class="phone-input__flag" /> Czech Republic
                    </li>
                    <li class="phone-input__option" role="option" tabindex="0">
                        <img src="flags/us.svg" alt="US flag" class="phone-input__flag" /> United States
                    </li>
                    <li class="phone-input__option" role="option" tabindex="0">
                        <img src="flags/de.svg" alt="German flag" class="phone-input__flag" /> Germany
                    </li>
                </ul>
                <input type="tel" name="phone" class="trial-form__input"
                    placeholder="Phone number, e.g. +1 888-487-1675" required />
            </div>

            <label class="trial-form__checkbox">
                <input type="checkbox" required />
                I have read and agree to the <a href="#">Terms and Conditions</a>
            </label>

            <button type="submit" class="trial-form__button">Start a free trial</button>
        </div>

        <p class="trial-form__disclaimer">
            By starting a free trial, you acknowledge that CloudTalk will process your personal data based on legitimate
            interest. <a href="#">Privacy Notice</a>.
        </p>
    </form>
</main>

<?php get_footer(); ?>