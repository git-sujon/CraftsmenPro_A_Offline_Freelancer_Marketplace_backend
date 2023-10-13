import express from 'express';
import { BlogController } from './blog.controller';

const router = express.Router();

router.post('/', BlogController.createBlog);
router.get('/', BlogController.getAllBlogs);

export const BlogRoutes = router;
