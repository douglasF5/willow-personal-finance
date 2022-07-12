import { transactionsDataState } from "./transactions-table/listing-transactions.js";
import { updateStats } from "./stats.js";
import { renderTransactionTable, currentFilter } from './transactions-table/listing-transactions.js';

export const HIDDEN_VALUE_PLACEHOLDER = '••••••';
export let areValuesHidden = false;

function hideValues() {
    updateStats();
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
};