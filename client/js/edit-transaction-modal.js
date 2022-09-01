import { deleteTransaction } from './finance-context.js';
import { hideModal } from './modal.js';
import { checkInputFields } from './new-transaction-modal.js';
import { create, append, formatCurrency, formatDate } from './utils/utils.js';
import { inputField } from './input-field.js';
import { handleSubmit } from './form-submission.js';

//MODAL CONTENT CONTAINER
const modalContentContainer = create(`
    <form class="balance-details-modal-content id="forms-edit-transaction-modal" name="forms-edit-transaction-modal">
    </form>
`);

modalContentContainer.addEventListener('submit', (e) => handleSubmit(e, 0, 'update'));

//INPUT FIELDS
const titleField = inputField({ fieldName: 'title', iconName: 'text', handleInput: handleInput });
const amountField = inputField({ fieldName: 'amount', iconName: 'money', handleInput: handleInput });
const dateField = inputField({ fieldName: 'date', iconName: 'calendar', handleInput: handleInput });

//MODAL TOP SECTION
const topSection = create(`
    <div class="top-section-modal">
        <h2 class="title-new-transaction-modal">Edit transaction</h2>
    </div>
`);

const closeButton = create(`
    <button type="button" class="close-modal-button" id="close-button-newtransaction-modal">
        <svg class="icon-button-close-modal">
            <use xlink:href="./assets/icons.svg#x" />
        </svg>
        <span>Hide values</span>
    </button>
`);
closeButton.onclick = hideModal;

//MODAL BODY CONTENT
const modalBodySection = create(`<div class="body-section-modal"></div>`);

const transactionsTypeWrapper = create(`<div class="options-transactions-type"></div>`);
const transactionTypeIncome = create(`
    <div>
        <input type="radio" name="transaction-type-option" id="option-type-income" value="income"
            class="radio-transaction-type-option" checked>
        <label for="option-type-income" class="lable-transaction-type-option">Income</label>
    </div>
`);
const transactionTypeExpense = create(`
    <div>
        <input type="radio" name="transaction-type-option" id="option-type-expense" value="expense"
            class="radio-transaction-type-option">
        <label for="option-type-expense" class="lable-transaction-type-option">Expense</label>
    </div>
`);

const actionsWrapper = create(`
    <div class="top-section-modal"></div>
`);

const submitButton = create(`<button type="submit" class="dismiss-button-balance-details-modal" id="dismiss-button-balance-details-modal">Save</button>`);

function handleInput() {
    let flag = checkInputFields([titleField, amountField, dateField]);

    if (flag) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

const deleteButton = create(`<button type="button" class="dismiss-button-balance-details-modal" id="dismiss-button-balance-details-modal">Delete</button>`);

deleteButton.onclick = () => {
    deleteTransaction();
    hideModal();
};

//CREATING MODAL
export const editTransactionModal = (transactionData) => {

    if (transactionData.type === 'income') {
        transactionTypeIncome.children[0].checked = true;
        transactionTypeExpense.children[0].checked = false;
    } else {
        transactionTypeIncome.children[0].checked = false;
        transactionTypeExpense.children[0].checked = true;
    }

    titleField.children[1].value = transactionData.title;
    amountField.children[1].value = formatCurrency.format(
        transactionData.type === 'income'
            ? transactionData.amount
            : transactionData.amount * -1
    );
    dateField.children[1].value = formatDate(transactionData.date, 'dd/mm/yyyy');

    for (let fieldContainer of [titleField, amountField, dateField]) {
        const label = fieldContainer.children[0];
        const field = fieldContainer.children[1];

        if (field.value !== "") {
            label.classList.remove('animatable-label');
            label.classList.add('fixed-label');
        } else {
            label.classList.add('animatable-label');
            label.classList.remove('fixed-label');
        }
    }

    append(topSection, [closeButton]);
    append(transactionsTypeWrapper, [transactionTypeIncome, transactionTypeExpense]);
    append(modalBodySection, [transactionsTypeWrapper, titleField, amountField, dateField]);
    append(actionsWrapper, [deleteButton, submitButton]);
    append(modalContentContainer, [topSection, modalBodySection, actionsWrapper]);

    return modalContentContainer;
};