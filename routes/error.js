const express = require('express')
const router = express.Router()

const errorControllers = require('../controllers/errorControllers')

router.get('/', errorControllers)

module.exports = router