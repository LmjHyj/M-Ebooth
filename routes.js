var express = require('express');
module.exports = function(app){
	var users = require('./controllers/users_controller');
	app.use('/static',express.static('./static')).
		use('/lib',express.static('../lib'));
	app.get('/',function(req,res){
		if(req.session.user){
			req.render('index',{});
		}else{
			req.session.msg = 'Access denied!';
			req.redirect('/login');
		}
	});
	app.get('/login',function(req,res){
		
	});
	app.get('/user',function(req,res){
		
	});
	app.get('/signup',function(req,res){
		
	});
	app.get('/logout',function(req,res){
		
	});
}