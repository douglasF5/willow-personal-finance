export function setUpToolTip(element, content) {
    element.setAttribute('data-tool-tip', content);

    element.addEventListener('mouseover', () => {
        element.classList.add('has-tool-tip');
    });

    element.addEventListener('blur', () => {
        element.classList.remove('has-tool-tip');
    });
}

export function updateToolTip(element, content) {
    element.setAttribute('data-tool-tip', content);
}