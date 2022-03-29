const express = require('express');

const app = express();


//fazendo express ouvir json
app.use(express.json());

const livros = [
    {id: 1, "titulo": "Senhor dos aneis", "autor": "J.R.R. Tolkien"},
    {id: 2, "titulo": "O Hobbit", "autor": "J.R.R. Tolkien"},
]

app.get('/', (req, res) => {
    res.status(200);
    res.send('Curso de node');
})


app.get('/livros', (req, res) => {
    res.status(200).json(livros);
})

app.post('/livros', (req, res) => {
    livros.push(req.body);
    res.status(201).json(livros);
})

module.exports = app;