const jwt = require("jsonwebtoken");
const RegisterUser = require("../models/registerUserSchema");

const auth = (req, res, next)=>{
    try{    
        let tokenHeader = req.headers['Authorization'];
        token = tokenHeader && tokenHeader.split(' ')[1]; 

        if(token == null ){
            return res.sendStatus(419)
        }  
        jwt.verify(token, process.env.SECRET_ACCESS_KEY , () =>{
            
        })

    }catch(err){
        res.status(403).send(err.message)
    }
}

module.exports = auth ;