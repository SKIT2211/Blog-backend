const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/app-db"

mongoose.connect(url).then(()=>{
    console.log("Mongodb connection is working now!!")
}).catch((err)=>{
    console.log("connection failed!! ",err.message)
})