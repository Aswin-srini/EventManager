const express = require('express')
const bookingController = require('./../controllers/bookingController')

const bxRou = express.Router();

bxRou.route('/')
    // .get(bookingController.viewAllclients)
    .post(bookingController.bookNew)
    
bxRou.route('/:id')
    // .get(bookingController.viewByid)
    .patch(bookingController.updateBooking)
    .delete(bookingController.DeleteBooking)
    
module.exports = bxRou;