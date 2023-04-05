const express = require("express")
const router = express.Router()
const { getAllUsers, getUser, deleteUser,updateRole, registerUser, loginUser } = require("../controller/userController");

router.get('/allusers', getAllUsers)
router.get('/allusers/:id', getUser)
router.delete('/allusers/:id', deleteUser)
router.put('/allusers/:id',updateRole)
router.post('/register', registerUser)
router.post('/login', loginUser)


module.exports = router;