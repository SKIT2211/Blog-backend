const Blogs = require('../models/blogSchema')

const allBlogs = async(req,res) =>{
    try{
        const getBlogs = await Blogs.find();
        res.status(200).send(getBlogs)

    }catch(err){
        res.status(400).send(err.message)
    }
}

const getMyBlogs = async (req,res) =>{
    try{
        const _id = req.params.id;

        const getBlogs = await Blogs.find({userId : _id});

        if(!getBlogs){
        res.status(404).send()
        }else{
            res.status(200).send(getBlogs)
        }
    }catch(err){
        res.status(400).send(err.message)
    }
}

const getBlog = async (req,res) =>{
    try{
        const _id = req.params.id;

        const getBlog = await Blogs.findById({_id : _id});

        if(!getBlog){
        res.status(404).send()
        }else{
            res.status(200).send(getBlog)
        }
    }catch(err){
        res.status(400).send(err.message)
    }
}

const addBlog = async (req, res) => {
    try{
    const blog = new Blogs(req.body)

    const createblog = await blog.save();
    res.status(201).send(createblog)

    }catch(err){
        res.status(400).send(err.message)
    }
}

const updateBlog= async (req, res) =>{
    try{
        const _id = req.params.id;

        const updateBlog = await Blogs.findByIdAndUpdate({_id : _id},req.body,{new:true})

        if(!updateBlog){
            res.status(400).send()
            }else{
                res.status(201).send(updateBlog)
            }

    }catch(err){
        res.status(400).send("blog not found")
    }
}

const deleteBlog= async (req, res) =>{
    try{
        const _id = req.params.id;

        const deleteBlog = await Blogs.findByIdAndDelete({_id : _id})

        if(!deleteBlog){
            res.status(400).send()
        }else{
            res.status(200).send(deleteBlog)

        }

    }catch(err){
        res.status(400).send("blog not found")
    }
}

module.exports = { allBlogs, getMyBlogs, getBlog, addBlog, updateBlog, deleteBlog };