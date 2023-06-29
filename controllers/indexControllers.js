const indexControllers = {
    home: (req, res, next) => {
        if (req.session.loggedUser !== undefined) {
            return res.redirect('/inventory');
        }
        res.redirect('/auth/login')
    }
};

module.exports = indexControllers;
