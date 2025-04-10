const jwt = require('jsonwebtoken');

const verificarAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ mensagem: 'Token não fornecido ou incompleto' });
    }

    const token = authHeader.split(' ')[1];


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (req.user.role !== 'admin') return res.status(403).json({ mensagem: 'Acesso negado. Apenas administradores podem acessar está funcionalidade.' })
        next();
    } catch (error) {
        res.status(400).json({ mensagem: 'Token inválido' });
    }

};

module.exports = verificarAdmin;