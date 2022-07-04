require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { formulaSchema, rawMaterialSchema, userSchema } = require('./squemas.js');
const routes = require('./routes');
const passport = require('passport');
const auth = require('./auth');
const session = require('express-session');

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// mongodb and mongoose
mongoose.connect(process.env.MONGO_URI);
const userModel = new mongoose.model('user', userSchema);
const formulaModel = new mongoose.model('formula', formulaSchema);
const rawMaterialModel = new mongoose.model('rawMaterial', rawMaterialSchema);

app.set('views', './views');
app.set('view engine', 'pug');

// call routes
routes(app, formulaModel, rawMaterialModel, userModel);
auth(userModel)
app.listen(3000);