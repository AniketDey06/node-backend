import { connect } from "mongoose"
import Blog from "../models/Blog.model.js"
import Comment from "../models/Comment.model.js"

const addNewBlogRender = async (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    })
}

const uploadCoverImage = async (req, res) => {
    const {title, body} = req.body
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageURL: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`);
}

const getBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy')
    const comments = await Comment.find({blogId: req.params.id}).populate('createdBy')

    return res.render('blog', {
        user: req.user,
        blog,
        comments,
    })
}

const sendComments = async (req, res) => {
    const comment = await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    })

    return res.redirect(`/blog/${req.params.blogId}`);
}

export{
    addNewBlogRender,
    uploadCoverImage,
    getBlog,
    sendComments
}