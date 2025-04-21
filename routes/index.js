const express = require('express');
const router = express.Router();

const authUserRoutes = require('./authUser');

router.use('/auth', authUserRoutes);

module.exports = router; 

