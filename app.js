            const express = require('express');
            const mongoose = require('mongoose');
            const { url } = require('./config/connect');
            const app = express();

            app.set('view engine', 'ejs');
            app.use(express.static('public'));

            app.use(express.urlencoded({extended : false}));
            // database connection
            mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology : true})
            .then(() => {console.log('Database connected')})
            .catch(err => console.log(err))


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