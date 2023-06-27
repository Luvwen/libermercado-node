const session = require('express-session');

const indexControllers = {
    home: (req, res, next) => {
        if (req.session.loggedUser !== undefined) {
            const redirect = () => res.redirect('/auth/login');
            return res.render('index', {
                title: 'HOLA GENTE',
                button: true,
                redirect: redirect
            });
        }
        res.render('index', {
            title: 'Express',
            button: false
        });
    }
};

module.exports = indexControllers;
