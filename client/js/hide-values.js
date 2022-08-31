import { updateBalanceOnUI } from "./stats.js";
import { finance, areValuesHidden, toggleValuesHidden } from './finance-context.js';
import { get } from './utils/utils.js';
import { renderTransactionTable, updateFilterOptions, currentFilter } from './listing-transactions.js';
import { setUpToolTip, updateToolTip } from "./tool-tip.js";

function hideValues() {
    updateBalanceOnUI(finance.stats.balance.amount);
    updateFilterOptions();
    renderTransactionTable(currentFilter);
}

//TOGGLE ICON ON UI
const buttonHideValues = get('#hide-values-button');
const iconHideValues = get('#icon-button-hide-values');

buttonHideValues.onclick = () => {
    toggleValuesHidden(!areValuesHidden);
    let newIcon = `<use xlink:href="assets/icons.svg#${areValuesHidden ? 'eye-off' : 'eye'}"/>`;
    iconHideValues.innerHTML = newIcon;
    hideValues();
    updateToolTip(buttonHideValues, `${areValuesHidden ? 'Show' : 'Hide'} values`);
};

//TOOL TIP
setUpToolTip(buttonHideValues, `${areValuesHidden ? 'Show' : 'Hide'} values`);