const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');
const logger = require('./logs/logger');
const app = express();
const port = 8000;
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



mongoose.Promise = global.Promise;
mongoose.connect(db.url)
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));


const index = require('./routes/index');
const blogs = require('./routes/blogs');

app.set('views', './app/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', index);
app.use('/blogs', blogs);

const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) {
  logger.info('request', req.method, req.url);
  next();
});


app.listen(port, () => {
    console.log('We are live on ' + port);
});

// catch 404 and forward to error handler
app.use(function(req, res) {
    res.render('404');
});

//error handler
app.use(errorHandler);
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err.message })
}

module.exports = app;
