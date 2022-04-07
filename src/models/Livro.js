const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
    id: { type: String },  
    titulo: { type: String, required: true},
    // é assim que referenciamos uma FK. dizemos que o que estamos esperando dentro do type é um objectId que vem do mongoose e o ref é informa da onde que vai vir ess id.
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true},
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