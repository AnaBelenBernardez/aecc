const express = require('express');

const router = express.Router();

const login = require('../controllers/admin/login');


router.post('/login', login);

module.exports = router;