import { finance, areValuesHidden, setCurrentFilter } from './finance-context.js';
import { renderTransactionTable } from './transactions-table.js';
import { get } from './utils/utils.js';

const filterOptionsEl = get('#filter-controls-transactions-table').children;
const filterOptionLabels = ["All", "Income", "Expense"];

//SETTING UP FILTER OPTIONS
for (let option of filterOptionsEl) {
    const field = option.children[0];

    field.addEventListener('click', () => {
        setCurrentFilter(field.value);
        renderTransactionTable();
    });
}

//UPDATING FILTER OPTIONS
export function updateFilterOptions() {

    const filterTransactionsCount = [
        finance.stats.balance.count,
        finance.stats.income.count,
        finance.stats.expenses.count
    ];

    for (let i = 0; i < filterOptionsEl.length; i++) {
        const label = filterOptionsEl[i].children[1];

        label.innerText = !areValuesHidden && filterTransactionsCount[i] ? `${filterOptionLabels[i]} · ${filterTransactionsCount[i]}` : filterOptionLabels[i];
    }
}