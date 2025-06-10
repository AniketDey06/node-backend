import { Router } from 'express'

import { addNewBlogRender } from '../controllers/blog.controller.js'

const blogRouter = Router();

blogRouter.get('/add-new', addNewBlogRender)

export {
    blogRouter
}