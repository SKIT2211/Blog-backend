const RegisterUser = require('../models/registerUserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res) => {
    try {
        const getUsers = await RegisterUser.find();
        res.status(200).send(getUsers)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const getUser = async (req, res) => {
    try {
        const _id = req.params.id;

        const getUser = await RegisterUser.findById({ _id: _id });

        if (!getUser) {
            res.status(404).send()
        } else {
            res.status(200).send(getUser)
        }
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const deleteUser = async (req, res) => {
    try {
        const _id = req.params.id;

        const deleteUser = await RegisterUser.findByIdAndDelete({ _id: _id })

        if (!deleteUser) {
            res.status(400).send()
        } else {
            res.status(200).send(deleteUser)

        }

    } catch (err) {
        res.status(400).send("user not found")
    }
}
const updateRole = async (req, res) => {
    try {
        const _id = req.params.id;

        const changeRole = await RegisterUser.findByIdAndUpdate({ _id: _id }, req.body, { new: true })

        if (!changeRole) {
            res.status(400).send()
        } else {
            res.status(201).send(changeRole)
        }

    } catch (err) {
        res.status(400).send("user not found")
    }
}


const registerUser = async (req, res) => {
    try {

        const user1 = await RegisterUser.findOne({ email: req.body.email })
        if (user1) {
            return res.status(400).send({msg:"Email alreday exists ..!"})
        }

        const user = new RegisterUser(req.body)

        // const token = await user.generateAuthToken();

        const createuser = await user.save();
        res.status(201).send({msg:"User Created Successfully.!!", data: createuser})
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const loginUser = async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await RegisterUser.findOne({ email: email })

        const isMatch = await bcrypt.compare(password, user.password)
        const accesstoken = await user.generateAuthAccessToken();
        const refreshtoken = await user.generateAuthRefreshToken();

        if (isMatch) {
            res.status(200).send({msg:"Login Successfully.!!", data : user, accesstoken:accesstoken, refreshtoken:refreshtoken})
        } else {
            res.status(400).send({msg:"Details are not correct.!"})
        }
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Details are not correct.!")
    }
}

const loginUserRefreshToken = async (req,res) =>{
    try{
        console.log("reee",req.body);
        const token = req.body.refreshToken
        // let tokenHeader = req.header('Authorization');

        // token = tokenHeader && tokenHeader.split(' ')[1]; 
        console.log("qweq", token);
        if(!token){
            return res.sendStatus(400)
        }

        jwt.verify(token, process.env.SECRET_REFRESH_KEY, (err, data) => {
        if(err){
            // console.log("err",err);
            res.sendStatus(400)
        }else{
            // console.log("qqqqq",jwt.decode._id);
            console.log("asd",data);
            const accessToken = jwt.sign({ _id: data._id },process.env.SECRET_ACCESS_KEY,{ expiresIn:"1m"})
            console.log("zsd", accessToken);
            res.send(accessToken)
        }
        })
    }catch(err){
        console.log(err.message);
        res.status(500).send("Refresh token error.!")
    }
}

module.exports = { getAllUsers, getUser, deleteUser, updateRole, registerUser, loginUser, loginUserRefreshToken };