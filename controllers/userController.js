const mongoose = require('mongoose');
const User = require('./../Models/user');

exports.creatNewUser = async (req,res) =>{
    try{
        const newUser = await User.create(req.body);
        
        res.status(201).json({
        Status: 'Success',
        data:{newUser}
    })
    }catch(error){
        res.status(400).json({
        Status: 'Fail',
        message : error.message
    })
    }
}

exports.getuserById = async (req,res) =>{
    try {
        const getUser = await User.aggregate([
            {$match : {_id : new mongoose.Types.ObjectId(req.params.id)}},
            {
                $lookup : {
                    from:'bookings',
                    localField : '_id',
                    foreignField : 'userID',
                    as : 'booking'
                }
            },
            {$unwind : '$booking'},
            {$lookup : {
                from:'events',
                let : {evt_id : '$booking.eventId'},
                pipeline : [
                    {$match : {$expr:{$eq:['$_id','$$evt_id']}}},
                    {$project :{eventName:1,eventDateandTiming:1,venue:1,price:1}}
                ],
                as:'eventdet'
            }
            },
            {$unwind : '$eventdet'},
            {$addFields : {
                "totalAmount":{
                    $multiply:['$eventdet.price',"$booking.numberOfTicket"]
                }
            }},
            {$group : {
                    _id: '$_id',
                    name: {$first : '$name'},
                    mail: {$first:'$eMail'},
                    event : {
                        $push : {
                            eventname:'$eventdet.eventName',
                            noofticket:'$booking.numberOfTicket',
                            venue:'$eventdet.venue',
                            Timing:'$eventdet.eventDateandTiming',
                            totalAmount:'$totalAmount'
                        }
                    }
            }},
        ]) 
        res.status(200).json({
            Status : 'Success',
            getUser
        })
    } catch (error) {
        res.status(404).json({
            Status : 'Not found',
            message : error
        })
    }
}

exports.viewAlluser = async (req,res) =>{
    try {
        const getUser = await User.find()

        res.status(200).json({
            Status : 'Success',
            getUser
        })
    } catch (error) {
        res.status(404).json({
            Status : 'Not found',
            message : error.message
        })
    }
}