module.exports = function (mongoose) {
  var Schema = mongoose.Schema;

  var ClientSchema = new Schema({
    razaoSocial: {type: String, default: '', require: true},
    cpf: {type: Number, default: '', require: true},
    cnpj: {type: Number, default: '', require: true},
    telefone: {type: Number, default: '', require: true},
    data: { type: Date, default: Date.now }
  });

  return mongoose.model('Client', ClientSchema);
}
