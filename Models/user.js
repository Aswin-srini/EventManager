const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true
    },
    eMail : {
        type : String,
        unique : true,
        trim : true
    }
})

const User = mongoose.model('User',userSchema);

module.exports=User;