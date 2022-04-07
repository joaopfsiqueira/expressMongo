const express = require('express');
const LivroController = require('../controllers/livrosController');

//usando o routeamento do express. Ou certo, criando as rotas pelo express e os métodos que a mesma vai receber.
const router = express.Router();

router
    .get("/livros", LivroController.listarLivros)
    .post("/livros", LivroController.cadastrarLivros)
    .put("/livros/:id", LivroController.atualizarLivros) // : indica que vai chegar um parametro na rota com o nome especificado.


module.exports = router;