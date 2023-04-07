const jwt = require("jsonwebtoken");
const RegisterUser = require("../models/registerUserSchema");

const auth = (req, res, next)=>{
    try{    
        
    }catch(err){
        res.status(404).send(err.message)
    }
}