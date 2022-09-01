import { finance, areValuesHidden, textPlaceholder } from "./finance-context.js";
import { get, formatCurrency } from './utils/utils.js';

const totalBalanceEl = get('#total-balance-amount');

export function updateBalanceOnUI() {
    totalBalanceEl.innerText = areValuesHidden ? textPlaceholder.hiddenValues : formatCurrency.format(finance.stats.balance.amount);
}