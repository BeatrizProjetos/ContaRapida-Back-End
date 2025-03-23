const mongoose = require('mongoose');

//Definição do esquema do usuário no banco de dados 
const UserSchema = new mongoose.Schema ({
    nome: {type: String, required: true}, //Nome do usuário (OBRIGATORIO)
    email:{type: String, required: true, unique: true}, //Email (OBRIGATORIO)
    senha:{type: String, required:true}, //Senha (será criptografada)
});

module.exports = mongoose.model('User', UserSchema);