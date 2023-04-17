const jwt = require("jsonwebtoken");
const RegisterUser = require("../models/registerUserSchema");

const auth = (req, res, next)=>{
    try{    
        let tokenHeader = req.header('Authorization');
        token = tokenHeader && tokenHeader.split(' ')[1]; 

        if(token == null ){
            return res.sendStatus(400)
        }  
        jwt.verify(token, process.env.SECRET_ACCESS_KEY , (err) =>{
            if(err){
            return res.status(419).send(err.message)
            }else{
                next(); 
            }
        })

    }catch(err){
        res.status(400).send(err.message)
    }
}

module.exports = auth ;