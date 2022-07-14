const themeToggleEl = document.getElementById('theme-button');

themeToggleEl.onclick = () => {
    document.body.classList.toggle('dark-theme');
};