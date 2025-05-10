import { SortOrder } from 'mongoose';
import { IBlog, IBlogFilters } from './blog.interface';
import { Blog } from './blog.model';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { paginationHelpers } from '../../utils/paginationHelper';
import { IPaginationOptions } from '../../interface/pagination';

// New service for featured blogs
const getFeaturedBlogs = async (limit: number): Promise<IBlog[]> => {
  // Get the most recent blogs to feature on landing page
  const result = await Blog.find()
    .sort({ createdAt: -1 })
    .limit(limit);

  return result;
};

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const result = await Blog.create(payload);
  return result;
};

const getAllBlogs = async (
  filters: IBlogFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: ['title', 'content', 'category', 'author'].map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Blog.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Blog.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findById(id);
  return result;
};

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>
): Promise<IBlog | null> => {
  const isExist = await Blog.findById(id);

  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');
  }

  const result = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getFeaturedBlogs,
}; 