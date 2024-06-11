var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var indexRouter = require('./routes/index');

var app = express();
const mongoose = require('mongoose');
const passport = require('passport');
mongoose.set("strictQuery", false)
const mongoDb = process.env.MONGODB_URI
main().catch((err) => console.log(err))
async function main () {
  await mongoose.connect(mongoDb)
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
var session = require('express-session')
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: (60000 * 60 * 24)}
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
