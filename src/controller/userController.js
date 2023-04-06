const RegisterUser = require('../models/registerUserSchema')
const bcrypt = require('bcryptjs')


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
            return res.status(400).send({msg:"email alredy exists"})
        }

        const user = new RegisterUser(req.body)

        const token = await user.generateAuthToken();

        const createuser = await user.save();
        res.status(201).send({msg:"user created successfully", data: createuser})
        // console.log("data",createuser)
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

        const token = await user.generateAuthToken();
        // console.log("token", token);

        if (isMatch) {
            res.status(200).send(user)
        } else {
            res.status(400).send("Details are not correct.!")
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Details are not correct.!")
    }
}

module.exports = { getAllUsers, getUser, deleteUser, updateRole, registerUser, loginUser };