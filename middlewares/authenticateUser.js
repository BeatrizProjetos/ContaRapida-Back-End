const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    //Verifica se o cabeçalho Authorization existe  e está no formato  correto
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return json.status(401).json({ mensagem:'Token não fornecido ou incompleto' });
    }

    const token = authHeader.split(' ')[1];

    try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(400).json({ mensagem: 'Token inválido ou expirado' });
        }
    
}


module.exports = authenticateUser;