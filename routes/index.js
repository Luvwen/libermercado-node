var express = require('express');
var router = express.Router();

const { home } = require('../controllers/indexControllers.js')

router.get('/', home);

module.exports = router;
