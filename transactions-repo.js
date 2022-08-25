const finance = {
    transactions: [
        {
            id: 1,
            type: "expense",
            title: 'Electricity bill',
            amount: -112.38,
            date: '2021-06-10',
        },
        {
            id: 2,
            type: "income",
            title: 'Salary',
            amount: 9540.62,
            date: '2021-06-07',
        }
    ],
    stats: {
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
}

function getUpdatedStats() {
    const { transactions, stats } = finance;

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
    return {
        transactions: finance.transactions,
        stats: getUpdatedStats()
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