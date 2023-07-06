const indexControllers = {
    home: (req, res, next) => {
        try {
            if (
                req.session.loggedUser !== undefined ||
                req.cookies.userLogin !== undefined
            ) {
                req.session.loggedUser = req.cookies.userLogin;
                return res.redirect('/inventory');
            }
            res.redirect('/auth/login');
        } catch (error) {
            res.render('error', {
                errorNumber: 403,
                errorType: 'Intento de ingreso incorrecto',
                errorDescription: 'Intente nuevamente dentro de unos minutos',
            });
        }
    },
};

module.exports = indexControllers;
