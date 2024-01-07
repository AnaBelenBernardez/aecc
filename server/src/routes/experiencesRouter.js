const express = require('express');
const experiencesRouter = express.Router();
const addExperience = require('../controllers/experiences/addExperience');
const getAllExperiences = require('../controllers/experiences/getAllExperiences');
const authAdmin = require('../middlewares/authAdmin');


experiencesRouter.get('/', getAllExperiences);
experiencesRouter.post('/add', authAdmin, addExperience);


module.exports = experiencesRouter;






