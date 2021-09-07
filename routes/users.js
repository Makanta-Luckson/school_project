            const express = require('express');
            const router = express.Router();
            const { User } = require('../schemas/user');
            const { userAuth } = require('../config/userAuth');
            const bcrypt = require('bcryptjs');


            router.get('/register',  (req, res) => {res.render('register', {title : '| Register', errors : ''})});

                //Admins handler
            router.get('/admins',    (req, res) => {
                User.find()
                .then(users => {
                    res.render('admins', {title : '| Admins', errors : '', users : users })
                }).catch(err => console.log(err))
            
            });


                //students handler
            router.get('/students',  (req, res) => {
                User.find()
                .then(users => {
                    
                    res.render('students', {title : '| Students', errors : '', users : users})
                }).catch(err => console.log(err))
            
            });

                //lecturers handler
            router.get('/lecturers', (req, res) => {
                User.find()
                .then(user => {

                    res.render('lecturers', {title : '| Lecturers', errors : '', users : user})
                }).catch(err => console.log(err))
                
            });

            //register user handler
            router.post('/register', (req, res) => {
                
                let errors = [];

                const { first_name, last_name, email, number, dep, sex, role } = req.body;

                                
                if (!first_name, !last_name, !email, !number, !dep, !sex, !role) {
                    errors.push('Please make sure that all fiels that are field')
                }

                    if (errors.length !== 0) 
                    {
                        res.render('register', {title : '| Register', errors : 'please fill in all the fields'})
                    } else {

                        //check email existence
                        User.findOne({email : email})
                        .then(user => {
                            if (user) {res.render('register', {title : '| register', errors : 'The email you entered is already registered'})}

                            if (!user) {
                               //password hashing
                        const saltRounds = 10;
                        bcrypt.genSalt(saltRounds, function(err, salt) {
                            bcrypt.hash(number, salt, function(err, hash) {
                                // Store hash in your password DB.
                                 if (err) {console.log(err)}
                                 const password = hash;
                                 
                                 //creating a new user
                                 const user = new User({first_name, last_name, email, number, dep, sex, role, password });
                                  
                                 // saving user in the database
                                 user.save()
                                 .then(() => {res.redirect('/')})
                                 .catch(err => console.log(err))
                            });
                        }); 
                            }
                        }).catch(err => console.log(err))
                     
                    }

                });

              



            module.exports = router;