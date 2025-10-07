const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path : './config.env'});

const DB = mongoose.connect(process.env.CONN_SRT)

module.exports=DB;
