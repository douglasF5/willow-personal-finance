import { areValuesHidden, textPlaceholder } from "./hide-values.js";

const totalBalanceEl = document.getElementById('total-balance-amount');
const formatStatsAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export function getHiddenStats() {
    return {
        income: {
            amount: textPlaceholder.hiddenValues,
            count: textPlaceholder.hiddenValue
        },
        expenses: {
            amount: textPlaceholder.hiddenValues,
            count: textPlaceholder.hiddenValue
        },
        balance: {
            amount: textPlaceholder.hiddenValues,
            count: textPlaceholder.hiddenValue
        }
    };
}

export function updateBalanceOnUI(balanceAmount) {
    totalBalanceEl.innerText = areValuesHidden ? getHiddenStats().balance.amount : formatStatsAmount.format(balanceAmount);
}