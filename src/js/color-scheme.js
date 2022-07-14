import { setUpToolTip, updateToolTip } from "./tool-tip.js";

const themeToggleEl = document.getElementById('theme-button');
let currentTheme = 'light';

themeToggleEl.onclick = () => {
    document.body.classList.toggle('dark-theme');
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateToolTip(themeToggleEl, `${currentTheme === 'light' ? 'Dark' : 'Light'} theme`);
}

setUpToolTip(themeToggleEl, `${currentTheme === 'light' ? 'Dark' : 'Light'} theme`);