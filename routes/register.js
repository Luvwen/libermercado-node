const express = require('express');
const router = express.Router();
const {
    registerUser,
    showRegister
} = require('../controllers/registerControllers');

const { body, check, validationResult } = require('express-validator');

router.get('/', [
    check('username').isLength({min: 6, max: 15}), 
    check('email').isEmail(), 
    check('password').isLength({min: 8, max: 15}), 
    check('password_confirm').isLength({min: 8, max: 15})
] ,showRegister);

router.post('/', registerUser);

module.exports = router;
