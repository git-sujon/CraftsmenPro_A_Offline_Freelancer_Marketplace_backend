import { Schema, model } from 'mongoose';
import { IBlog, BlogModel } from './blog.interface';

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'Admin' },
    createdAt: { type: Date, required: true },
    // Add any other fields you need here
  },
  // Additional schema options if necessary
);

export const Blog = model<IBlog, BlogModel>('Blog', BlogSchema);
