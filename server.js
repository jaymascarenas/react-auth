const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;
// const colors = require('colors');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const logger = require('morgan');
const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(flash());
app.use(express.static('public'));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  }),
);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(routes);

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/reactauth',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) throw err;
    console.log('🐆  mongoose connection successful 🐆'.yellow);
    app.listen(PORT, (error) => {
      if (error) throw error;
      console.log(`🌎  connected on port ${PORT} 🌍`.cyan);
    });
  },
);
