const livros = require('../models/Livro');


//uma class é onde fica os métodos. "os Static", que basicamente são funções que são chamadas no arquivo de rotas.
class LivroController {

    static listarLivroPorEditora = (req, res) =>{
        const editora = req.query.editora;//recebendo pela QUERY o nome da editora.

        //criando o método de busca. basicamente localiza dentro do livros o livro em que o editora for igual ao editora que enviaremos pelo query.
        livros.find({'editora': editora}, {}, (err, livros) => {
            res.status(200).json(livros);
        })
    }

    static listarLivros = (req, res) => {
        livros.find()
            .populate('autor') // basicamente ele vai encontrar os livros e popular com os dados de autor. Ou certo, vai popular com as FK
            .exec((err, livros) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(livros);
                }
            });
    }

    static listarLivroPorId = (req, res) => {
        const id = req.params.id
        livros.findById(id)
            .populate('autor', 'nome') //nesse caso, só vai trazer o nome do autor, lembrando que o ID é fixo, já que ele é a variavel FK que é utilizada para referenciar o autor.
            .exec((err, livro) => {
            if (err) {
                res.status(500);
                res.send('Erro ao buscar livro');
            } else {
                res.status(200).json(livro);
            }
        })
    }

    static listarLivroPorEditora = (req, res) =>{
        
        const editora = req.query.editora;//recebendo pela QUERY o nome da editora.

        //criando o método de busca. basicamente localiza dentro do livros o livro em que o editora for igual ao editora que enviaremos pelo query.
        livros.find({'editora': editora}, {}, (err, livros) => {
            if (err) {
                res.send({message: err.message});
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

    static deletarLivro = (req,res) => {
        //basicamente uso o findbyid para localizar o livro de acordo com o id digitado no parametro da rota. e ja informo que vou receber erro e o livro.
        //depois, se não der erro, eu utilizo o metodo "remove" do mongodb para deletar o livro. Esse método recebe um erro e um callback.
        livros.findById(req.params.id, (err, livro) =>{
            if(!err){
                livro.remove((err) => {
                    if(!err){
                        res.status(200).send({message: 'Livro deletado com sucesso'});
                    } else {
                        res.status(500).send({message: err.message});
                    }
                })
            } else {
                res.status(500).send({message: err.message});
            }
        })


        //um outro jeito de fazer isso: 
        // const id = req.params.id;
        // livros.findByIdAndDelete(id, (err, livro) => {
        //     if (!err) {if(!livro){
        //         res.status(404).send({message: 'Livro não encontrado'});
        //     } else {
        //         res.status(200).send({message: 'Livro deletado com sucesso'});
        //     }
        //     } else {
        //         res.status(500).send({message: err.message});
        //     }
        // })

    }
} 

module.exports = LivroController;