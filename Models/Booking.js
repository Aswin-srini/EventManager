const mongoose = require("mongoose");
const moment = require('moment');
// const Event = require('./')
/* For Current Date  */
// const now = new moment().add(5, 'hours').add(30, 'minutes').toDate();

const BookingSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required: [true, 'userId is require field']
    },
    eventId : {
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'Events', 
        required: [true, 'eventId is require field']
    },
    numberOfTicket : {
        type : Number,
        require : [true, 'numberOfTicket is Require Field'],
    },
    seatNumber : {
        type : [Number],
        require : [true, 'seatNumber is Require Field'],
    },
    bookingTime : Date
})

BookingSchema.pre('save',function(next){
    this.bookingTime= new moment().add(5, 'hours').add(30, 'minutes').toDate();
    next()
})

BookingSchema.methods.checkDate= async function(req,res,eventDate){

    if((eventDate.getTime()/(1000*60) -120) < this.bookingTime.getTime()/(1000*60)){
       return res.status(201).json({
        message:'Event Start within 120mins.So Booking is closed'
       })
}
// console.log('-------------------------',this.bookingTime.getTime()/(1000*60))
}

const Booking = mongoose.model('booking',BookingSchema)

module.exports = Booking;