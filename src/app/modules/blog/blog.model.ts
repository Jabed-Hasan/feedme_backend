import { model, Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const BlogSchema = new Schema<IBlog>(
  {
    title: { 
      type: String, 
      required: true,
      trim: true
    },
    content: { 
      type: String, 
      required: true 
    },
    author: { 
      type: String, 
      required: true 
    },
    authorId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User'
    },
    image: { 
      type: String,
      default: '/images/placeholder.jpg'
    },
    category: { 
      type: String,
      default: 'General'
    },
    tags: [{ 
      type: String 
    }],
    published: { 
      type: Boolean, 
      default: true 
    },
    views: { 
      type: Number, 
      default: 0 
    },
    likes: { 
      type: Number, 
      default: 0 
    },
  },
  {
    timestamps: true,
  },
);

export const BlogModel = model<IBlog>('Blog', BlogSchema);
