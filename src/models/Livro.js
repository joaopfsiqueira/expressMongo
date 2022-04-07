const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
    id: { type: String },  
    titulo: { type: String, required: true},
    autor: { type: String, required: true},
    editora: { type: String, required: true},
    numPaginas: {type: Number},
    },
    {
        //tirando o _v com a versão do mongo
        versionKey: false,
    }
);


const livros = mongoose.model('livros', livroSchema);


module.exports = livros;