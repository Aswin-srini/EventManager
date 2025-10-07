const express = require('express');
const exRou = require ('./Routes/eventRoutes');
const bxRou = require('./Routes/bookingRoutes');
const uxRou = require('./Routes/userRoutes')
const dotenv = require('dotenv');
dotenv.config({path : './config/config.env'});
const DB = require('./config/DB');

const app = express();
const port = 8000;

app.use(express.json())

app.use('/Events',exRou);
app.use('/Booking',bxRou);
app.use('/User',uxRou)

/* Sever Connection */
app.listen(port,() => {
    console.log('Sever Connected')
})

/* For DB Connection */
DB.then(()=>{
    console.log("DataBase Connect Successfully")
})
.catch((err)=>{
    console.log(err.message)
})




