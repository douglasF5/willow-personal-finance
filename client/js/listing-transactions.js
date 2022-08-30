import { finance, setFinance } from './finance-context.js';
import { toTitleCaseWord, formatDate, useState } from './utils/utils.js';
import { updateBalanceOnUI } from "./stats.js";
import { areValuesHidden, textPlaceholder } from "./hide-values.js";

export let transactionsDataState = [];
const transactionsTableEl = document.getElementById('transactions-table');
export let currentFilter = 'all';

//FILTER TRANSACTIONS TABLE
const filterOptionsEl = document.getElementById('filter-controls-transactions-table').children;
const filterOptionLabels = ["All", "Income", "Expense"];

export function updateFilterOptions() {

    for(let i = 0; i < filterOptionsEl.length; i++) {
        const field = filterOptionsEl[i].children[0];
        const label = filterOptionsEl[i].children[1];

        if(areValuesHidden) {
            label.innerText = filterOptionLabels[i];
            continue;
        }

        const { count } = filterTransactionsData(field.value);
        
        label.innerText = count ? `${filterOptionLabels[i]} · ${count}` : filterOptionLabels[i];
    }
}

for(let option of filterOptionsEl) {
    const field = option.children[0];

    field.addEventListener('click', () => {
        renderTransactionTable(field.value);
        currentFilter = field.value;
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
    <strong class="amount-transaction">${!areValuesHidden ? formatTransactionAmount.format(transactionData.amount) : textPlaceholder.hiddenValues}</strong>`;

    return transactionRowContainer;
}

export function filterTransactionsData(filter) {
    const transactions = filter === 'all'
        ? finance.transactions
        : finance.transactions.filter(transaction => transaction.type === filter);

    return {transactions, count: transactions.length};
}

export function renderTransactionTable(filter, data=filterTransactionsData(filter)) {
    const { transactions } = data;
    if(transactions.length === 0) return;

    transactionsTableEl.innerHTML = "";

    if(areValuesHidden) {        
        let hiddenTransactions = transactions.map(transaction => {
            return {
                id: transaction.id,
                type: transaction.type,
                title: transaction.title,
                amount: textPlaceholder.hiddenValues,
                date: transaction.date
            };
        });    

        hiddenTransactions.forEach(transaction => {
            let hiddenRow = getTransactionRowEl(transaction);
            transactionsTableEl.append(hiddenRow);
        });
    } else {
        transactions.forEach(transaction => {
            let row = getTransactionRowEl(transaction);
            transactionsTableEl.append(row);
        });
    }
}

//ADD NEW TRANSACTION
export async function addNewTransaction(data) {

    const request = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json"
        }
    };

    await fetch('/transactions', request);

    getData();
}

//GET DATA
async function getData() {
    const URL = 'http://localhost:3000/transactions';
  
    let reponse = await fetch(URL);
    let data = await reponse.json();

    setFinance(data);

    updateFilterOptions();
    renderTransactionTable(currentFilter);
    updateBalanceOnUI(finance.stats.balance.amount);
}

getData();