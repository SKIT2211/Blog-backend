const express = require("express")
const router = express.Router()
const { allBlogs, getMyBlogs, getBlog, addBlog, updateBlog, deleteBlog} = require('../controller/blogController')

router.get('/allblogs', allBlogs)
router.get('/myblogs/:id', getMyBlogs)
router.get('/allblogs/:id', getBlog)
router.put('/allblogs/:id', updateBlog)
router.delete('/allblogs/:id', deleteBlog)
router.post('/addblog', addBlog)

module.exports = router;