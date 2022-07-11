import { hideModal, modalInputTextFields } from "./style-animation-new-transaction-modal.js";

const formsNewTransactionModal = document.getElementById('forms-new-transaction-modal');
let formData = {};

function resetForms(formElements) {
    for(let field of formElements) {
        if(field.type !== "submit" && field.type !== "button") {
            if(field.type === "radio") {
                if(field.value === "expense") {
                    field.checked = false;
                } else {
                    field.checked = true;
                }
            } else {
                field.value = "";
            }
        };
    }

    for(let fieldContainer of modalInputTextFields) {
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
}

formsNewTransactionModal.addEventListener('submit', (e) => {
    e.preventDefault();
    const formElements = e.target.elements;

    console.log('hey');

    for(let field of formElements) {

        if(field.type !== "submit" && field.type !== "button") {
            let key = field.id.split('-')[1];

            if(field.type === "radio") {
                if(field.checked) formData[key] = field.value;
            } else {
                formData[key] = field.value;
            }
        };
    }

    resetForms(formElements);
    setTimeout(() => {
        hideModal();
    }, 1250);

    console.log(formData);
})