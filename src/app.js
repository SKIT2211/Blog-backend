require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();


require('../src/db/conn')

app.use(express.json());
app.use(cors())
    
const port = process.env.PORT || 9000;
const userRouter = require("./routers/userRouter")
const blogRouter = require("./routers/blogRouter")

app.use("/users",userRouter)
app.use("/blogs",blogRouter)

app.use("/uploads", express.static("uploads"))

app.listen (port, ()=>{
    console.log(`backend port ${port} is working ..!`)
})