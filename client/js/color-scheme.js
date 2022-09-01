import { setUpToolTip, updateToolTip } from "./tool-tip.js";
import { get } from "./utils/utils.js";

const themeToggleEl = get('#theme-button');
let currentTheme = 'dark';

//SETTING UP TOOL TIP
setUpToolTip(themeToggleEl, `${currentTheme === 'light' ? 'Dark' : 'Light'} Theme`);

//TOGGLE THEME
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    updateToolTip(themeToggleEl, `${currentTheme === 'light' ? 'Dark' : 'Light'} Theme`);
}

themeToggleEl.onclick = toggleTheme;