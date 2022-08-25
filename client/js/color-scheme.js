import { setUpToolTip, updateToolTip } from "./tool-tip.js";

const themeToggleEl = document.getElementById('theme-button');
let currentTheme = 'dark';

export function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateToolTip(themeToggleEl, `${currentTheme === 'light' ? 'Dark' : 'Light'} theme (CTRL + T)`);
}

themeToggleEl.onclick = toggleTheme;

setUpToolTip(themeToggleEl, `${currentTheme === 'light' ? 'Dark' : 'Light'} theme (CTRL + T)`);