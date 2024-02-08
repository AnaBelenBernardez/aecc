
const express = require('express');

const achievementsRouter = express.Router();

const authAdmin = require('../middlewares/authAdmin');
const achievementExists = require('../middlewares/achievementExists');

const getAllAchievements = require('../controllers/achievements/getAllAchievements');
const getAchievement = require('../controllers/achievements/getAchievement');
const addAchievement = require('../controllers/achievements/addAchievement');
const editAchievement = require('../controllers/achievements/editAchievement');
const deleteAchievement = require('../controllers/achievements/deleteAchievement');

achievementsRouter.get('/', getAllAchievements);
achievementsRouter.get('/:idAchievement', achievementExists, getAchievement);
achievementsRouter.post('/admin/add', authAdmin, addAchievement);
achievementsRouter.put('/admin/edit/:idAchievement', authAdmin, achievementExists, editAchievement);
achievementsRouter.delete('/admin/delete/:idAchievement', authAdmin, achievementExists, deleteAchievement);

module.exports = achievementsRouter;