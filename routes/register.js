const express = require('express')
const { showRegister } = require('../controllers/registerControllers')
const router = express.Router()

router.get('/', showRegister)


module.exports = router