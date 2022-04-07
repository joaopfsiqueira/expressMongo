const express = require('express');
const AutorController = require('../controllers/autoresController');

//usando o routeamento do express. Ou certo, criando as rotas pelo express e os métodos que a mesma vai receber.
const router = express.Router();

router
    .get("/autores", AutorController.listarAutores)
    .get("/autores/:id", AutorController.listarAutorPorId)
    .post("/autores", AutorController.cadastrarAutor)
    .put("/autores/:id", AutorController.atualizarAutor) // : indica que vai chegar um parametro na rota com o nome especificado.
    .delete("/autores/:id", AutorController.deletarAutor);


module.exports = router;