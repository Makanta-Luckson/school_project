const express = require('express');
const router = express.Router();
const passport = require('passport');
const userAuth = require('../config/userAuth');
require('../config/logConfig')(passport);
const { authUser } = require('../config/userAuth');

router.get('/', authUser, (req, res) => {

   //storing the user in the variable 
   const user = req.user;
   //fetching the role of the user
   const role = req.user.role;

      if (role === 'Admin') {
         res.render('welcome', {title : '| home', user : user})
      }
      
      if (role === 'Lecturer') {
         res.render('dashboard', {title : '| home', user : user})
      }

      if (role === 'Student') {
         res.render('student_dashboard', {title : '| home', user : user})
      }
   
});


// login handler
router.get('/login', (req, res) => {res.render('login', {title : '| Sign in'})});

router.post('/login', (req, res, next) => {
 passport.authenticate('local', {
    successRedirect : '/'
 })(req, res, next)
});


// logout handler
router.get('/logout', ( req, res ) => {
   req.logOut()
   res.redirect('/login');
});

module.exports = router;