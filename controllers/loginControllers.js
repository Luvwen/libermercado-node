const loginControllers = {
    showLogin : (req, res) => {
        res.render('login')
    },
    loginUser : (req, res) => {
        res.send('Login user bruh')
    }
}

module.exports = loginControllers