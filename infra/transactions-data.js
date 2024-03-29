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
        },
        {
            id: 3,
            type: "expense",
            title: 'Groceries',
            amount: -120.14,
            date: '2021-06-07',
        },
        {
            id: 4,
            type: "expense",
            title: 'Gift to my ❤',
            amount: -287.98,
            date: '2021-06-06',
        },
        {
            id: 5,
            type: "expense",
            title: 'Lend some money to my brother',
            amount: -500.00,
            date: '2021-06-05',
        },
        {
            id: 6,
            type: "income",
            title: 'Bonus payment',
            amount: 3580.00,
            date: '2021-06-05',
        },
        {
            id: 7,
            type: "expense",
            title: 'Rent',
            amount: -1448.71,
            date: '2021-06-05',
        },
        {
            id: 8,
            type: "income",
            title: 'Dividend income',
            amount: 100.11,
            date: '2021-06-03',
        },
        {
            id: 9,
            type: "expense",
            title: 'Netflix subscription',
            amount: -55.90,
            date: '2021-05-31',
        },
        {
            id: 10,
            type: "expense",
            title: 'Uber ride',
            amount: -830.00,
            date: '2021-05-30',
        },
        {
            id: 11,
            type: "income",
            title: 'Garage sale',
            amount: 150.00,
            date: '2021-05-28',
        },
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

module.exports = finance;