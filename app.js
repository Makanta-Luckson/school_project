            const express = require('express');
            const mongoose = require('mongoose');
            const { db_url } = require('./config/connect');
            const strategy = require('./config/logConfig');
            const session = require('express-session');
            const flash = require('connect-flash');
            const passport = require('passport');
        
            const app = express();

            app.set('view engine', 'ejs');
            app.use(express.static('public'));

            
            // database connection
            mongoose.connect(db_url, {useNewUrlParser : true, useUnifiedTopology : true})
            .then(() => {console.log('Database connected')})
            .catch(err => console.log(err))


            //express sessions
            app.use(session({
                secret: 'keyboard cat',
                resave: true,
                saveUninitialized: true
              }))

              app.use(passport.initialize());
              app.use(passport.session());

              //flash connect
              app.use(flash());

              //login flash messages
              app.use((req, res, next) => {
                  res.locals.error_msg = req.flash('error_msg');
                  res.locals.error = req.flash('error');
                next();
              });

              app.use(express.urlencoded({extended : false}));
            
           //routes
            app.use('/', require('./routes/index'))
            app.use('/users', require('./routes/users'));

            // page not found middleware
            app.use((req, res, next) => {
                res.render('404', {title : '404 Error'});
                next();
            })





            const PORT = process.env.PORT || 8000;
            app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});