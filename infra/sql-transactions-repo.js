
const { Pool } = require("pg");
const pool = new Pool();

function getUpdatedStats(transactions) {

    const stats = {
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
    };

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            stats.income.amount += transaction.amount;
            stats.income.count++;
        }

        if (transaction.type === 'expense') {
            stats.expenses.amount += transaction.amount;
            stats.expenses.count++;
        }

        stats.balance.amount += transaction.amount;
        stats.balance.count++;
    });

    return stats;
}

async function getFinanceData() {
    const queryResult = await pool.query('SELECT * FROM transaction');

    return {
        transactions: queryResult.rows,
        stats: getUpdatedStats(queryResult.rows)
    };
}

async function createTransaction(transactionData) {

    const query = `INSERT INTO transaction(amount, title, date, type)
    VALUES ($1, $2, $3, $4) RETURNING *`;

    const data = [
        transactionData.amount,
        transactionData.title,
        transactionData.date,
        transactionData.type
    ];

    await pool.query(query, data);
    // transactionsList.push(transactionData);
}

async function deleteTransaction(transactionId) {
    const query = `DELETE FROM transaction WHERE ID=$1`;
    await pool.query(query, [transactionId]);
}

async function updateTransaction(transactionData) {
    const query = `UPDATE transaction
    SET title = $1, amount = $2, type = $3, date = $4
    WHERE ID=$5`;

    const data = [
        transactionData.title,
        transactionData.amount,
        transactionData.type,
        transactionData.date,
        transactionData.id
    ];

    await pool.query(query, data);
}

module.exports = {
    getFinanceData,
    createTransaction,
    deleteTransaction,
    updateTransaction
};