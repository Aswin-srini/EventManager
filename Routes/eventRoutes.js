const express = require('express');
const eventControl = require('./../controllers/eventController');

const exRou = express.Router();

exRou.route('/events-status')
    .get(eventControl.eventStatus)

exRou.route('/events-status/:id')
    .get(eventControl.eventStatusByID)

exRou.route('/')
    .get(eventControl.getAllEvents)
    .post(eventControl.CreateNewEvent)

exRou.route('/:id')
    .get(eventControl.getEventsById)
    .patch(eventControl.updateEvent)
    .delete(eventControl.DeleteEvent)


module.exports = exRou;
