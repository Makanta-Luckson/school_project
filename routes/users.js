            const express = require('express');
            const router = express.Router();
            const { User } = require('../schemas/user');
            const { authUser } = require('../config/userAuth');
            //const userMailer  = require('../config/autoEmails');
            const bcrypt = require('bcryptjs');
            
            
            router.get('/register', authUser, (req, res) => {res.render('register', {title : '| Register', errors : ''})});

                //Admins handler
            router.get('/admins',    (req, res) => {
                User.find()
                .then(users => {
                    res.render('admins', {title : '| Admins', errors : '', users : users })
                }).catch(err => console.log(err))
            
            });


                //students handler
            router.get('/students',  authUser, (req, res) => {
                User.find()
                .then(users => {
                    
                    res.render('students', {title : '| Students', errors : '', users : users})
                }).catch(err => console.log(err))
            
            });

                //lecturers handler
            router.get('/lecturers', authUser, (req, res) => {
                User.find()
                .then(user => {

                    res.render('lecturers', {title : '| Lecturers', errors : '', users : user})
                }).catch(err => console.log(err))
                
            });

            //register user handler
            router.post('/register', authUser,(req, res) => {
                
                let errors = [];

                const { first_name, last_name, email, number, dep, sex, role } = req.body;
                const userEmail = email; 
                const link = 'https://clearance-system.herokuapp.com';
                const message = `You have been registered to use the ONLINE COURSE CLEARANCE SYSTEM, click the link ${link} to access the platform, below are the details to use when loging in \n use your email : ${userEmail} & your computer number : ${number}  to sign in`;
                
                                
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
                                 .then(() => {
                                     //userMailer(message, userEmail);
                                     res.redirect('/');
                                    })
                                 .catch(err => console.log(err))
                            });
                        }); 
                            }
                        }).catch(err => console.log(err))
                     
                    }

                });

              
                

              



            module.exports = router;