const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerAdmin = async (req, res) => {
    try {

        const { nome, email, senha, chaveSecreta } = req.body;

        //Verifica se a chave secreta está correta
        if (chaveSecreta !== process.env.CHAVE_SECRETA) {
            return res.status(403).json({ mensagem: 'Chave secreta inválida.' })
        }

        const adminExiste = await User.findOne({ email });
        if (adminExiste) {
            return res.status(400).json({ mensagem: 'Administrador já cadastrado' });
        }
        //Criptografa a senha antes de salvar no banco
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        //Cria o novo administrador
        const novoUsuario = new User({ nome, email, senha: senhaHash, role: 'admin' });
        await novoUsuario.save();

        //Retorna sucesso
        res.status(200).json({ mensagem: 'Administrador cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro no servidor' });

    }

};

module.exports = registerAdmin; 