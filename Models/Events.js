const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventName : {
        type : String,
        trim : true,
        require : [true, 'Name is Require Field']
    },
    eventDateandTiming : {
        type : Date,
        require : [true, 'Timing is Require Field']
    },
    numberOfMins : {
        type : Number,
        require : [true, 'This is Require Field']
    },
    numberOfSeat : {
        type : Number,
        require : [true, 'This is Require Field']
    },
    venue : {
        type : String,
        require : [true, 'Venue is Require Field']
    },
    price : {
        type : Number,
        require : [true, 'price is Require Field']
    }
});

const Events = mongoose.model('event',EventSchema);

module.exports = Events;


