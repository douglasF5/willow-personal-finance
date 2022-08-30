require("dotenv/config");
const express = require('express')
const app = express();
const port = 3000;
// const { createTransaction, getFinanceData } = require("./infra/transactions-repo");
const { createTransaction, getFinanceData } = require("./infra/sql-transactions-repo");

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//SECTION

// app.get('/transactions', (req, res) => {
//     const financeData = getFinanceData();
//     res.send(financeData);
// });

// app.post('/transactions', (req, res) => {
//     const transactionData = req.body;
//     createTransaction(transactionData);
//     res.status(201).send(transactionData);
// });

// app.listen(port, () => {
//     console.log(`Server running on port http://localhost:${port}`);
// });

//SECTION

app.get('/transactions', async (req, res) => {
    const financeData = await getFinanceData();
    res.send(financeData);
});

app.post('/transactions', async (req, res) => {
    const transactionData = req.body;
    await createTransaction(transactionData);
    res.status(201).send(transactionData);
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});