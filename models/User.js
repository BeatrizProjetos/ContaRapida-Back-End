const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Definição do esquema do usuário no banco de dados 
const UserSchema = new mongoose.Schema ({
    nome: {type: String, required: true}, //Nome do usuário (OBRIGATORIO)
    email:{type: String, required: true, unique: true}, //Email (OBRIGATORIO)
    senha:{type: String, required: true}, //Senha (será criptografada)
    role: {type: String, enum: ['admin', 'atendente'], default: 'atendente'},
});

//Middleware para criptografar a senha automaticamente antes de salvar 
UserSchema.pre('save', async function (next) {
    if (!this.isModified('senha')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    }   catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;