const express = require('express');
const app = express();
const db = require('./config/dbConnect');
const livros = require('./models/Livro.js');
const routes = require('./routes/index');

//conexão com o db e configurando mensagem de erro no bind do console.
db.on("error", console.log.bind(console, 'connection error:'));

//"Once" serve para tentar uma unica vez, e o termo "open" serve para abrir a conexão com o db
db.once("open", () => {
    console.log("conectado com sucesso");
});

//fazendo express ouvir json
app.use(express.json());


//rota para listar todos os livros, passando o APP instanciado no routes.js
routes(app)

// const livros = [
//     {id: 1, "titulo": "Senhor dos aneis", "autor": "J.R.R. Tolkien"},
//     {id: 2, "titulo": "O Hobbit", "autor": "J.R.R. Tolkien"},
// ]


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