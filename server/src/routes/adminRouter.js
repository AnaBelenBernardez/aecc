const express = require('express');

const router = express.Router();

const authAdmin = require('../middlewares/authAdmin');

const login = require('../controllers/admin/login');


router.post('/login', authAdmin, login);

module.exports = router;