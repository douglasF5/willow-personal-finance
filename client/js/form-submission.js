import { hideModal } from './modal.js';
import { resetInputFieldStyles } from './new-transaction-modal.js';
import { addNewTransaction, updateTransaction } from './finance-context.js';
import { formatDate } from "./utils/utils.js";
import smask from './utils/field-masking.js';

let formsData = {};

//HANDLE SUBMIT
export function handleSubmit(e, closeDelay = 1250, action = 'create') {
    e.preventDefault();
    const formElements = e.target.elements;

    for (let field of formElements) {

        if (field.type !== "submit" && field.type !== "button") {
            let key = field.id.split('-')[1];

            if (field.type === "radio") {
                if (field.checked) formsData[key] = field.value;
            } else {
                formsData[key] = field.value;
            }
        };
    }

    resetForms(formElements);

    if (!closeDelay) {
        hideModal();
    } else {
        setTimeout(() => {
            hideModal();
        }, closeDelay);
    }


    switch (action) {
        case 'create':
            addNewTransaction({
                type: formsData.type,
                title: formsData.title,
                amount: formsData.type === 'income' ? smask.currencyUnformat(formsData.amount, "pt-BR", "BRL") : smask.currencyUnformat(formsData.amount, "pt-BR", "BRL") * -1,
                date: formatDate(formsData.date, 'yyyy-mm-dd'),
            });
            break;
        case 'udate':
            updateTransaction({
                type: formsData.type,
                title: formsData.title,
                amount: formsData.type === 'income' ? smask.currencyUnformat(formsData.amount, "pt-BR", "BRL") : smask.currencyUnformat(formsData.amount, "pt-BR", "BRL") * -1,
                date: formatDate(formsData.date, 'yyyy-mm-dd'),
            });
            break;
    }
}

function resetForms(formElements) {
    for (let field of formElements) {
        if (field.type !== "submit" && field.type !== "button") {
            if (field.type === "radio") {
                if (field.value === "expense") {
                    field.checked = false;
                } else {
                    field.checked = true;
                }
            } else {
                field.value = "";
            }
        };
    }

    resetInputFieldStyles();
}