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

app.put('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
})

app.get('/livros/:id', (req, res) => {
    let index = buscaLivro(req.params.id);
    res.status(200).json(livros[index]);
})

app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = buscaLivro(id);
    livros.splice(index, 1);
    res.send(`Livro ${id} deletado com sucesso`)
})



function buscaLivro(id) {
    const livro = livros.findIndex(livro => livro.id == id);
    return livro;
}

module.exports = app;