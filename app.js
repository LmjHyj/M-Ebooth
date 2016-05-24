var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var mongoose = require('mongoose');    //引用mongoose模块
var db = mongoose.createConnection('localhost','mebooth'); //创建一个数据库连接
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(){
//一次打开记录
});
var PersonSchema = new mongoose.Schema({
  name:String   //定义一个属性name，类型为String
});
//将该Schema发布为Model
var PersonModel = db.model('Person',PersonSchema);
//如果该Model已经发布，则可以直接通过名字索引到，如下：
//var PersonModel = db.model('Person');
//如果没有发布，上一段代码将会异常

//用Model创建Entity
var personEntity = new PersonModel({name:'Krouky'});
//打印这个实体的名字看看
console.log(personEntity.name); //Krouky

//我们甚至可以为此Schema创建方法
//为Schema模型追加speak方法
/*PersonSchema.methos.speak = function(){
  console.log('我的名字叫'+this.name);
}
var PersonModel = db.model('Person',PersonSchema);
var personEntity = new PersonModel({name:'Krouky'});
personEntity.speak();//我的名字叫Krouky
//Entity是具有具体的数据库操作CRUD的*/
personEntity.save();  //执行完成后，数据库就有该数据了

//如果要执行查询，需要依赖Model，当然Entity也是可以做到的
PersonModel.find(function(err,persons){
//查询到的所有person
  console.log(persons);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
