const indexControllers = {
    home: (req, res, next) => {
        res.render('index', { title: 'Express' });
      }
}

module.exports = indexControllers