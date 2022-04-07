const autores = require('../models/Autor');


//uma class é onde fica os métodos. "os Static", que basicamente são funções que são chamadas no arquivo de rotas.
class AutorController {

    static listarAutores = (req, res) => {
        autores.find((err, autores) => {
            if (err) {
                res.status(500);
                res.send('Erro ao buscar autores');
            } else {
                res.status(200).json(autores);
            }
        })

    }

    static listarLivroPorId = (req, res) => {
        autores.findById(req.params.id, (err, autor) => {
            if (err) {
                res.status(500);
                res.send('Erro ao buscar autor');
            } else {
                res.status(200).json(autor);
            }
        })
    }

    static cadastrarAutores = (req, res) => {
        //basicamente estou informando que a variável autor vai receber um novo autor que vai vir do body da requisição. (Postman ou insomnia)
        let autor = new autores(req.body);
        //o save é um metodo que persiste o dado recebido no banco de dados.
        autor.save((err, autor) => {
            if (err) {
                res.status(500);
                res.send({message: err.message});
            } else {
                res.status(201).json(autor);
            }
        })
    }

    static atualizarAutores = (req, res) => {
       let id = req.params.id;  //recebendo o id do autor que vai ser atualizado

       //uma das maravilhas do mongo db é o $set.
       //explicando essa linha abaixo. o metodo findByIdAndUpdate vai localizar pelo id e vai atualizar. como parametro a gente passa o que vai ser ATUALIZADO naquele id.
       //basicamente $set vai setar o que será atualizado no id, que é basicamente o que será recebido no BODY. Logo após passamos o nome do erro e tratamos.
         autores.findByIdAndUpdate(id, {$set: req.body}, (err) => {
             if (!err) {
                 res.status(200).send({message: 'Autor atualizado com sucesso'});
             } else {
                 res.status(500).send({message: err.message});
             }
         })
    }

    static deletarAutor = (req,res) => {
        //basicamente uso o findbyid para localizar o autor de acordo com o id digitado no parametro da rota. e ja informo que vou receber erro e o autor.
        //depois, se não der erro, eu utilizo o metodo "remove" do mongodb para deletar o autor. Esse método recebe um erro e um callback.
        autores.findById(req.params.id, (err, autor) =>{
            if(!err){
                autor.remove((err) => {
                    if(!err){
                        res.status(200).send({message: 'Autor deletado com sucesso'});
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
        // autores.findByIdAndDelete(id, (err, autor) => {
        //     if (!err) {if(!autor){
        //         res.status(404).send({message: 'Autor não encontrado'});
        //     } else {
        //         res.status(200).send({message: 'Autor deletado com sucesso'});
        //     }
        //     } else {
        //         res.status(500).send({message: err.message});
        //     }
        // })

    }
} 

module.exports = AutorController;