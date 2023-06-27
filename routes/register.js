const express = require('express');
const {
    registerUser,
    showRegister
} = require('../controllers/registerControllers');
const router = express.Router();

router.get('/', showRegister);

router.post('/', registerUser);

module.exports = router;
