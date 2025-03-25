const express = require('express');
const registerAdmin = require('../controllers/authController');

const router = express.Router();

//Rota para registrar um administrador 
router.post('/register-admin', registerAdmin);


module.exports = router;