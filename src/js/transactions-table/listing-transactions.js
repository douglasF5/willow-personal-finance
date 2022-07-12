import { transactionsData } from "../transactions-data.js";
import { toTitleCaseWord, formatDate } from '../utils/utils.js';

const transactionsTableEl = document.getElementById('transactions-table');

//FILTER TRANSACTIONS TABLE
const filterOptionsEl = document.getElementById('filter-controls-transactions-table').children;
const filterOptionLabels = ["All", "Income", "Expense"];

function updateFilterOptions() {

    for(let i = 0; i < filterOptionsEl.length; i++) {
        const field = filterOptionsEl[i].children[0];
        const label = filterOptionsEl[i].children[1];
        const { count } = filterTransactionsData(field.value);
        
        label.innerHTML = `${filterOptionLabels[i]} · ${count}`;
    }
}

for(let option of filterOptionsEl) {
    const field = option.children[0];

    field.addEventListener('click', () => {
        renderTransactiontable(field.value);
    });

}

//RENDER TRANSACTIONS TABLE
function getTransactionRowEl(transactionData) {
    const transactionRowContainer = document.createElement('DIV');
    const iconName = transactionData.type === 'income' ? 'plus-circle': 'minus-circle';
    const formatTransactionAmount = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
    transactionRowContainer.classList.add("row-transactions-table", `${transactionData.type}`);

    transactionRowContainer.innerHTML = `<p class="description-transaction">${transactionData.title}</p>
    <div class="date-transaction">
        <svg class="icon-date-transaction">
            <use
            xlink:href="assets/icons.svg#calendar"
            />
        </svg>
        <span>${formatDate(transactionData.date)}</span>
    </div>
    <div class="type-transaction">
        <svg class="icon-type-transaction">
            <use
            xlink:href="assets/icons.svg#${iconName}"
            />
        </svg>
        <span>${toTitleCaseWord(transactionData.type)}</span>
    </div>
    <strong class="amount-transaction">${formatTransactionAmount.format(transactionData.amount)}</strong>`;

    return transactionRowContainer;
}

function filterTransactionsData(filter) {
    const data = filter === 'all'
        ? [...transactionsData]
        : transactionsData.filter(transaction => transaction.type === filter);

    return {data, count: data.length};
}

function renderTransactiontable(filter) {
    transactionsTableEl.innerHTML = "";
    const { data } = filterTransactionsData(filter);

    data.forEach(transaction => {
        let row = getTransactionRowEl(transaction);
        transactionsTableEl.append(row);
    });
}

updateFilterOptions();
renderTransactiontable('all');