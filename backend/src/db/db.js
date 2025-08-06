const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("connected to  mongodb")
    })
    .catch((err)=>{
        console.error("Error connecting to mongodb ",err)
    })
}


module.exports = connectDB;