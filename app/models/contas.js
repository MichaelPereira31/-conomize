const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contas = new Schema({
  id_comprador: {
    type: String,
    required: true
  },
  produto: {
    type: String,
    required: true
  },
  parcelas: {
    type: Number,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  vendedor: {
    type: String,
    required: true
  },
  preco_total: {
    type: Number,
    require: true
  },
  pago: {
    type: Number,
    default: 0
  },
  adicionado_em: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('contas', Contas)
