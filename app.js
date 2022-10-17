require("dotenv/config");
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { createTransaction, getFinanceData, deleteTransaction, updateTransaction } = require("./infra/sql-transactions-repo");

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get('/transactions', async (req, res) => {
    const financeData = await getFinanceData();
    res.send(financeData);
});

app.post('/transactions', async (req, res) => {
    const transactionData = req.body;
    await createTransaction(transactionData);
    res.status(201).send(transactionData);
});

app.delete('/transactions/:id', async (req, res) => {
    const transactionId = req.params.id;
    await deleteTransaction(transactionId);
    res.status(200).send('Resource deleted');
});

app.put('/transactions/:id', async (req, res) => {
    const transactionData = req.body;
    await updateTransaction(transactionData);
    res.status(200).send(transactionData);
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});

//--restart-railway-flag
