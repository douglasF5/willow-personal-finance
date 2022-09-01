import { append, create, toTitleCaseWord } from './utils/utils.js';
import smask from './utils/field-masking.js';

//TEXT INPUT
export const inputField = ({ fieldName, iconName, handleInput }) => {
    const fieldWrapper = create(`
        <div class="text-input-container">
            <label class="descriptor-text-input animatable-label"
                for="transaction-${fieldName}-text-field">${toTitleCaseWord(fieldName)}</label>
        </div>
    `);

    const textInput = create(`
            <input type="text" id="transaction-${fieldName}-text-field" name="transaction-${fieldName}-text-field" class="text-input">
    `);

    textInput.addEventListener('blur', () => {
        animateInputTextField(fieldWrapper);
    });

    textInput.addEventListener('input', handleInput);

    switch (fieldName) {
        case 'amount':
            smask.input(textInput, ["currency"]);
            break;
        case 'date':
            smask.input(textInput, ["date"]);
            break;
        default:
            break;
    }

    const fieldIcon = create(`
        <svg class="icon-text-input">
            <use xlink:href="./assets/icons.svg#${iconName}" />
        </svg>
    `);

    append(fieldWrapper, [textInput, fieldIcon]);

    return fieldWrapper;
};

//INPUT FIELD ANIMATION
function animateInputTextField(fieldContainer) {
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