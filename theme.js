
/* =========================================
   PORTFOLIO LIGHT / DARK THEME
========================================= */

(function () {
    const root = document.documentElement;
    const storageKey = "portfolio-theme";

    // Restore the visitor's saved preference.
    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem(storageKey);
    } catch (error) {
        // Continue with dark mode if storage is unavailable.
    }

    const initialTheme =
        savedTheme === "light" ? "light" : "dark";

    root.setAttribute("data-theme", initialTheme);

    function updateToggle() {
        const toggle = document.getElementById("themeToggle");

        if (!toggle) return;

        const isLight =
            root.getAttribute("data-theme") === "light";

        toggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );

        toggle.setAttribute("aria-pressed", String(isLight));

        toggle.title =
            isLight ? "Switch to dark mode" : "Switch to light mode";
    }

    function initializeThemeToggle() {
        const toggle = document.getElementById("themeToggle");

        if (!toggle) return;

        updateToggle();

        toggle.addEventListener("click", function () {
            const currentTheme = root.getAttribute("data-theme");

            const nextTheme =
                currentTheme === "dark" ? "light" : "dark";

            root.classList.add("theme-transitioning");

            root.setAttribute("data-theme", nextTheme);

            setTimeout(() => {
                root.classList.remove("theme-transitioning");
            }, 500);

            try {
                localStorage.setItem(storageKey, nextTheme);
            } catch (error) {
                // Theme still works for the current page.
            }

            updateToggle();
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializeThemeToggle
        );
    } else {
        initializeThemeToggle();
    }
})();
