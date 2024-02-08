
const express = require('express');

const achievementsRouter = express.Router();

const authAdmin = require('../middlewares/authAdmin');

const getAllAchievements = require('../controllers/achievements/getAllAchievements');
const getAchievement = require('../controllers/achievements/getAchievement');
const addAchievement = require('../controllers/achievements/addAchievement');

achievementsRouter.get('/', getAllAchievements);
achievementsRouter.get('/:idAchievement', getAchievement);
achievementsRouter.post('/admin/add', authAdmin, addAchievement);



module.exports = achievementsRouter;