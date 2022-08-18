const express = require('express')
const fs = require('fs/promises');

const port = 3000;
const server = express();

server.get('/', (req, res) => {
    fs.readFile('./public/index.html', 'utf-8')
        .then(content => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write(content);
            res.end();
        });
});

server.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
