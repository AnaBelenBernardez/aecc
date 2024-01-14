const express = require('express');
const experiencesRouter = express.Router();
const addExperience = require('../controllers/experiences/addExperience');
const getAllExperiences = require('../controllers/experiences/getAllExperiences');
const deleteExperience = require('../controllers/experiences/deleteExperience');
const authAdmin = require('../middlewares/authAdmin');


experiencesRouter.get('/', getAllExperiences);
experiencesRouter.post('/add', authAdmin, addExperience);
experiencesRouter.delete('/delete/:id', authAdmin, deleteExperience);



module.exports = experiencesRouter;






