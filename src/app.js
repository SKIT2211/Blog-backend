require('dotenv').config();

const express = require('express');
const app = express();

require('../src/db/conn')

const port = process.env.PORT || 9000;
const RegisterUser = require("./routers/router")
const homePage = require("./routers/router")


app.use(express.json());
app.use("/",homePage)
app.use("/",RegisterUser)

app.listen (port, ()=>{
    console.log("port is working now..!")
})