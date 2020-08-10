// Carregando modulos
  const express = require('express')
  const handlebars = require('express-handlebars')
  const bodyParser = require('body-parser')
  const contas = require('./routes/contas')
  const path = require('path')
  const mongoose = require('mongoose')


  const app = express()

// Configurações
  // Body parser
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

  // Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

  // Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/economize', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
      console.log("DataBase Connected!");
    }).catch((err) => {
      console.log("Error: "+err);
    });
  // Public
    app.use(express.static(path.join(__dirname, "public")));

// Rotas
  app.use('/contas', contas)
  
// Outro
  const PORT = 8081
  app.listen(PORT, () => {
    console.log("Servidor rodando! ")
  })
