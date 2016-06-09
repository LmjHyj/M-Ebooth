var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session:expressSession});
var mongoose = require('mongoose');
require('./models/user_model.js');
var conn = mongoose.connect("mongodb://localhost/mebooth");
var app = express();

app.engine('html',require('ejs').__express);
app.set('views',__dirname+'/views');
app.set('view engine','html');

app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({
	secret:'SECRET',
	cookie:{maxAge:60*60*1000},
	store:new mongoStore({
		db:mongoose.connection.db,
		collection:'sessions'
	})
}));
console.log(mongoose.connection);

require('./routes')(app);
module.exports = app;