var express = require('express');
var app = express();

app.use(express.static(__dirname + "/client"));


var bodyParser = require('body-parser');
app.use(bodyParser.json({extended: true}));

var port = 8888;
var server = app.listen(port, function () {
	console.log('--------------------');
	console.log('--------'+port+'--------');
	console.log('--------------------');
});

require("./server/config/mongoose.js");

var routes = require("./server/config/routes.js");
routes(app);

