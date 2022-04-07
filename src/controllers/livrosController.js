const livros = require('../models/Livro');


class LivroController {

    static listarLivros = (req, res) => {
        livros.find((err, livros) => {
            if (err) {
                res.status(500);
                res.send('Erro ao buscar livros');
            } else {
                res.status(200).json(livros);
            }
        })
    }

}


module.exports = LivroController;