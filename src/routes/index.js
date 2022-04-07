const express = require('express');
const livros = require('./livrosRoutes');

//o index vai servir para colocar o conjunto de todas as rotas que serão utilizadas. Visto que cada uma fica em seu arquivo route.js

//vai receber um próprio APP dentro de routes.
const routes = (app) => {
    //basicamente o que está sendo feito: ao invés de utilizar o seguinte código no app.js:
    // app.get('/', (req, res) => {
    //     res.status(200);
    //     res.send('Curso de node');
    // })
    // eu estou utilizando o método que eu vou receber (app) e utilizando a propriedade route do express e ja estou informando que essa rota vai ser um get.
    // Essa forma funciona EXATAMENTE igual à forma mencionada acima, a diferença é a organização do código.	
    app.route('/').get((req, res) => {{ 
        res.status(200).send({ Titulo: "Curso de Node"})
     }});


     //o app .use basicamente eu posso passar TODAS as rotas que eu quero que o express faça.
     //dizendo que vai retornar um json e qual a rota em questão.
     //no caso "Livros" já é uma rota existente dentro do arquivo "livrosRoutes"
     //conforme eu vou criando outros arquivos com diversas rotas dentro basta eu colocar dentro do use.
     app.use(
         express.json(),
         livros
    );
}

module.exports = routes