module.exports = {

    authUser : function (req, res, next) {
        if (req.user == null) {
                res.redirect('/login')
        } else {
            return next();
        }
    }
}
