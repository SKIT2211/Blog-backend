const blogSchema = require('../models/blogSchema')

const allBlogs = async(req,res) =>{
    try{

    }catch(err){
        res.status(400).send(err.message)
    }
}

const addBlog = async (req, res) => {
    try{
    const blog = new addBlog(req.body)

    const token = await user.generateAuthToken(); 

    const createuser = await user.save();
    res.status(201)
    // console.log("data",createuser)
    }catch(err){
        res.status(400).send(err.message)
    }
}

module.exports = { allBlogs};