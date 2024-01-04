const express = require('express');
const getAllEvents = require('../controllers/events/getAllEvents');
const addEvent = require('../controllers/events/addEvent');
const getEvent = require('../controllers/events/getEvent');
const editEvent = require('../controllers/events/editEvent');
const authTeamMember = require('../middlewares/authAdmin');

const eventsRouter = express.Router();

eventsRouter.get('/', getAllEvents);
eventsRouter.post('/addEvent', authTeamMember, addEvent);
eventsRouter.get('/:idEvent', getEvent);
eventsRouter.put('/editEvent/:idEvent', authAdmin, editEvent);

module.exports = eventsRouter;