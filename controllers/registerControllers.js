const bcrypt = require('bcrypt');
const database = require('../database/database');

const {
    checkLength,
    comparePassword,
    isEmail,
    isEmpty,
} = require('../utils/validation');

const registerControllers = {
    showRegister: (req, res) => {
        try {
            if (req.session.loggedUser === undefined) {
                return res.render('register', { message: '' });
            }
            res.redirect('/');
        } catch (error) {
            res.render('error', {
                errorNumber: 403,
                errorType: 'Intento de ingreso incorrecto',
                errorDescription: 'Intente nuevamente dentro de unos minutos',
            });
        }
    },
    registerUser: async (req, res) => {
        try {
            const { username, email, password, password_confirm } = req.body;
            if (
                isEmpty(username) ||
                isEmpty(email) ||
                isEmpty(password) ||
                isEmpty(password_confirm)
            ) {
                return res.render('register', {
                    message: 'Uno o mas campos estan vacíos',
                });
            }
            if (!isEmail(email)) {
                return res.render('register', {
                    message: 'Email con formato inválido',
                });
            }
            database.query(
                'SELECT email FROM users WHERE email = ?',
                [email],
                async (error, data) => {
                    if (error) {
                        console.log(error);
                    }
                    if (!isEmpty(data)) {
                        return res.render('register', {
                            message: 'Email ya registrado',
                        });
                    } else if (
                        !checkLength(password, 8, 15) ||
                        !checkLength(password_confirm, 8, 15)
                    ) {
                        return res.render('register', {
                            message:
                                'Las contraseñas tienen que tener entre 8 y 15 caracteres',
                        });
                    } else if (!comparePassword(password, password_confirm)) {
                        return res.render('register', {
                            message: 'Las contraseñas deben coincidir',
                        });
                    } else {
                        let hashedPassword = await bcrypt.hash(password, 8);
                        database.query(
                            'INSERT INTO users SET?',
                            {
                                username: username,
                                email: email,
                                user_password: hashedPassword,
                            },
                            (error, data) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    return res.render('register', {
                                        message: 'Usuario creado correctamente',
                                    });
                                }
                            }
                        );
                    }
                }
            );
        } catch (error) {
            res.render('error', {
                errorNumber: 403,
                errorType: 'Intento de ingreso incorrecto',
                errorDescription: 'Intente nuevamente dentro de unos minutos',
            });
        }
    },
};

module.exports = registerControllers;
