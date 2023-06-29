const database = require('../database/database')

const rememberUser = (req, res, next) => {
    next()
    if(req.cookies.userLogin !== undefined && req.session.loggedUser === undefined){
        const email = req.cookies.userLogin
        database.query('SELECT * FROM users WHERE email = ?', [email], async (error, data) => {
            if(error) {
                console.log(error)
            }
            req.session.loggedUser = data;
        });
    }
}

module.exports = rememberUser