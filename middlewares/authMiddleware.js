const jwt = require('jsonwebtoken');

const verificarAdmin = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ mensagem: 'Acesso negado. Token não fornecido ou incompleto' });


    try {
        const decod = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (req.user.role !== 'admin') return res.status(403).json({ mensagem: 'Acesso negado. Apenas administradores podem acessar está funcionalidade.' })
        next();
    } catch (error) {
        res.status(400).json({mensagem: 'Token inválido'});
    }

};

module.exports = verificarAdmin;