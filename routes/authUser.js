const express = require('express');
const { registerAdmin, registerAtendente, login } = require('../controllers/authController');
const authenticateUser = require('../middlewares/authenticateUser');

const router = express.Router();

//Rota para registrar um administrador e atendente 
router.post('/register-admin', registerAdmin);
router.post('/register-atendente', registerAtendente);

//Rota de login
router.post('/login', login);

//Rota teste - rota apenas para usuarios logados com token valido
router.get('/teste-protegido', authenticateUser, (req, res) => {
    res.json({
        mensagem: 'Você acessou uma rota protegida!',
        usuario: req.user
    });
});

module.exports = router;