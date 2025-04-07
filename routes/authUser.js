const express = require('express');
const { registerAdmin, login } = require('../controllers/authController');

const router = express.Router();

//Rota para registrar um administrador 
router.post('/register-admin', registerAdmin);

//Rota de login
router.post('/login', login);


module.exports = router;