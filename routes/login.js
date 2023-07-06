const express = require('express');
const router = express.Router();

const {
    showLogin,
    loginUser,
    logout,
} = require('../controllers/loginControllers');

router.get('/login', showLogin);

router.post('/login', loginUser);

router.get(
    '/logout',
    (req, res, next) => {
        if (req.session) {
            next();
        }
    },
    logout
);

module.exports = router;
