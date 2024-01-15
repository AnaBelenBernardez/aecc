const express = require('express');

const router = express.Router();

const login = require('../controllers/admin/login');
const changePwd = require('../controllers/admin/changePwd');

const authAdmin = require('../middlewares/authAdmin');


router.post('/login', login);
router.put('/update-password/:idAdmin', authAdmin, changePwd);

module.exports = router;