const http = require('http');
const fs = require('fs/promises');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(processReq);

function processReq(req, res) {
    fs.readFile('./public/index.html', 'utf-8')
        .then(content => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write(content);
            res.end();
        });
}

server.listen(port, hostname, () => {
    console.log(`Server running on por ${hostname}:${port}`);
});
