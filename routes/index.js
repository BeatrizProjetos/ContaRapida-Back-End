const express = require('express');
const router = express.Router();

const authUserRoutes = require('./authUser');

router.get('/', (req, res) => {
    res.send('Servidor está rodando!');
});

router.use('/auth', authUserRoutes);

module.exports = router; 

