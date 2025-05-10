import { z } from 'zod';

export const createBlogZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    content: z.string({
      required_error: 'Content is required',
    }),
    category: z.string({
      required_error: 'Category is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    image: z.string().optional(),
    publishedDate: z.string().optional().transform(str => str ? new Date(str) : undefined),
  }),
});

export const updateBlogZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    publishedDate: z.string().optional().transform(str => str ? new Date(str) : undefined),
  }),
}); 