require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI);

const formulaSchema = new mongoose.Schema({
  username: String,
  formula: String,
  code: Number
});

const formulaModel = mongoose.model('formula', formulaSchema);

app.set('views', './views');
app.set('view engine', 'pug');

app.route('/').get((req, res) => {
  res.render('test.pug', {message: 'testing', formula: 'asdv12'});
//  res.sendFile(process.cwd() + '/index.html');
});

app.route('/createFormula').post((req, res) => {
  const { formula } = req.body;
  formulaModel.create({ formula: formula }, (err, formulaAdded) => {
    if (err) return console.error(err);
    console.log(formulaAdded);
  });
  res.redirect('/');
});

app.route('/editFormula').post((req, res) => {
  const { formula } = req.body;

  formulaModel.findOne({ formula }, (err, formulaFound) => {
    if (err) return console.error(err);
    console.log(formulaFound);
  });
  res.redirect('/');
});

app.route('/show').post((req, res) => {
  formulaModel.find({}, (err, allFormulas) => {
    if (err) return console.error(err);
    console.log(allFormulas);
  });
});
app.listen(3000);