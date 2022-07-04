const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');

module.exports = (app, formulaModel, rawMaterialModel, userModel) => {
  /****************************** 
    index 
  *******************************/
  app.route('/')
    .get((req, res) => res.render('login'))
    .post((req, res) => {
      const { rawMaterialBtn, formulasBtn, logoutBtn } = req.body;
      if (!!rawMaterialBtn) res.render('rawMaterial');
      if (!!formulasBtn) res.render('formulas');
      if (!!logoutBtn) res.redirect('/logout');
    });

  /****************************** 
    login
  *******************************/
  app.route('/login').post(passport.authenticate('local', {
    failureRedirect: '/'
  }), (req, res) => {
    const { loginBtn, signupBtn, username } = req.body;
    if (!!loginBtn) return res.render('index', { username })
    if (!!signupBtn) return res.render('signup');
  }).get((req, res, next) => {
    return res.render('login')
  });
  /****************************** 
    sign up 
  *******************************/
  /*
    app.route('/signup').post((req, res) => {
      const { username, password, password2 } = req.body;
      const hash = bcrypt.hashSync(password, 12);
  
      userModel.findOne({ username: username }, (err, foundUser) => {
  
  
        if (err) return console.error(err);
        if (foundUser) res.render('signup', { message: 'the username exist!' });
        if (password !== password2) res.render('signup', { message: 'passwords are different' });
        if (!foundUser && password === password2) {
          userModel.create({ username, password: hash }, (err, userCreated) => {
            if (err) return console.err(err);
            res.render('login');
          });
        }
      })
    }).get((req, res, next) => res.render('signup'));
  */
  /****************************** 
    raw material 
  *******************************/
  app.route('/createRawMaterial')
    .post((req, res) => {
      const { name, code, cost, freightCode, deparment, unit, createBtn, searchBtn, saveBtn } = req.body;
      let date = new Date();

      if (!!createBtn) {
        rawMaterialModel.create(
          Object.assign({}, { name, code, cost, freightCode, deparment, unit, date }),
          (err, newRawMaterial) => {
            if (err) return console.error(err);
            res.render('rawMaterial');
          });

      } else if (!!searchBtn) {
        rawMaterialModel.find(
          { name },
          (err, updatedRawMaterial) => {
            if (err) return console.errror(err);
            console.log('updated raw material', updatedRawMaterial);

            res.render('rawMaterial', {
              name: updatedRawMaterial[0].name,
              code: updatedRawMaterial[0].code,
              cost: updatedRawMaterial[0].cost,
              freightCode: updatedRawMaterial[0].freightCode,
              unit: updatedRawMaterial[0].unit,
              deparment: updatedRawMaterial[0].deparment,
              date: updatedRawMaterial[0].date.toUTCString()
            });
          }
        );
      } else if (!!saveBtn) {
        console.log('save', req.body);
        rawMaterialModel.findOneAndUpdate(
          { name },
          { name, code, cost, freightCode, unit, deparment, date },
          { new: true, overwrite: false },
          (err, updatedRawMaterial) => {
            console.log(updatedRawMaterial);
            if (err) return console.error(err);
            res.render('rawMaterial');
          });
      }
    });

 
  app.route('/index').get((req, res) => {
    res.render('index');
  });
  
  /****************************** 
    formulas 
  *******************************/
  app.route('/createFormula')
    .post((req, res) => {
      const { formula, code, productLine } = req.body;
      formulaModel.create({ formula: formula, code: code, productLine: productLine }, (err, formulaAdded) => {
        if (err) return console.error(err);
        console.log(formulaAdded);
      });
      res.redirect('/');
    });

  app.route('/editFormula')
    .post((req, res) => {
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

  app.route('/show')
    .post((req, res) => {
      formulaModel.find({}, (err, allFormulas) => {
        if (err) return console.error(err);
        console.log(allFormulas);
      });
    });

  /****************************** 
  formulas 
*******************************/
  app.get('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.redirect('/');
    });
  });
};