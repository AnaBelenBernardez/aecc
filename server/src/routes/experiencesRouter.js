const express = require('express');
const experiencesRouter = express.Router();
const addExperience = require('../controllers/experiences/addExperience');
const getAllExperiences = require('../controllers/experiences/getAllExperiences');
const deleteExperience = require('../controllers/experiences/deleteExperience');
const authAdmin = require('../middlewares/authAdmin');
const experienceExists = require('../middlewares/experienceExists');


experiencesRouter.get('/', getAllExperiences);
experiencesRouter.post('/admin/add', authAdmin, addExperience);
// experiencesRouter.put('/admin/edit/:idExperience', authAdmin, experienceExists, editExperience);
experiencesRouter.delete('/admin/delete/:idExperience', authAdmin, experienceExists, deleteExperience);



module.exports = experiencesRouter;






