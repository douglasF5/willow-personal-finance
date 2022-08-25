import { modalInputTextFields } from "./style-animation-new-transaction-modal.js";
import { hideModal } from '../modal.js';
import { addNewTransaction, filterTransactionsData } from '../listing-transactions.js';
import { formatDate } from "../utils/utils.js";
import smask from '../utils/field-masking.js';

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

//HANDLE SUBMIT
formsNewTransactionModal.addEventListener('submit', (e) => {
    e.preventDefault();
    const formElements = e.target.elements;

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
        hideModal('new-transaction-modal');
    }, 1250);

    addNewTransaction({
        id: filterTransactionsData('all').count + 1,
        type: formData.type,
        title: formData.title,
        amount: formData.type === 'income' ? smask.currencyUnformat(formData.amount, "pt-BR", "BRL") : smask.currencyUnformat(formData.amount, "pt-BR", "BRL") * -1,
        date: formatDate(formData.date, 'yyyy-mm-dd'),
    });

    // console.log(formData);
})