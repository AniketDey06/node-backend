import { Router } from 'express'
import multer from 'multer'
import path from 'path'

import { addNewBlogRender } from '../controllers/blog.controller.js'

const blogRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads/'));
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`
        cb(null, filename)
    },
})

const upload = multer({ storage: storage })

blogRouter.get('/add-new', addNewBlogRender)
blogRouter.post('/', upload.single('coverImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
})

export {
    blogRouter
}