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

const getBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    return res.render('blog', {
        user: req.user,
        blog,
    })
}

export{
    addNewBlogRender,
    uploadCoverImage,
    getBlog
}