const Booking = require('../Models/Booking');
// const mongoose = require('mongoose');
// const date = require('date-and-time');
// const helper=require('../utils/helpers');
const Event = require('./../Models/Events')

// exports.viewAllclients= async (req,res)=>{
//    try {
    
//     const skipVal = (req.query.page - 1) * (req.query.limit || 5) || 0;
//     const limitValue = parseInt(req.query.limit) || 5;
    
//     const users = await Booking.aggregate([
//         {$sort : {'bookingTime':1}},
//         {$skip : skipVal},
//         {$limit : limitValue}
//     ])
//     res.status(200).json({
//         status : 'Success',
//         count: users.length,
//         Data : {users}
//     })
//    } catch (err) {
//     res.status(400).json({
//         status : 'Error',
//         message : err.message 
//         })
//    } 
// }

// exports.viewByid =async (req,res) => {
//     try {
//         const ByID = await Booking.aggregate([
//             {$match:{_id: new mongoose.Types.ObjectId(req.params.id)}},
//             // {$lookup:{
//             //     from : "events",
//             //     localField : 'eventId',
//             //     foreignField : '_id' ,
//             //     as:"eventDetail" 
//             // }},
//         //     {$unwind : '$eventDetail'},
//         //    { $project: {
//         //             _id: 0,
//         //             userName: 1,
//         //             mailId: 1,
//         //             numberOfTicket: 1,
//         //             seatNumber: 1,
//         //             eventName: "$eventDetail.eventName",
//         //             eventDateandTiming: "$eventDetail.eventDateandTiming",
//         //             venue: "$eventDetail.venue",
//         //             price: "$eventDetail.price"
//         //         }
//         //     },
//         ])

//          if(!ByID[0]){
//          return  res.status(404).json({
//             status : 'not found',
//             message : 'Id is not found'
//             })  }

//         const formate= helper.formate(ByID[0].eventDateandTiming,date);
//         delete ByID[0].eventDateandTiming

//         const price = ByID[0].price * ByID[0].numberOfTicket
//         // console.log(ByID[0].price)
//         // console.log(ByID[0].numberOfTicket)
//         delete ByID[0].price

//         res.status(200).json({
//             status : 'Success',
//             count: ByID.length,
//             Data : {
//                 ...ByID[0],
//                 eventDate:formate,
//                 totalPrice:price
//             }
//     })
//    } catch (err) {
//     res.status(500).json({
//         status : 'Fail',
//         message : err.message
//         })
//    }
// }

exports.bookNew = async (req,res) => {
    try {
        const newBooking = await Booking.create(req.body)
        const event= await Event.findOne(newBooking.eventId)

        let eventDate =event.eventDateandTiming

        await newBooking.checkDate(req,res,eventDate)

        res.status(201).json({
            status : 'Created',
            Data : {
                newBooking
            }
        })
    } catch (err) {
         res.status(400).json({
            status : 'Error',
            message : err.message
        })
    }
}

exports.updateBooking= async (req,res) => {
    try {
        const updateBooking = await Booking.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

        if(!updateBooking){
         return  res.status(404).json({
            status : 'not found',
            message : 'Id is not found'
            })  }

        res.status(200).json({
            status : 'Success',
            count : updateBooking.length,
            Data : {
                updateBooking
            }
        })
    } catch (err) {
         res.status(400).json({
            status : 'Error',
            message : err.message
        })
    }
}

exports.DeleteBooking= async (req,res) => {
    try {
        const Delete = await Booking.findByIdAndDelete(req.params.id)

        if(!Delete){
         return  res.status(404).json({
            status : 'not found',
            message : 'Id is not found'
            })  }

        res.status(200).json({
            status : 'Success',
            Data : {
                Delete
            }
        })
    } catch (err) {
         res.status(400).json({
            status : 'Error',
            message : err.message
        })
    }
}
