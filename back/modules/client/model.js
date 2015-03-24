module.exports = function (mongoose) {
  var Schema = mongoose.Schema;

  var ClientSchema = new Schema({
    razaoSocial: {type: String, default: ''},
    cpf: {type: Number, min: 0},
    cnpj: {type: Number, min: 0},
    telefone: {type: Number, min: 0},
    data: { type: Date, default: Date.now }
  });

  return mongoose.model('Client', ClientSchema);
}
