const express = require("express")
const router = express.Router()
const { registerUser } = require("../controller/registerController");
const { homePage } = require('../controller/homeController')

router.get('/', homePage)
router.get('/register', registerUser)


module.exports = router;