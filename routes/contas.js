const express = require('express')
const mongoose = require('mongoose')
require("../models/contas")
const Contas = mongoose.model('contas')

const router = express.Router()

router.get('/:id', (req, res) => {
  Contas.find({id_comprador:req.params.id}).lean().then((contas) => {
    res.json(contas);
  }).catch((err) => {
    res.send('Error: '+err)
  })
});

router.get('/pagar', (req, res) => {
  Contas.find({pago:false}).lean().then((contas) => {
    res.json(contas);
  }).catch((err) => {
    res.send('Error: '+err)
  })
});

router.get('/pagar',  (req, res) => {
  Contas.find({pago:false}).then((conta) => {
    res.json(contas);
  }).catch((err) => {
    res.redirect('/contas');
  });
});

router.post('/pagar/:id', (req, res) => {
  Contas.findOne({_id:req.params.id}).then((conta) => {
    if (!conta.pago){
      conta.parcelas -= 1;
      conta.total_pago += conta.preco;
      if (conta.parcelas == 0) {
        conta.pago = true;
      };
    };
    conta.save().then(() => {
      res.redirect('/contas');

    }).catch((err) => {
      res.redirect('/contas');
    });
  }).catch((err) => {
    res.redirect('/contas')
  });
});

router.post('/edit/:id', (req, res) => {
  Contas.findOne({_id:req.params.id}).then((conta) => {
    conta.produto = req.body.produto;
    conta.parcelas = req.body.parcelas;
    conta.preco = req.body.preco;
    conta.loja = req.body.loja;
    conta.preco_total = req.body.preco*req.body.parcelas;
    conta.total_pago = req.body.total_pago;
    conta.pago = req.body.pago;

    conta.save().then(() => {
      res.redirect('/contas');

    }).catch((err) => {
      res.redirect('/contas');
    });
  }).catch((err) => {
    res.redirect('/contas')
  });
});

router.post('/delete/:id', (req, res) => {
  Contas.deleteOne({_id:req.params.id}).then(() => {
    res.redirect('/contas');
  }).catch((err) => {
    res.redirect('/contas');
  });
});

router.get('/delete', (req, res) => {
  Contas.deleteMany().then(() => {
    res.redirect('/contas');
  }).catch((err) => {
    res.redirect('/contas');
  });
});

router.post('/add', (req, res) => {
  novaConta = {
    id_comprador: req.body.id,
    produto: req.body.produto,
    parcelas: req.body.parcelas,
    preco: req.body.preco,
    loja: req.body.loja,
    preco_total: req.body.preco*req.body.parcelas,
    total_pago: req.body.total_pago
  };

  new Contas(novaConta).save().then(() => {
    res.redirect('/contas')
  }).catch((err) => {
    console.log('Error: '+err)
    res.redirect('/contas')
  });
  res.send(req.body);
});

module.exports = router
