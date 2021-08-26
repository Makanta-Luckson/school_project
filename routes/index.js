const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {res.render('welcome', {title : '| home'})});
router.get('/login', (req, res) => {res.render('login', {title : '| Sign in'})});

module.exports = router;