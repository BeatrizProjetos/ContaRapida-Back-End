const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
//Login
const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        //verificação se o usuario existe 
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensagem: 'Usuário não encontrado' });
        }

        //Aqui compara a senha informada com a senha salva do cadastro 
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Senha incorreta' });
        }

        //Gera o token JWT
        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        //O login deu certo
        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!', token,
            usuario: {
                id: usuario._id,
                email: usuario.email,
            }
        });

    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao fazer login', erro });
    }
};

module.exports = { registerAdmin, login };