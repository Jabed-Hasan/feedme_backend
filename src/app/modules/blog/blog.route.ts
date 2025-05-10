import express, { NextFunction, Request, Response, RequestHandler } from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../middleware/validateRequest';
import { createBlogZodSchema, updateBlogZodSchema } from './blog.validation';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { upload, sendImageToCloudinary } from '../../utils/sendImageCloudinary';

const router = express.Router();

// Public route for featured blogs - no auth needed
router.get('/featured-blogs', BlogController.getFeaturedBlogs);

router.post(
  '/create-blog',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.PROVIDER),
  upload.single('file'),
  ((req, res, next) => {
    try {
      // Parse JSON data if it exists
      if (req.body.data && typeof req.body.data === 'string') {
        try {
          const parsedData = JSON.parse(req.body.data);
          // Merge parsed data into req.body
          req.body = { ...parsedData };
          console.log('Successfully parsed JSON data');
        } catch (parseError) {
          console.error('Error parsing JSON data:', parseError);
          res.status(400).json({
            success: false,
            message: 'Invalid JSON format in data field',
            error: parseError instanceof Error ? parseError.message : 'JSON parse error',
          });
          return;
        }
      }

      // Check if there is a file
      if (req.file) {
        console.log('File received:', req.file.mimetype);
        
        // Handle file upload differently based on storage type
        let imageSource;
        if (req.file.buffer) {
          // Memory storage (Vercel/production)
          imageSource = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
          console.log('Using buffer data for Cloudinary upload');
        } else if (req.file.path) {
          // Disk storage (local development)
          imageSource = req.file.path;
          console.log('Using file path for Cloudinary upload');
        } else {
          console.error('No valid file data found');
          return next(new Error('No valid file data found'));
        }
        
        // Upload image to cloudinary
        const imageName = req.body.title || 'untitled_blog';
        sendImageToCloudinary(imageName, imageSource)
          .then(({ secure_url }) => {
            req.body.image = secure_url;
            next();
          })
          .catch(error => {
            console.error('Cloudinary upload error:', error);
            next(error);
          });
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,
  validateRequest(createBlogZodSchema),
  BlogController.createBlog
);

router.get('/all-blogs', BlogController.getAllBlogs);

router.get('/:id', BlogController.getSingleBlog);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.PROVIDER),
  upload.single('file'),
  ((req, res, next) => {
    try {
      // Parse JSON data if it exists
      if (req.body.data && typeof req.body.data === 'string') {
        try {
          const parsedData = JSON.parse(req.body.data);
          // Merge parsed data into req.body
          req.body = { ...parsedData };
          console.log('Successfully parsed JSON data');
        } catch (parseError) {
          console.error('Error parsing JSON data:', parseError);
          res.status(400).json({
            success: false,
            message: 'Invalid JSON format in data field',
            error: parseError instanceof Error ? parseError.message : 'JSON parse error',
          });
          return;
        }
      }

      // Check if there is a file
      if (req.file) {
        console.log('File received:', req.file.mimetype);
        
        // Handle file upload differently based on storage type
        let imageSource;
        if (req.file.buffer) {
          // Memory storage (Vercel/production)
          imageSource = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
          console.log('Using buffer data for Cloudinary upload');
        } else if (req.file.path) {
          // Disk storage (local development)
          imageSource = req.file.path;
          console.log('Using file path for Cloudinary upload');
        } else {
          console.error('No valid file data found');
          return next(new Error('No valid file data found'));
        }
        
        // Upload image to cloudinary
        const imageName = req.body.title || `blog_${req.params.id}`;
        sendImageToCloudinary(imageName, imageSource)
          .then(({ secure_url }) => {
            req.body.image = secure_url;
            next();
          })
          .catch(error => {
            console.error('Cloudinary upload error:', error);
            next(error);
          });
      } else {
        next();
      }
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,
  validateRequest(updateBlogZodSchema),
  BlogController.updateBlog
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.PROVIDER),
  BlogController.deleteBlog
);

export const blogRoutes = router; 