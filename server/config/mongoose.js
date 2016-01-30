mongoose = require('mongoose');
var fs = require('fs');

<<<<<<< HEAD
mongoose.connect('mongodb://localhost/userSchema');

=======
mongoose.connect('mongodb://localhost/projectMEANSchema');
>>>>>>> origin/master

var models_path = __dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})