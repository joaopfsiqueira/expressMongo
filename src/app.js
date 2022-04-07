const express = require('express');
const app = express();
const db = require('./config/dbConnect');
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


module.exports = app;