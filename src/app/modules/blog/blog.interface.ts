import { Model } from 'mongoose';

export type IBlog = {
  title: string;
  content: string;
  category: string;
  author: string;
  image?: string;
  publishedDate: Date;
};

export type IBlogFilters = {
  searchTerm?: string;
  category?: string;
  author?: string;
};

export type BlogModel = Model<IBlog>; 