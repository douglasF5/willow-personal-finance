import { updateBalanceOnUI } from "./stats.js";
import { renderTransactionTable, updateFilterOptions, currentFilter } from './transactions-table/listing-transactions.js';
import { setUpToolTip, updateToolTip } from "./tool-tip.js";

export const textPlaceholder = {
    hiddenValue: '🙈',
    hiddenValues: '🙈🙈🙈'
}; //••••••
export let areValuesHidden = false;

function hideValues() {
    updateBalanceOnUI();
    updateFilterOptions();
    renderTransactionTable(currentFilter);
}

//TOGGLE ICON ON UI
const buttonHideValues = document.getElementById('hide-values-button');
const iconHideValues = document.getElementById('icon-button-hide-values');

buttonHideValues.onclick = () => {
    areValuesHidden = !areValuesHidden;
    let newIcon = `<use xlink:href="assets/icons.svg#${areValuesHidden ? 'eye-off' : 'eye'}"/>`;
    iconHideValues.innerHTML = newIcon;
    hideValues();
    updateToolTip(buttonHideValues, `${areValuesHidden ? 'Show' : 'Hide'} values`);
};

//TOOL TIP
setUpToolTip(buttonHideValues, `${areValuesHidden ? 'Show' : 'Hide'} values`);