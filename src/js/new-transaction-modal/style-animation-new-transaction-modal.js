import smask from '../utils/field-masking.js';

//TGGLE MODAL VISIBILITY
const closeButton = document.getElementById('close-button-newtransaction-modal');
const modalTrigger = document.getElementById('button-add-new-transaction');
const newTransactionModal = document.getElementById('new-transaction-modal');

function showModal() {
    newTransactionModal.setAttribute("data-is-hidden", "false");
}

export function hideModal() {
    newTransactionModal.classList.add('fade-out-modal');
    setTimeout(() => {
        newTransactionModal.classList.remove('fade-out-modal');
        newTransactionModal.setAttribute("data-is-hidden", "true");
    }, 200);
}

modalTrigger.onclick = showModal;
closeButton.onclick = hideModal;

newTransactionModal.onclick = (e) => {
    if(e.target === newTransactionModal) hideModal();
}

//GO-AWAY CARD
const fieldTransactionDate = document.getElementById('transaction-date-text-field');
const submitButton = document.getElementById('submit-button-new-transaction-modal');
const modalOverLayer = document.getElementById('modal-over-layer');

function animateModalOverLayer() {
    modalOverLayer.classList.add('shorten-animatable-layer-modal');
}

fieldTransactionDate.addEventListener('input', (e) => {
    if(!(e.target.value == "")) animateModalOverLayer();
});

submitButton.onclick = () => {
    modalOverLayer.classList.add('fly-away-animatable-layer-modal');
    submitButton.classList.add('hidden');
};

modalOverLayer.addEventListener('animationend', () => {
    setTimeout(() => {
        modalOverLayer.classList.remove('shorten-animatable-layer-modal');
        modalOverLayer.classList.remove('fly-away-animatable-layer-modal');
        submitButton.classList.remove('hidden');
    }, 1500)
});


//TEXT INPUT FIELD STYLES
export const modalInputFields = document.querySelectorAll('.text-input-container');
const amountField = document.getElementById('transaction-amount-text-field');
const dateField = document.getElementById('transaction-date-text-field');
let prevVal = "";

let amountValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

amountField.addEventListener('input', (e) => {
    let temp = e.target.value.replace(",", ".").replace(/\D/g, "");
    let amountNewValue = "";

    if(/^([0-9])$/.test(e.data) || e.data === null) {
        if(temp.length === 1) {
            amountNewValue = "0.0" + temp;
        } else {
            amountNewValue = temp.substring(0, temp.length - 2) + "." + temp.at(-2) + temp.at(-1);
        }

        e.target.value = amountValue.format(amountNewValue);
        prevVal = e.target.value;
    } else {
        e.target.value = prevVal;
    }
});

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

for(let fieldContainer of modalInputFields) {
    const field = fieldContainer.children[1];

    field.addEventListener('blur', () => {
        animateInputTextField(fieldContainer);
    });
}