const mongoose = require('mongoose');

//Definição do esquema do usuário no banco de dados 
const UserSchema = new mongoose.Schema ({
    nome: {type: String, required: true}, //Nome do usuário (OBRIGATORIO)
    email:{type: String, required: true, unique: true, lowercase: true}, //Email (OBRIGATORIO)
    senha:{type: String, required: true,  minlength: 8}, //Senha (será criptografada)
    role: {type: String, enum: ['admin', 'atendente'], default: 'atendente'},
});


const User = mongoose.model('User', UserSchema);
module.exports = User;