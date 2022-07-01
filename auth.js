const passport = require('passport');
const LocalStrategy = require('passport-local');

module.exports = (userModel) => {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      userModel.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        //if (!user.verifyPassword(password)) { return done(null, false); }
        if (user.password !== password) {
          done(null, false);
          console.log(user.password, password);
        }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
      done(err, user);
    });
  });
}