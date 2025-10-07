const mongoose = require('mongoose');
const Events=require('./../Models/Events')
const functions=require('../utils/helpers')
const date = require('date-and-time');

exports.getAllEvents = async(req,res) => {
    try{
    const skipVal = (req.query.page - 1) * (req.query.limit || 5) || 0;
    const limitValue = parseInt(req.query.limit) || 5 ;

    const AllEvents =  await Events.aggregate([
            {$skip : skipVal},
            {$limit : limitValue}
    ]);
    res.status(200).json({
        status : 'Success',
        count: AllEvents.length,
        Data : {AllEvents}
    })
}catch(err){
    res.status(400).json({
        status : 'Fail',
        message : err.message 
        })
}
} 

exports.getEventsById = async(req,res) => {
    try{
    const EventsById =  await Events.aggregate([
        {$match : {_id : new mongoose.Types.ObjectId(req.params.id)}},
        {$project : {__v:0}}
    ])

    if(!EventsById[0]){
         return  res.status(404).json({
            status : 'not found',
            message : 'Id is not found'
            })  }

    const formate= functions.formate(EventsById[0].eventDateandTiming,date);
    delete EventsById[0].eventDateandTiming

    res.status(200).json({
        status : 'Success',
        count: EventsById .length,
        Data : {
            ...EventsById[0],
            EventDate: formate
        }
    })
    }catch(err){
             res.status(400).json({
            status : 'Fail',
            message : err.message
            })  
}
} 

exports.CreateNewEvent = async (req,res) => {
    try {
        const newEvent = await Events.create(req.body)
            res.status(201).json({
            status : 'Success',
            count : newEvent.length,
            Data : {newEvent}
            })
    } catch (err) {
        res.status(400).json({
        status : 'Fail',
        message : err.message 
    })
    }
}

exports.DeleteEvent= async (req,res) => {
    try {
        const deleteEvent = await  Events.findByIdAndDelete(req.params.id)

        if(!deleteEvent){
         return  res.status(404).json({
            status : 'not found',
            message : 'Id is not found'
            })  }

        res.status(201).json({
            status : 'Success',
            count : deleteEvent.length,
            Data : {deleteEvent}
            })
    } catch (err) {
         res.status(400).json({
        status : 'Error',
        message : err.message 
    })
    }
}

exports.updateEvent = async (req,res) => {
    try {
        const updateEvent = await Events.findByIdAndUpdate(req.params.id,req.body,{new : true , runValidators:true})

        if(!updateEvent){
         return  res.status(404).json({
            status : 'not found',
            message : 'Id is not found'
            })  }

        res.status(201).json({
            status : 'Sucess',
            updateValue : {
                updateEvent
            }
        })
    } catch (err) {
        res.status(400).json({
            status : 'Error',
            updateValue : err.message
        })
    }
}

exports.eventStatus = async (req,res) => {
    try {

        const skipVal = (req.query.page - 1) * (req.query.limit || 5) || 0;
        const limitValue = parseInt(req.query.limit) || 5 ;

        const eventStatus = await Events.aggregate([
            {$lookup : {
                from : "bookings",
                localField : "_id",
                foreignField : "eventId",
                as : "users",
            }},

            {$unwind : '$users'},
            
            { $group : {
                _id : '$_id',
                eventName: { $first: '$eventName' },
                price : {$first:'$price'},
                users: { $push: "$users" },
            }},
            {$addFields : {
                    count: { $size: '$users' }
                }},
            {$sort : {count:-1}},
            {$project :  {
                eventName:1,
                price:1,
                totalAmount:1,
                'users.userName' : 1,
                'users.mailId' : 1,
                'users.numberOfTicket' : 1
            }},
            {$skip : skipVal},
            {$limit : limitValue}
        ])
        res.status(200).json({
            status : 'Sucess',
            count : eventStatus.length,
            eventStatus
        })
    } catch (err) {
        res.status(400).json({
            status : 'Error',
            updateValue : err.message
        })
    }
}

exports.eventStatusByID = async (req,res) => {
    try {

        const skipVal = (req.query.page - 1) * (req.query.limit || 5) || 0;
        const limitValue = parseInt(req.query.limit) || 5 ;

        const eventStatus = await Events.aggregate([
            {$match : {_id:new mongoose.Types.ObjectId(req.params.id)}},
            {$lookup:{
                from:'bookings',
                let:{id:'$_id'},
                pipeline:[
                    {$match:{$expr:{$eq:['$eventId','$$id']}}},
                    {$project:{_id:0,userID:1,numberOfTicket:1,}}
                ],
                as:'bookingDet'
            }},
            {$unwind : '$bookingDet'},
            {$lookup:{
                from:'users',
                let:{userid:'$bookingDet.userID'},
                pipeline:[
                    {$match:{$expr:{$eq:['$_id','$$userid']}}},
                    {$project:{_id:0,name:1,eMail:1,}}
                ],
                as:'user'
            }},
            {$unwind : '$user'},
            {$addFields : {
                "totalAmount":{
                    $multiply:['$price',"$bookingDet.numberOfTicket"]
                }
            }},
            {$addFields : {
                "totalTicket":'$bookingDet.numberOfTicket'
            }},
            {$group:{
                _id:'$_id',
                EventName:{$first:'$eventName'},
                EventTiming:{$first:'$eventDateandTiming'},
                venue:{$first:'$venue'},
                totalAmount:{$sum:'$totalAmount'},
                BookedNumOfSeat:{$sum:'$totalTicket'},
                price:{$first:'$price'},
                user:{
                    $push:{
                        userName:'$user.name',
                        Email:'$user.eMail',
                        noOfTicket:'$bookingDet.numberOfTicket'
                    }
                }
            }}
        ])
        
        if(!eventStatus[0]){
         return  res.status(404).json({
            status : 'not found',
            message : 'Id is not found'
            })  
        }

        res.status(200).json({
            status : 'Sucess',
            count : eventStatus.length,
            eventStatus 
        })
    } catch (err) {
        res.status(400).json({
            status : 'Error',
            updateValue : err.message
        })
    }
}
