import { transactionsDataState } from "./listing-transactions.js";
import { areValuesHidden, textPlaceholder } from "./hide-values.js";

const totalBalanceEl = document.getElementById('total-balance-amount');
const formatStatsAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export function getStats() {
    if(areValuesHidden) {
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

    let stats = {
        income: {
            amount: 0,
            count: 0
        },
        expenses: {
            amount: 0,
            count: 0
        },
        balance: {
            amount: 0,
            count: 0
        }
    }

    transactionsDataState.forEach(transaction => {
        if(transaction.type === 'income') {
            stats.income.amount += transaction.amount;
            stats.income.count++;
        }

        if(transaction.type === 'expense') {
            stats.expenses.amount += transaction.amount;
            stats.expenses.count++;
        }

        stats.balance.amount += transaction.amount;
        stats.balance.count++;
    });

    return stats;
}

export function updateBalanceOnUI() {
    totalBalanceEl.innerText = areValuesHidden ? getStats().balance.amount :formatStatsAmount.format(getStats().balance.amount);
}