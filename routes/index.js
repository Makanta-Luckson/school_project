const express = require('express');
const router = express.Router();
const passport = require('passport');
const userAuth = require('../config/userAuth');
require('../config/logConfig')(passport);
const { authUser } = require('../config/userAuth');
const bcrypt = require('bcryptjs');
const { User } = require('../schemas/user');
//
router.get('/', authUser, (req, res) => {

   let errors = [];
   //storing the user in the variable 
   const user = req.user;
   //fetching the role of the user
   const role = req.user.role;

      if (role === 'Admin') {
         res.render('welcome', {title : '| home', errors : '', user : user})
      }
      
      if (role === 'Lecturer') {
         res.render('dashboard', {title : '| home', errors : '', user : user})
      }

      if (role === 'Student') {
         res.render('student_dashboard', {title : '| home', errors : '', user : user})
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

  //change password
  router.get('/password', authUser, (req, res) => {
     const id = req.user._id;
     res.render('password', {title : '| Change Password', errors : '', id : id})
  });

  //change password handler
  router.post('/password/:id', authUser, (req, res) => {
     const id = req.params.id;
      const { password, password2 } = req.body;
      //error handler
       let errors = [];

       // empty fileds
       if (!password || !password2) {
            errors.push('Please make sure that all fileds are field in');
         }
      //password match
      if (password !== password2) {
         errors.push('password mismatch')
      }

      // password length
      if (password.length >= 8 ) {
         errors.push('Please make sure that length of your password is at least 8 characters')
      }

            //checking for possible errors
      if (errors.length > 0 ) {
            const id = req.user._id;
         res.render('password', {title : '| Password Change', errors : errors, id : id})
      } else {
         console.log(req.body);
         res.send('All set')
      }



  });

module.exports = router;