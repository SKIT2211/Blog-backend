const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const { getAllUsers, getUser, deleteUser,updateRole, registerUser, loginUser, loginUserRefreshToken } = require("../controller/userController");

router.get('/allusers',auth, getAllUsers)
router.get('/allusers/:id', getUser)
router.delete('/allusers/:id', deleteUser)
router.put('/allusers/:id',updateRole)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh', loginUserRefreshToken)

module.exports = router;