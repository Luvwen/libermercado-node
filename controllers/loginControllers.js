const database = require('../database/database');
const bcrypt = require('bcrypt');

const loginControllers = {
    showLogin: (req, res) => {
        if (req.session.loggedUser === undefined) {
            if (req.cookies.userLogin !== undefined) {
                req.session.loggedUser = req.cookies.userLogin;
            }
            return res.render('login', { message: '' });
        }
        res.redirect('/');
    },
    loginUser: (req, res) => {
        const { email, password } = req.body;
        if (email.length === 0 || password.length === 0) {
            res.render('login', {
                message: 'El email y la contraseña son obligatorias'
            });
        }
        database.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (error, data) => {
                if (error) {
                    console.log(error);
                }
                if (data.length === 0) {
                    return res.render('login', { message: 'Email invalido' });
                } else if (
                    !(await bcrypt.compare(password, data[0].user_password))
                ) {
                    return res.render('login', {
                        message: 'Email o contraseña incorrectas'
                    });
                } else {
                    req.session.loggedUser = data;
                    res.cookie('userLogin', data[0], {
                        maxAge: 86400000
                    });
                    // const {id, username, email, user_password} = data[0]
                    // database.query('INSERT INTO loginusers SET?', {id_user: id, username: username, email: email, user_password: user_password}, (error, data) => {
                    //     if (error) {
                    //         console.log(error)
                    //     } else {
                    //         res.redirect('/');
                    //     }
                    // })
                    res.redirect('/');
                }
            }
        );
    },
    logout: (req, res) => {
        res.clearCookie('userLogin');
        req.session.destroy();
        res.redirect('/');
    }
};

module.exports = loginControllers;
