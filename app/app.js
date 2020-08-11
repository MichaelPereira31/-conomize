// Carregando modulos
  const express = require('express')
  const bodyParser = require('body-parser')
  const contas = require('./routes/contas')
  const path = require('path')
  const mongoose = require('mongoose')
  const db = require('./config/db')


  const app = express()

// Configurações
  // Body parser
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

  // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect(db.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
      console.log("DataBase Connected!");
    }).catch((err) => {
      console.log("Error: "+err);
    });
  // Public
    app.use(express.static(path.join(__dirname, "public")));

// Rotas
  app.get('/', (req, res) => {
    res.send('home');
  });
  app.use('/contas', contas)

// Outro
  const PORT = process.env.PORT || 8081
  app.listen(PORT, () => {
    console.log("Servidor rodando! ")
  })
