import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';
import httpStatus from 'http-status';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  // Set authorId from authenticated user if available
  if (req.user) {
    req.body.authorId = req.user._id;
  }

  const result = await BlogService.createBlog(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    status: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getAllBlogs(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Blogs retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getSingleBlog(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Blog retrieved successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.updateBlog(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.deleteBlog(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

const likeBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.likeBlog(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Blog liked successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
};
