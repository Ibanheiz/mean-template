module.exports = function (mongoose) {
  var Schema = mongoose.Schema;

  var ClientSchema = new Schema({
    razaoSocial: {type: String, default: ''},
    cpf: {type: String, default: ''},
    cnpj: {type: String, default: ''},
    telefone: {type: String, default: ''},
    data: { type: Date, default: Date.now }
  });

  return mongoose.model('Client', ClientSchema);
}
