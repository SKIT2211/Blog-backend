const RegisterUser = require('../models/registerUserSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"riaavarsani31@gmail.com",
        pass:"zrryezliqqzgmpga"
    }
})

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
            res.status(200).send({msg:"Login Successfully.!!", data : user, accessToken:accesstoken, refreshToken:refreshtoken})
        } else {
            res.status(400).send({msg:"Details are not correct.!"})
        }
        
    } catch (err) {
        console.log(err.message);
        res.status(404).send({msg:"Details are not correct.!"})
    }
}

const loginUserRefreshToken = async (req,res) =>{
    try{
        const token = req.body.refreshToken
        if(!token){
            return res.sendStatus(400)
        }

        jwt.verify(token, process.env.SECRET_REFRESH_KEY, (err, data) => {
        if(err){
            res.sendStatus(400)
        }else{
            const accessToken = jwt.sign({ _id: data._id },process.env.SECRET_ACCESS_KEY,{ expiresIn:"1m"})
            res.send(accessToken)
        }
        })
    }catch(err){
        res.status(500).send("Refresh token error.!")
    }
}

const sendpasslink = async (req,res) =>{
    try{
        const email = req.body.email;
        const user = await RegisterUser.findOne({ email: email })
        if(user){

            const token = jwt.sign({id: user._id}, process.env.SECRET_ACCESS_KEY,{ expiresIn:"2m"})

            const mailOptions = {
                from:"jsj22037@gmail.com",
                to:email,
                subject:"sending email for reset password.",
                text:`This is the reset password link--> http://localhost:3000/forgotpassword/${user._id}/${token} >-- this is valid for 2 min.`
            }
            transporter.sendMail(mailOptions, (err) =>{
                 if(err){
                    res.status(400).send({message:"email is not sent"})
                 }else{
                    res.status(201).send({message:"email is sent successfully "})
                 }
            })
        }else{
            res.status(401).send({msg:"enter your email"})
        }
    }catch(err){
        res.send(err.message)
    }
}

const forgotPassword = async (req,res) =>{
    try{
    const params = req.params;
    const user = await RegisterUser.findOne({ _id : params.id })
    const verify = jwt.verify(params.token, process.env.SECRET_ACCESS_KEY )

    if(user && verify._id ){
        res.status(201).send({msg:"valid user"})
    }else{
        res.status(401).send({msg:"invalid user"})
    }
    }catch(err){
        res.send(err.message)
    }
}


const postForgotPassword = async (req,res) =>{
    try{
    const params = req.params;
    const password =req.body.password
    const user = await RegisterUser.findOne({ _id : params.id })
    const verify = jwt.verify(params.token, process.env.SECRET_ACCESS_KEY )

    if(user && verify._id){

        const newpassword = await bcrypt.hash(password, 10)

        const setNewPass = await RegisterUser.findByIdAndUpdate({ _id : params.id },{password : newpassword})
        setNewPass.save();
        res.status(201).send({msg:"valid user"})
    }else{
            res.status(401).send({msg:"invalid user"}) 
    }
    }catch(err){
        res.send(err.message)
    }
}

module.exports = { getAllUsers, getUser, deleteUser, updateRole, registerUser, loginUser, loginUserRefreshToken, sendpasslink, forgotPassword, postForgotPassword};