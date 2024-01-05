const express = require('express');
const experiencesRouter = express.Router();

const authAdmin = require('../middlewares/authAdmin');

/* const getAllExperiences = require('../controllers/experiences/getAllExperiences');
const addExperience = require('../controllers/experiences/addExperience');

experiencesRouter.get('/', getAllExperiences);
experiencesRouter.post('/addExperience', authAdmin, addExperience);
 */
module.exports = experiencesRouter;
