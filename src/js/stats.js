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
            income: {
                amount: HIDDEN_VALUE_PLACEHOLDER,
                count: HIDDEN_VALUE_PLACEHOLDER[0]
            },
            expenses: {
                amount: HIDDEN_VALUE_PLACEHOLDER,
                count: HIDDEN_VALUE_PLACEHOLDER[0]
            },
            balance: {
                amount: HIDDEN_VALUE_PLACEHOLDER,
                count: HIDDEN_VALUE_PLACEHOLDER[0]
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