import { get, create, append } from './utils/utils.js';
import { showModal, hideModal } from './modal.js';
import { inputField } from './input-field.js';
import { handleSubmit } from './form-submission.js';

//UNDER LAYER
const modalUnderLayer = create(`
    <form class="under-layer-modal-content" id="forms-new-transaction-modal" name="forms-new-transaction-modal">
        <p class="success-message">
            <span class="emoji-success">🎉</span><br>Transaction <br> added!
        </p>
    </form>
`);

modalUnderLayer.addEventListener('submit', (e) => handleSubmit(e));

const submitButton = create(`
    <button type="submit" class="submit-button-add-transactions" id="submit-button-new-transaction-modal">Add transaction</button>
`);

submitButton.onclick = () => {
    modalOverLayer.classList.add('fly-away-animatable-layer-modal');
    submitButton.classList.add('hidden');
    modalUnderLayer.classList.add('success');
};

//OVER LAYER
const modalOverLayer = create(`
    <div class="over-layer-modal-content" id="modal-over-layer"></>
`);

modalOverLayer.addEventListener('animationend', () => {
    setTimeout(() => {
        modalOverLayer.classList.remove('shorten-animatable-layer-modal');
        modalOverLayer.classList.remove('fly-away-animatable-layer-modal');
        modalUnderLayer.classList.remove('success');
        submitButton.classList.remove('hidden');
    }, 1500);
});

//INPUT FIELDS
const titleField = inputField({ fieldName: 'title', iconName: 'text', handleInput: makeCardReady });
const amountField = inputField({ fieldName: 'amount', iconName: 'money', handleInput: makeCardReady });
const dateField = inputField({ fieldName: 'date', iconName: 'calendar', handleInput: makeCardReady });

const topSection = create(`
    <div class="top-section-modal">
        <h2 class="title-new-transaction-modal">New transaction</h2>
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

const modalBodySection = create(`
    <div class="body-section-modal">
        <div class="options-transactions-type">
            <div>
                <input type="radio" name="transaction-type-option" id="option-type-income" value="income"
                    class="radio-transaction-type-option" checked>
                <label for="option-type-income" class="lable-transaction-type-option">Income</label>
            </div>
            <div>
                <input type="radio" name="transaction-type-option" id="option-type-expense" value="expense"
                    class="radio-transaction-type-option">
                <label for="option-type-expense" class="lable-transaction-type-option">Expense</label>
            </div>
        </div>
    </div>
`);

const iconChevronUp = create(`<svg class="icon-chevron-up"><use xlink:href="./assets/icons.svg#chevron-up" /></svg>`);


//NEW TRANSACTION MODAL
const newTransactionModal = () => {

    append(topSection, [closeButton]);
    append(modalBodySection, [titleField, amountField, dateField, iconChevronUp]);
    append(modalOverLayer, [topSection, modalBodySection]);
    append(modalUnderLayer, [submitButton, modalOverLayer]);

    return modalUnderLayer;
};

//GO-AWAY CARD ANIMATION
function checkInputFields(inputFields) {
    let filledFields = 0;

    for (let field of inputFields) {
        if (field.children[1].value) filledFields++;
    }

    return filledFields === 3;
}

function makeCardReady() {
    const flag = checkInputFields([titleField, amountField, dateField]);

    if (flag) {
        modalOverLayer.classList.add('shorten-animatable-layer-modal');
        submitButton.disabled = false;
    } else {
        modalOverLayer.classList.remove('shorten-animatable-layer-modal');
        submitButton.disabled = true;
    }
}

//TRIGGER BUTTON
const modalTrigger = get('#button-add-new-transaction');

modalTrigger.onclick = () => {
    showModal(newTransactionModal());
};

//RESET INPUT FIELD STYLES
export function resetInputFieldStyles() {
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
};