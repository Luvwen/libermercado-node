const bcrypt = require('bcrypt');
const database = require('../database/database');

const registerControllers = {
    showRegister: (req, res) => {
        if (req.session.loggedUser === undefined) {
            return res.render('register', { message: '' });
        }
        res.redirect('/');
    },
    registerUser: async (req, res) => {
        const { username, email, password, password_confirm } = req.body;
        if(username.length === 0 || email.length === 0 || password.length === 0 || password_confirm.length === 0){
            return res.render('register', {
                message: 'Uno o mas campos estan vacíos'
            });
        }
        database.query(
            'SELECT email FROM users WHERE email = ?',
            [email],
            async (error, data) => {
                if (error) {
                    console.log(error);
                }
                if (data.length > 0) {
                    return res.render('register', { message: 'Email ya registrado' });
                } else if (password !== password_confirm) {
                    return res.render('register', {
                        message: 'Las contraseñas deben coincidir'
                    });
                } else {
                    let hashedPassword = await bcrypt.hash(password, 8);
                    database.query(
                        'INSERT INTO users SET?',
                        {
                            username: username,
                            email: email,
                            user_password: hashedPassword
                        },
                        (error, data) => {
                            if (error) {
                                console.log(error);
                            } else {
                                return res.render('register', {
                                    message: 'Usuario creado correctamente'
                                });
                            }
                        }
                    );
                }
            }
        );
    }
};

module.exports = registerControllers;
