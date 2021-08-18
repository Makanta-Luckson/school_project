const express = require('express');
const app = express();

app.set('view engine', 'ejs');

//routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))





const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});