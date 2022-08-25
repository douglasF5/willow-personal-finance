const express = require('express')
const app = express();
const port = 3000;
const { createTransaction, getFinanceData } = require("./transactions-repo");

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get('/transactions', (req, res) => {
    const financeData = getFinanceData();
    res.send(financeData);
});

app.post('/transactions', (req, res) => {
    const transactionData = req.body;
    createTransaction(transactionData);
    res.status(201).send(transactionData);
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});