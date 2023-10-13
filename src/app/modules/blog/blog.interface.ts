import { Model, Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  createdAt: Date;
  // Add any other fields you need here
}

export type BlogModel = Model<IBlog, Record<string, unknown>>;
