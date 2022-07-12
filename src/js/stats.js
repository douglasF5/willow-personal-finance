import { transactionsDataState } from "./transactions-table/listing-transactions.js";
import { areValuesHidden, HIDDEN_VALUE_PLACEHOLDER } from "./hide-values.js";

const totalBalanceEl = document.getElementById('total-balance-amount');
const formatStatsAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export function getStats() {
    if(areValuesHidden) {
        return {
            income: HIDDEN_VALUE_PLACEHOLDER,
            expenses: HIDDEN_VALUE_PLACEHOLDER,
            balance: HIDDEN_VALUE_PLACEHOLDER
        };
    }

    let stats = {
        income: 0,
        expenses: 0,
        balance: 0
    }

    transactionsDataState.forEach(transaction => {
        if(transaction.type === 'income') stats.income += transaction.amount;
        if(transaction.type === 'expense') stats.expenses += transaction.amount;
        stats.balance += transaction.amount;
    });

    return stats;
}

export function updateStats() {
    totalBalanceEl.innerText = areValuesHidden ? getStats().balance :formatStatsAmount.format(getStats().balance);
}