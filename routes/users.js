            const express = require('express');
            const router = express.Router();
            const { User } = require('../schemas/user');
            const { authUser } = require('../config/userAuth');
            
            const ResponseModel = require('../schemas/response');
            const RequestMode = require('../schemas/clearRequest');

            const bcrypt = require('bcryptjs');
            
                //Admins handler
            router.get('/admins', authUser, (req, res) => {
                User.find()
                .then(users => {
                    res.render('admins', {title : '| Admins', errors : '', users : users })
                }).catch(err => console.log(err))
            
            });

            //lecturers viewing student details
            router.get('/student-details/:id', authUser, (req, res) => {
                const id = req.params.id;
                User.findById(id)
                .then(student => {
                        res.render('studentDetails', {title: '| Student Details', student})
                }).catch(err => console.log(err))
            });


                //students handler
            router.get('/students', authUser, (req, res) => {
                User.find()
                .then(users => {
                    
                    res.render('students', {title : '| Students', errors : '', users : users})
                }).catch(err => console.log(err))
            
            });

            router.get('/view-lecturers', authUser, (req, res) => {
                User.find()
                .then(lecturers => {
                    res.render('view_lecturers', {lecturers, title : '| View Lecturers'});
                }).catch(err => console.log(err))
            });

            //Course clearance Requests
            router.post('/clear', authUser, (req, res) => {
                const requestMode = new RequestMode(req.body);
                 requestMode.save()
                 .then(() => {res.redirect('/')})
                 .catch(err => console.log(err))
            });

                //Lecturer view requests
                router.get('/view-requests', authUser, (req, res) => {
                    const user = req.user;
                    RequestMode.find()
                    .then(requests => {
                        res.render('allRequests', {title : '| Lecturer Requests', requests, user})
                    }).catch(err => console.log(err))
                })


            //Lecturer viewing single Request
            router.get('/view-requests/:id', authUser, (req, res) => {
                const id = req.params.id;
                RequestMode.findById(id)
                .then((request) => {
                    res.render('clearResponse.ejs', {title : '| Clear Course Response', request})
                })
                .catch(err => console.log(err))
            });

            //response form the lecturer
            router.post('/request-response', authUser, (req, res) => {
            
                const response = new ResponseModel(req.body);
                response.save()
                .then(() => {res.redirect('/')})
                .catch(err => console.log(err))
            })

            //Students cleared courses
            router.get('/view-cleared', authUser, (req, res) => {
                const user = req.user;
                ResponseModel.find()
                .then(results => {
                    res.render('cleared', {title : '| cleared Courses', results, user});
                }).catch(err => console.log(err))
            });


            //single lecturer and and send request
            router.get('/lecturer/:id', authUser, (req, res) => {
                const user = req.user;
                const id = req.params.id;
                User.findById(id)
                .then((lecturer) => {
                    res.render('sendRequest', {title : '| Clear Request', user, lecturer})
                }).catch(err => console.log(err))
            })

                //lecturers handler
            router.get('/lecturers', authUser, (req, res) => {
                User.find()
                .then(user => {
                    res.render('lecturers', {title : '| Lecturers', errors : '', users : user})
                }).catch(err => console.log(err))
                
            });



            //get details of a single lecturer
            router.get('/lecturer-details/:id', (req, res) => {
                const id = req.params.id;
                User.findById(id)
                .then(lecturer => {
                    res.render('lecturer_details', {title : '| Lecturer Details', lecturer})
                })
                .catch(err => console.log(err))
            })

            router.get('/admin-details/:id', (req, res) => {
                const id = req.params.id;
                User.findById(id)
                .then(admin => {
                    res.render('admin_details', {title : '| Lecturer Details', admin})
                })
                .catch(err => console.log(err))
            })



            //rendering the registration form

            router.get('/register', authUser,  (req, res) => {res.render('register', {title : '| Register', errors : ''})});

            //register user handler
            router.post('/register', authUser, (req, res) => {

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

              
               router.get('/student-register', (req, res) => {
                   res.render('studentRegister', {title : '| Register', errors : ''});
               });
                
                //student register handler
                router.post('/student', (req, res) => {

                    const {first_name, last_name, email, number, dep, sex, role } = req.body;

                    User.findOne({number : number})

                    .then(user => {
                        if (user) {
                            res.render('studentregister', {error : 'The computer number you have entered is already registered', title : '| Register'})
                        }

                        if (!user) {
                            let newStudent = new User({first_name, last_name, email, number, dep, sex, role});
                            bcrypt.hash(number, 10).then(function(hash) {
                                newStudent.password = hash;
                                newStudent.save()
                                .then( () => {
                                    res.redirect('/login')
                                })
                                .catch(err => console.log(err))
                            })
                        }
                    }).catch(err => console.log(err))
                    
                });
              



            module.exports = router;