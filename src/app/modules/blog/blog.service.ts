import { IBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import QueryBuilder from '../../builder/queryBuilder';
import mongoose from 'mongoose';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const createBlog = async (payload: IBlog) => {
  const result = await BlogModel.create(payload);
  return result;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  // Build query conditionally - only add search if searchTerm exists
  let blogQuery;
  
  if (query.searchTerm) {
    blogQuery = new QueryBuilder(BlogModel.find({ published: true }), query)
      .search(['title', 'content', 'author', 'category'])
      .filter()
      .sort()
      .paginate()
      .select();
  } else {
    blogQuery = new QueryBuilder(BlogModel.find({ published: true }), query)
      .filter()
      .sort()
      .paginate()
      .select();
  }

  const result = await blogQuery.modelQuery;
  
  // Get total count for metadata
  const total = await BlogModel.countDocuments({ published: true });
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 6;

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getSingleBlog = async (id: string) => {
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid blog ID format');
  }

  // Increment views
  await BlogModel.findByIdAndUpdate(id, { $inc: { views: 1 } });
  
  const result = await BlogModel.findById(id).populate('authorId', 'name email');
  
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  
  return result;
};

const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid blog ID format');
  }

  const result = await BlogModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  
  return result;
};

const deleteBlog = async (id: string) => {
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid blog ID format');
  }

  const result = await BlogModel.findByIdAndDelete(id);
  
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  
  return result;
};

const likeBlog = async (id: string) => {
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid blog ID format');
  }

  const result = await BlogModel.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
};
