module.exports = {
    function(req, res, next) {
        if (req.user === '') {
            res.send('Please login first')
            next();
        }
    }
}