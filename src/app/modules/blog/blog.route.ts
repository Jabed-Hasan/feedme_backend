import express from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.interface';

const router = express.Router();

// Public routes
router.get('/all-blogs', BlogController.getAllBlogs);
router.get('/:id', BlogController.getSingleBlog);

// Protected routes - require authentication
router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.provider),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.provider),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogController.updateBlog,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  BlogController.deleteBlog,
);

router.post('/:id/like', BlogController.likeBlog);

export const blogRoutes = router;
