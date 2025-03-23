//Importanto biblioteca para trabalhar com o MongoDB
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.log('Erro ao conectar ao MongoDB:', error.message);
        process.exit(1); //Aqui encerra o processo se tiver erro
    }
}

module.exports = connectDB


