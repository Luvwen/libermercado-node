const bcrypt = require('bcrypt');
const database = require('../database/database');

const registerControllers = {
    showRegister: (req, res) => {
        res.render('register', { message: '' });
    },
    registerUser: async (req, res) => {
        const { username, email, password, password_confirm } = req.body;

        database.query(
            'SELECT email FROM users WHERE email = ?',
            [email],
            async (error, data) => {
                if (error) {
                    console.log(error);
                }
                if (data.length > 0) {
                    return res.render('register', { message: 'Email en uso' });
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
        // database.query(
        //     'SELECT email FROM users WHERE email = ?',
        //     [email],
        //     async (error, res) => {
        //         if (error) {
        //             console.log(error);
        //         }
        //         console.log(res);
        //         if (res.length > 0) {
        //             return res.render('register', {
        //                 message: 'The email is already in use'
        //             });
        //         } else if (password !== password_confirm) {
        //             res.render('register', {
        //                 message: 'Passwords dont match!'
        //             });
        //         } else {
        //             let hashedPassword = await bcrypt.hash(password, 8);

        //             database.query(
        //                 'INSERT INTO users SET?',
        //                 {
        //                     username: username,
        //                     email: email,
        //                     user_password: hashedPassword
        //                 },
        //                 (error, res) => {
        //                     if (error) {
        //                         console.log(error);
        //                     } else {
        //                         // console.log(res);
        //                         // return res.render('register', {
        //                         //     message: 'User registered!'
        //                         // });
        //                     }
        //                 }
        //             );
        //         }
        //     }
        // );
    }
};

module.exports = registerControllers;
