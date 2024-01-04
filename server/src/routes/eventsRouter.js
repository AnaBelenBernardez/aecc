const express = require('express');
/* const getAllEvents = require('../controllers/events/getAllEvents'); */
const addEvent = require('../controllers/events/addEvent');
const addPhotoEvent = require('../controllers/events/addPhotoEvent');
/* const getEvent = require('../controllers/events/getEvent');
const editEvent = require('../controllers/events/editEvent'); */
const authAdmin = require('../middlewares/authAdmin');

const eventsRouter = express.Router();

/* eventsRouter.get('/', getAllEvents); */
eventsRouter.post('/admin/add', authAdmin, addEvent);
eventsRouter.post('/admin/add/:idEvent/photos', authAdmin, addPhotoEvent);
/* eventsRouter.get('/:idEvent', getEvent);
eventsRouter.put('/editEvent/:idEvent', authAdmin, editEvent); */

module.exports = eventsRouter;