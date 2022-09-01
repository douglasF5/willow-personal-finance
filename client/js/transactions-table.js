import { finance, areValuesHidden, textPlaceholder, currentFilter, setSelectedTransaction } from './finance-context.js';
import { toTitleCaseWord, formatDate, formatCurrency, create, append, get } from './utils/utils.js';
import { editTransactionModal } from './edit-transaction-modal.js';
import { showModal } from './modal.js';

const transactionsTableEl = get('#transactions-table');

//RENDERING TRANSACTIONS TABLE
export function renderTransactionTable() {
    let transactions;

    if (currentFilter === 'all') {
        transactions = finance.transactions;
    } else {
        transactions = finance.transactions.filter(transaction => transaction.type === currentFilter);
    }

    if (transactions.length === 0) return;

    const transactionRows = transactions.map(transaction => {
        const row = create(`<div class="row-transactions-table ${transaction.type}">
            <p class="description-transaction">${transaction.title}</p>
    <div class="date-transaction">
        <svg class="icon-date-transaction">
            <use
            xlink:href="assets/icons.svg#calendar"
            />
        </svg>
        <span>${formatDate(transaction.date)}</span>
    </div>
    <div class="type-transaction">
        <svg class="icon-type-transaction">
            <use
            xlink:href="assets/icons.svg#${transaction.type === 'income' ? 'plus-circle' : 'minus-circle'}"
            />
        </svg>
        <span>${toTitleCaseWord(transaction.type)}</span>
    </div>
    <strong class="amount-transaction">${!areValuesHidden ? formatCurrency.format(transaction.amount) : textPlaceholder.hiddenValues}</strong>
        </div>`
        );

        row.onclick = () => editTransaction(transaction.id);

        return row;
    });

    append(transactionsTableEl, transactionRows, true);
}

function editTransaction(id) {
    const transactionData = finance.transactions.find(transaction => transaction.id === id);
    setSelectedTransaction(transactionData);
    showModal(editTransactionModal(transactionData));
}