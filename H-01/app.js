const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');

const homeRoute = require('./routes/index');
const aboutRoute = require('./routes/about');
const contactRoute = require('./routes/contact');
const postRoute = require('./routes/post');

//use third party middleware - view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// using middleware - register public folder
app.use(express.static('public'));

app.use('/', homeRoute);
app.use('/about', aboutRoute);
app.use('/contact', contactRoute);
app.use('/post', postRoute);

app.listen(4000, function () {
    console.log('Express server listening on port 4000');
});