const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

//Rota para registrar um novo usuario 
router.post('/register', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        //Validação do comprimento da senha
        if(senha.length < 8 || senha.length > 12){
            return res.status(400).json({mensagem: 'A senha deve ter entre 8 e 12 caracteres!'})
        }

        //Verifica se o usuario já existe
        const usuarioExiste = await User.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        //Criptografa a senha antes de salvar no banco
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        //Cria o novo usuario
        const novoUsuario = new User({ nome, email, senha: senhaHash });
        await novoUsuario.save();

        //Retorna sucesso
        res.status(200).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor' });

    }
});

module.exports = router;