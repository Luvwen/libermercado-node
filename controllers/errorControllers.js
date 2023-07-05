const errorControllers = {
    showError:  (req, res) => {
        res.render('error', {errorNumber: 404, errorType: 'Page not found', errorDescription: 'Anda a saber que paso acá maestro'})
    }
}

module.exports = errorControllers