require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI);

const formulaSchema = new mongoose.Schema({
  username: String,
  formula: String,
  code: Number,
  productLine: String
});

const formulaModel = mongoose.model('formula', formulaSchema);

app.set('views', './views');
app.set('view engine', 'pug');

app.route('/').get((req, res) => {
  res.render('test.pug');//, { message: 'testing', formula: 'asdv12' });
  //  res.sendFile(process.cwd() + '/index.html');
});

app.route('/createFormula').post((req, res) => {
  const { formula, code, productLine } = req.body;
  formulaModel.create({ formula: formula, code: code, productLine: productLine}, (err, formulaAdded) => {
    if (err) return console.error(err);
    console.log(formulaAdded);
  });
  res.redirect('/');
});

app.route('/editFormula').post((req, res) => {
  const { formula, code, productLine, search, save } = req.body;
  console.log(!!search)

  if (!!search) {
    formulaModel.findOne({formula: formula}, (err, formulaFound) => {
      if (err) return console.error(err);

      console.log(formulaFound, req.body);

      res.render('test.pug', {
        showInput: true,
        formula: formulaFound.formula,
        code: formulaFound.code,
        productLine: formulaFound.productLine
      });
    })
  } else if (!!save) {
    formulaModel.findOneAndUpdate(
      { formula: formula },
      {
        formula: formula,
        code: code,
        productLine: productLine
      },
      {
        new: true,
        overwrite: false
      },
      (err, formulaFound) => {
        if (err) return console.error(err);

        console.log(formulaFound, req.body);

        res.render('test.pug', {
          showInput: true,
          formula: formulaFound.formula,
          code: formulaFound.code,
          productLine: formulaFound.productLine
        });
    });
  }

});

app.route('/show').post((req, res) => {
  formulaModel.find({}, (err, allFormulas) => {
    if (err) return console.error(err);
    console.log(allFormulas);
  });
});
app.listen(3000);
