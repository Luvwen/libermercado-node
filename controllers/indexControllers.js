const session = require('express-session');

const indexControllers = {
    home: (req, res, next) => {
        if (req.session.loggedUser !== undefined) {
            return res.render('index', {
                title: 'HOLA GENTE',
                button: true
            });
        }
        res.render('index', {
            title: 'Express',
            button: false
        });
    }
};

module.exports = indexControllers;
