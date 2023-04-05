require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();


require('../src/db/conn')

const port = process.env.PORT || 9000;
const userRouter = require("./routers/userRouter")
const blogRouter = require("./routers/blogRouter")


app.use(express.json());
app.use(cors())
app.use("/users",userRouter)
app.use("/blogs",blogRouter)

app.listen (port, ()=>{
    console.log("port is working now..!")
})