const express = require("express")
const router = express.Router()
const { allBlogs} = require('../controller/blogController')

router.get('/allBlogs', allBlogs)
router.post('/allBlogs', allBlogs)

module.exports = router;