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
        //basicamente estou informando que a variável livro vai receber um novo livro que vai vir do body da requisição. (Postman ou insomnia)
        let livro = new livros(req.body);
        //o save é um metodo que persiste o dado recebido no banco de dados.
        livro.save((err, livro) => {
            if (err) {
                res.status(500);
                res.send({message: err.message});
            } else {
                res.status(201).json(livro);
            }
        })
    }

}


module.exports = LivroController;