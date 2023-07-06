const express = require('express');
const router = express.Router();

const { showError } = require('../controllers/errorControllers');

router.get('/', showError);

module.exports = router;
