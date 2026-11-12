// Loaded in <head> without defer so the theme is set before the page paints.
const THEME_KEY = "theme";
const root = document.documentElement;

function getSavedTheme() {
    try {
        return localStorage.getItem(THEME_KEY);
    } catch {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch {
        // storage can be blocked; the toggle still works for this visit
    }
}

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = getSavedTheme() || (prefersDark ? "dark" : "light");

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#theme-toggle");

    function updateButton() {
        button.textContent = root.dataset.theme === "dark" ? "Light mode" : "Dark mode";
    }

    button.addEventListener("click", () => {
        root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
        saveTheme(root.dataset.theme);
        updateButton();
    });

    updateButton();
    button.hidden = false;
});
