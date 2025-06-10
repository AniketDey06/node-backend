

const addNewBlogRender = async (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    })
}

export{
    addNewBlogRender
}