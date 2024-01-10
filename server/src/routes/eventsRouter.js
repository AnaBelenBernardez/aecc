const express = require('express');

const getAllEvents = require('../controllers/events/getAllEvents');
const addEvent = require('../controllers/events/addEvent');
const getEvent = require('../controllers/events/getEvent');
const editEvent = require('../controllers/events/editEvent');
const deleteEvent = require('../controllers/events/deleteEvent');
const deleteEventPhoto = require('../controllers/events/deleteEventPhoto')
const authAdmin = require('../middlewares/authAdmin');
const eventExist = require('../middlewares/eventExist');

const eventsRouter = express.Router();

eventsRouter.get('/', getAllEvents);
eventsRouter.get('/:idEvent', eventExist, getEvent);
eventsRouter.post('/admin/add', authAdmin, addEvent);
eventsRouter.put('/admin/edit/event/:idEvent', authAdmin, eventExist, editEvent);
eventsRouter.delete('/admin/delete/event/:idEvent', authAdmin, eventExist, deleteEvent);
eventsRouter.delete('/admin/:idEvent/delete/photo/:idPhoto', authAdmin, eventExist, deleteEventPhoto);

module.exports = eventsRouter;