const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userRegisterSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength: 3
    },
    email : {
        type: String,
        required: true,
        unique: [true, "Email is already present..!"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid error..!")
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength:3
    },
    role:{
        type: String,
        required: true,
        default: "User"
    }
})

const RegisterUser = new mongoose.model("RegisterUser", userRegisterSchema)

module.exports = RegisterUser ;