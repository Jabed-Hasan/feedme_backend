import { Schema, model } from 'mongoose';
import { INewsletter } from './newsletter.interface';

const newsletterSchema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isSubscribed: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Newsletter = model<INewsletter>('Newsletter', newsletterSchema); 