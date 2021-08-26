const express = require('express');
const router = express.Router();
const { User } = require('../schemas/user');

router.get('/register', (req, res) => {res.render('register', {title : '| Register'})});
router.get('/admins', (req, res) => {res.render('admins', {title : '| Admins'})});
router.get('/students', (req, res) => {res.render('students', {title : '| Students'})});
router.get('/lecturers', (req, res) => {res.render('lecturers', {title : '| Lecturers'})});

//register user handler
router.post('/register', (req, res) => {

    const user = new User(req.body);

    console.log(user);
    res.send('Sent');
})



module.exports = router;