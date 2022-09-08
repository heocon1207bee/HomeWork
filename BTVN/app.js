const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

connectDB()

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev')); // in ra logger
app.use(express.json()); // show chuoi json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // parse cookie ra json
app.use(express.static(path.join(__dirname, 'public'))); // bien thu muc public thanh static

// dinh nghia router
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
