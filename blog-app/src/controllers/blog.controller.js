import Blog from "../models/Blog.model.js"

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

export{
    addNewBlogRender,
    uploadCoverImage
}