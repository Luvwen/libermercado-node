const express = require('express');
const router = express.Router();
const {
    registerUser,
    showRegister,
} = require('../controllers/registerControllers');

router.get('/', showRegister);

router.post('/', registerUser);

module.exports = router;
