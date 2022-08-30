const finance = require('./transactions-data');

function getUpdatedStats(transactions, stats) {

    transactions.forEach(transaction => {
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

function getFinanceData() {
    const { transactions, stats } = finance;

    return {
        transactions: transactions,
        stats: getUpdatedStats(transactions, stats)
    };
}

function createTransaction(transactionData) {
    const transactionsList = finance.transactions;
    transactionsList.push(transactionData);
}

module.exports = {
    getFinanceData,
    createTransaction
};