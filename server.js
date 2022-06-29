require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const squemas = require('./squemas.js');

const 

app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI);


const formulaModel = mongoose.model('formula', formulaSchema);

const rawMaterialModel = new mongoose.model('rawMaterial', rawMaterialSchema);

app.set('views', './views');
app.set('view engine', 'pug');

app.route('/')
  .get((req, res) => {
    res.render('index');
  })
  .post((req, res) => {
    const { rawMaterialBtn } = req.body;
    if (!!rawMaterialBtn) {
      res.render('rawMaterial');
    }
  });

app.route('/createRawMaterial')
  .post((req, res) => {
    const { name, code, cost, freightCode, freightCost, unit, createBtn, searchBtn, saveBtn } = req.body;

    let date = new Date();
    console.log(date);

    if (!!createBtn) {
      rawMaterialModel.create(
        Object.assign({ name, date }, { data: { code, cost, freightCode, freightCost, unit } }),
        (err, newRawMaterial) => {
          if (err) return console.error(err);
          //console.log('new raw material added', newRawMaterial[0].name);
          res.render('rawMaterial', { name: 'test2' });
        });
    } else if (!!searchBtn) {
      rawMaterialModel.find(
        { name },
        (err, updatedRawMaterial) => {
          if (err) return console.errror(err);
          console.log('updated raw material', updatedRawMaterial);

          res.render('rawMaterial', {
            name: updatedRawMaterial[0].name,
            code: updatedRawMaterial[0].data.code,
            cost: updatedRawMaterial[0].data.cost,
            freightCode: updatedRawMaterial[0].data.freightCode,
            freightCost: updatedRawMaterial[0].data.freightCost,
            date: updatedRawMaterial[0].date.toUTCString(),
          });
        }
      );
    } else if (!!saveBtn) {
      console.log('save', req.body);
      rawMaterialModel.findOneAndUpdate(
        { name },
        { data: { cost, freightCost, code, freightCode } },
        { new: true, overwrite: false },
        (err, updatedRawMaterial) => {
          console.log(updatedRawMaterial);
          if (err) return console.error(err);
          res.render('rawMaterial');
        });
    }
  });

app.route('/createFormula')
  .post((req, res) => {
    const { formula, code, productLine } = req.body;
    formulaModel.create({ formula: formula, code: code, productLine: productLine }, (err, formulaAdded) => {
      if (err) return console.error(err);
      console.log(formulaAdded);
    });
    res.redirect('/');
  });

app.route('/editFormula').post((req, res) => {
  const { formula, code, productLine, search, save } = req.body;
  console.log(!!search)

  if (!!search) {
    formulaModel.findOne({ formula: formula }, (err, formulaFound) => {
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
