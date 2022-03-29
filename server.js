const http = require('http');
const port = 3000;

const rotas = {
    '/': 'Curso de node',
    '/livros': 'Lista de livros',
    '/autores': 'Lista de autores',
    '/euditora': 'Eu sou a editora'
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/plain'});
    res.end(rotas[req.url]);
})


server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})