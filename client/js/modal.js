import { get, append } from './utils/utils.js';

let openModal = null;
const modalOuterContainer = get('#modal-outer-container');

modalOuterContainer.onclick = (e) => {
    if (e.target === modalOuterContainer) hideModal();
};

export function showModal(modal) {
    openModal = modal;
    append(modalOuterContainer, [modal]);
    modalOuterContainer.setAttribute("data-is-hidden", "false");
}

export function hideModal() {
    modalOuterContainer.innerHTML = '';
    openModal.innerHTML = '';
    modalOuterContainer.classList.add('fade-out-modal');

    setTimeout(() => {
        modalOuterContainer.setAttribute("data-is-hidden", "true");
        modalOuterContainer.classList.remove('fade-out-modal');
        openModal = null;
    }, 200);
}