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

    static atualizarLivros = (req, res) => {
       let id = req.params.id;  //recebendo o id do livro que vai ser atualizado

       //uma das maravilhas do mongo db é o $set.
       //explicando essa linha abaixo. o metodo findByIdAndUpdate vai localizar pelo id e vai atualizar. como parametro a gente passa o que vai ser ATUALIZADO naquele id.
       //basicamente $set vai setar o que será atualizado no id, que é basicamente o que será recebido no BODY. Logo após passamos o nome do erro e tratamos.
         livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
             if (!err) {
                 res.status(200).send({message: 'Livro atualizado com sucesso'});
             } else {
                 res.status(500).send({message: err.message});
             }
         })
    }
} 

module.exports = LivroController;