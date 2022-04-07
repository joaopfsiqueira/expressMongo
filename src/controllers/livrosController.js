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

    static cadastrarLivros = (req, res) => {
        const livro = new livros(req.body);
        livro.save((err, livro) => {
            if (err) {
                res.status(500);
                res.send('Erro ao cadastrar livro');
            } else {
                res.status(201).json(livro);
            }
        })
    }

}


module.exports = LivroController;