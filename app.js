require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const inventoryRouter = require('./routes/inventory');
const errorRouter = require('./routes/error');
const database = require('./database/database');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'Mensaje Secreto' }));
app.use(methodOverride('_method'));
app.use(fileUpload());
app.use('/', indexRouter);
app.use('/auth', loginRouter);
app.use('/auth/register', registerRouter);
app.use('/inventory', inventoryRouter);
app.use('/error', errorRouter);
app.use('/check', (req, res) => {
    if (req.session.loggedUser === undefined) {
        res.send('not logged');
    } else {
        res.send('logged');
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next();
    res.render('error', {
        errorNumber: 404,
        errorType: 'Página inexistente',
        errorDescription: '¡Parece que te perdiste, intentá nuevamente!',
    });
});

try {
    database.connect();
    console.log('DB conectada');
} catch (error) {
    console.log(error);
}

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        errorNumber: 500,
        errorType: 'Página inaccesible',
        errorDescription: '¡Parece que algo salió mal, intente nuevamente!',
    });
});

module.exports = app;
