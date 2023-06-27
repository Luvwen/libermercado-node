const database = require('../database/database');
const bcrypt = require('bcrypt');
const session = require('express-session');

const loginControllers = {
    showLogin: (req, res) => {
        res.render('login', { message: '' });
    },
    loginUser: (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.render('login', { message: 'Email and password are required' });
        }
        database.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (error, data) => {
                if (data.length === 0) {
                    return res.render('login', { message: 'Email invalid' });
                } else if (
                    !(await bcrypt.compare(password, data[0].user_password))
                ) {
                    return res.render('login', {
                        message: 'Wrong password, try again'
                    });
                } else {
                    req.session.loggedUser = data;
                    res.redirect('/');
                }
            }
        );
    },
    logout: (req, res) => {
        req.session.destroy();
        res.send('deslogeado papu');
    }
};

module.exports = loginControllers;
