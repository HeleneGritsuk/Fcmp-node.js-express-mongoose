const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbUrl = require('./config').url;
const port = require('./config').port;
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const index = require('./routes/index');
const handlers = require('./handlers/index.js');

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl)
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err));

app.set('views', './app/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

require('./routes/index')(app);

app.listen(port, () => {
    console.log('We are live on ' + port);
});
// catch 404 and forward to error handler
app.use(handlers.notFoundHandler);
//error handler
app.use(handlers.errorHandler);
