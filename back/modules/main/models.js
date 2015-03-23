var fs = require('fs');
var path = require('path');
var modulesPath = path.join(__dirname, '../');
var dirs = fs.readdirSync(modulesPath);
var inflection = require('inflection');
var mongoose = require('mongoose');

// Percorre os diretoŕios dentro da pasta back/modules
dirs.forEach(function (dir) {
  var dirAtual = modulesPath + dir;
  var convertDir = fs.lstatSync(dirAtual);

  // Verifica se é diretório e se não for o 'main' ou 'expose'
  if (convertDir.isDirectory() && dir != 'main' && dir != 'expose') {
    var files = fs.readdirSync(dirAtual);

    // Percorre os arquivos e diretórios dos módulos
    files.forEach(function (file) {
      var fileAtual = dirAtual + '/' + file;
      var convertFile = fs.lstatSync(fileAtual);

      if (convertFile.isFile()) {
        var modelName = inflection.camelize(file.replace('.js', '').replace('-', '_'));
        var modelSchema = require(fileAtual)[modelName + 'Schema'];
        mongoose.model(modelName, modelSchema);
      }
    });
  }
});