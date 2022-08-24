const express = require('express')
const app = express();
const port = 3000;
const TransactionsRepo = require("./transactions-repo");

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get('/transactions', (req, res) => {
    const repo = new TransactionsRepo();
    const transactions = repo.listTransactions();
    res.send(transactions);
});

app.post('/transactions', (req, res) => {
    const repo = new TransactionsRepo();
    const transactionData = req.body;

    console.log(transactionData);

    // const transactionData = {
    //     id: 3,
    //     type: "expense",
    //     title: 'Electricity bill',
    //     amount: -112.38,
    //     date: '2021-06-10',
    // };

    repo.createTransaction(transactionData);
    res.status(201).send(transactionData);
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});