//TGGLE MODAL VISIBILITY
let modalOpen = null;

export function showModal(elementId) {
    modalOpen = document.getElementById(elementId);
    modalOpen.setAttribute("data-is-hidden", "false");

    modalOpen.onclick = (e) => {
        if(e.target === modalOpen) hideModal(modalOpen.id);
    }
}

export function hideModal(elementId) {
    if(!(modalOpen.id === elementId)) return;

    modalOpen.classList.add('fade-out-modal');

    setTimeout(() => {
        modalOpen.setAttribute("data-is-hidden", "true");
        modalOpen.classList.remove('fade-out-modal');
        modalOpen = null;
    }, 200);
}