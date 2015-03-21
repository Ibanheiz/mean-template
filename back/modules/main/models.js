var fs = require('fs');
var path = require('path');
var modulesPath = path.join(__dirname, '../');
var dirs = fs.readdirSync(modulesPath);

// Percorre os diretoŕios dentro da pasta back/modules
dirs.forEach(function (dir) {
  var dirAtual = modulesPath + dir;
  var convertDir = fs.lstatSync(dirAtual);

  // Verifica se é diretório e se não for o 'main'
  if (convertDir.isDirectory() && dir != 'main') {
    //console.log('dir: ' + dir);
    var files = fs.readdirSync(dirAtual);

    // Percorre os arquivos e diretórios dos módulos
    files.forEach(function (file) {
      var fileAtual = dirAtual + '/' + file;
      var convertFile = fs.lstatSync(fileAtual);

      // Verifica se é um File e se não for este próprio arquivo
      if (convertFile.isFile() && file == 'model.js') {
        // console.log(fileAtual);
        // Importa o model
        require(fileAtual);
      }
    });
  }
});