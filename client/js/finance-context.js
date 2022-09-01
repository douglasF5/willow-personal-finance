import { updateBalanceOnUI } from "./balance.js";
import { renderTransactionTable } from './transactions-table.js';
import { updateFilterOptions } from './filter-options.js';

//GETTING TRANSACTIONS DATA
export async function getData() {
    const URL = '/transactions';

    let reponse = await fetch(URL);
    let data = await reponse.json();

    setFinance(data);
}

//ADDING NEW TRANSACTION
export async function addNewTransaction(data) {

    const request = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "content-type": "application/json"
        }
    };

    await fetch('/transactions', request);

    await getData();
    refreshApp();
}

//DELETING TRANSACTION
export async function deleteTransaction() {

    const request = {
        method: 'DELETE',
        // body: JSON.stringify(selectedTransaction.id),
        headers: {
            "content-type": "application/json"
        }
    };

    await fetch(`/transactions/${selectedTransaction.id}`, request);

    setSelectedTransaction(null);
    await getData();
    refreshApp();
}

//UPDATING TRANSACTION
export async function updateTransaction(transactionData) {
    const { amount, title, type, date } = transactionData;

    const request = {
        method: 'PUT',
        body: JSON.stringify({
            amount,
            title,
            type,
            date,
            id: selectedTransaction.id
        }),
        headers: {
            "content-type": "application/json"
        }
    };

    await fetch(`/transactions/${selectedTransaction.id}`, request);

    setSelectedTransaction(null);
    await getData();
    refreshApp();
}

//SELECTED TRANSACTION
export let selectedTransaction = null;
export function setSelectedTransaction(newState) {
    selectedTransaction = newState;
}

//FINANCE OBJECT
export let finance = null;
export function setFinance(newState) {
    finance = newState;
}

//CURRENT FILTER
export let currentFilter = 'all';
export function setCurrentFilter(newFilter) {
    currentFilter = newFilter;
}

//HIDE VALUES ON THE UI
export const textPlaceholder = {
    hiddenValue: '🙈',
    hiddenValues: '🙈🙈🙈'
}; //••••••

export let areValuesHidden = false;
export function toggleValuesHidden(newState) {
    areValuesHidden = newState;
}

//APP REFRESH
export function refreshApp() {
    updateFilterOptions();
    renderTransactionTable();
    updateBalanceOnUI();
}