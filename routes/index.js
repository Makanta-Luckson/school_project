const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/logConfig')(passport);

router.get('/', (req, res) => {
   const user = req.user;
   res.render('welcome', {title : '| home', user : user})
});

router.get('/login', (req, res) => {res.render('login', {title : '| Sign in'})});

router.post('/login', (req, res, next) => {
 passport.authenticate('local', {
    successRedirect : '/'
 })(req, res, next)
});
module.exports = router;