const indexControllers = {
    home: (req, res, next) => {
        if (
            req.session.loggedUser !== undefined ||
            req.cookies.userLogin !== undefined
        ) {
            req.session.loggedUser = req.cookies.userLogin;
            return res.redirect('/inventory');
        }
        res.redirect('/auth/login');
    }
};

module.exports = indexControllers;
