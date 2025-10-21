import { Types } from 'mongoose';

export interface IBlog {
  _id?: Types.ObjectId;
  title: string;
  content: string;
  author: string;
  authorId?: Types.ObjectId;
  image?: string;
  category?: string;
  tags?: string[];
  published: boolean;
  views?: number;
  likes?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
