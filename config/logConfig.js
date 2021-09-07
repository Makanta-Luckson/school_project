const { User } = require('../schemas/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
    
    passport.use(

    new LocalStrategy({usernameField : 'email'}, function(email, password, done) {
            User.findOne({email : email})
            .then(user => {
                if (!user) {
                    return done(null, false, {message : 'The email you entered is not registered'})
                }
                else {

                    bcrypt.compare(password, user.password, function(err, isMatch) {
                        // result == true
                        if (err) {console.log(err)}
                        if (!isMatch) {
                            return done(null, false, {message : 'wrong password'})
                        } else {
                            return done(null, user)
                        }
                    });
                }

            }).catch(err => console.log(err))
    })
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

}