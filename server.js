//Importando as bibliotecas
require('dotenv').config(); //Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());

//Usa as rotas agrupadas com o prefixo '/api'
app.use('/api', routes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


