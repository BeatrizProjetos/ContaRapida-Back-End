const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerAdmin = async (req, res) => {
    try {

        const { nome, email, senha, chaveSecreta, role } = req.body;

        //Verifica se a chave secreta está correta
        if (role === 'admin' && chaveSecreta !== process.env.CHAVE_SECRETA) {
            return res.status(403).json({ mensagem: 'Chave secreta inválida.' })
        }

        const usuarioExiste = await User.findOne({ email });

        if (usuarioExiste) {
            if (role === 'admin')
                return res.status(400).json({ mensagem: 'Administrador já cadastrado' });
        } if (role == 'atendente') {
            return res.status(400).json({ mensagem: 'Atendente já cadastrado' })
        }

        // Criptografa a senha antes de salvar no banco de dados
        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(senha, salt);
     
        //Criar o novo usuário
        const novoUsuario = new User({ nome, email, senha: senhaCriptografada, role });

        await novoUsuario.save();

        
        //Retorna sucesso
        res.status(200).json({ mensagem: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        
        res.status(500).json({ mensagem: 'Erro no servidor' });

    }

};



const registerAtendente = async (req, res) => {
    try {
        const { nomeAtendente, emailAtendente, senhaAtendente, emailAdmin, senhaAdmin } = req.body;

        // Faz a verificação se o Admin existe 
        const admin = await User.findOne({ email: emailAdmin, role: 'admin'}); 
        if (!admin){
            return res.status(403).json({ mensagem : "Administrador não encontrado "});
        }
        //verifica a senha do admin 
        
        const senhaValida = await bcrypt.compare(senhaAdmin, admin.senha);

        if (!senhaValida) {
            return res.status(403).json({ mensagem: 'Senha do administrador incorreta' });

        }

    // verifica se a atendente já existe 
    const atendenteExiste = await User.findOne({ email: emailAtendente });
    if(atendenteExiste){
        return res.status(400).json({ mensagem: 'Atendente já cadastrado(a)'})
    }

    // criptografa a senha do atendente
    const salt = await bcrypt.genSalt(10);//; 
    const senhaCriptografada = await bcrypt.hash(senhaAtendente, salt);

    // criar o novo atendente 
    const novoAtendente = new User ({
        nome: nomeAtendente,
        email: emailAtendente,
        senha: senhaCriptografada,
        role: 'atendente',
        
    });

    await novoAtendente.save();

    res.status(200).json({ mensagem: 'Atendente cadastrado com sucesso!'})

    } catch (error) {
       
        res.status(500).json({ mensagem: 'Error no servidor' });
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

module.exports = { registerAdmin, registerAtendente, login };