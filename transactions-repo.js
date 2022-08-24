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
    ]
}

class TransactionsRepo {
    listTransactions() {
        return finance.transactions;
    }

    createTransaction(transactionData) {
        const transactionsList = finance.transactions;
        transactionsList.push(transactionData);
    }
}

module.exports = TransactionsRepo;