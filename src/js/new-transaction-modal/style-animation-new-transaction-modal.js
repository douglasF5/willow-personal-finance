import smask from '../utils/field-masking.js';
import { showModal, hideModal } from '../modal.js';

//TGGLE MODAL VISIBILITY
const closeButton = document.getElementById('close-button-newtransaction-modal');
const modalTrigger = document.getElementById('button-add-new-transaction');

modalTrigger.onclick = () => {
    showModal('new-transaction-modal');
};

closeButton.onclick = () => {
    hideModal('new-transaction-modal');
};

//GO-AWAY CARD
export const modalInputTextFields = document.querySelectorAll('.text-input-container');
const submitButton = document.getElementById('submit-button-new-transaction-modal');
const modalOverLayer = document.getElementById('modal-over-layer');
const modalUnderLayer = document.getElementById('forms-new-transaction-modal');

function makeCardReady(flag) {

    if(flag) {
        modalOverLayer.classList.add('shorten-animatable-layer-modal');
        submitButton.disabled = false;
    } else {
        modalOverLayer.classList.remove('shorten-animatable-layer-modal');
        submitButton.disabled = true;
    }
}

function checkInputFields(inputFields) {
    let filledFields = 0;

    for(let field of inputFields) {
        if(field.children[1].value) filledFields++;
    }

    return filledFields === 3;
}

for(let field of modalInputTextFields) {
    field.addEventListener('input', () => {
        makeCardReady(checkInputFields(modalInputTextFields));
    });
}

submitButton.onclick = () => {
    modalOverLayer.classList.add('fly-away-animatable-layer-modal');
    submitButton.classList.add('hidden');
    modalUnderLayer.classList.add('success');
};

modalOverLayer.addEventListener('animationend', () => {
    setTimeout(() => {
        modalOverLayer.classList.remove('shorten-animatable-layer-modal');
        modalOverLayer.classList.remove('fly-away-animatable-layer-modal');
        modalUnderLayer.classList.remove('success');
        submitButton.classList.remove('hidden');
    }, 1500)
});

//TEXT INPUT FIELD STYLES
const amountField = document.getElementById('transaction-amount-text-field');
const dateField = document.getElementById('transaction-date-text-field');

smask.input(amountField, ["currency"]);
smask.input(dateField, ["date"]);

function animateInputTextField(fieldContainer) {
    const label = fieldContainer.children[0];
    const field = fieldContainer.children[1];

    if(field.value !== "") {
        label.classList.remove('animatable-label');
        label.classList.add('fixed-label');
    } else {
        label.classList.add('animatable-label');
        label.classList.remove('fixed-label');
    }
}

for(let fieldContainer of modalInputTextFields) {
    const field = fieldContainer.children[1];

    field.addEventListener('blur', () => {
        animateInputTextField(fieldContainer);
    });
}