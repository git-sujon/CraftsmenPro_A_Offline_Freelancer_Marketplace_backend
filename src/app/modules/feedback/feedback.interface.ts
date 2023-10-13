import { Model, Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  user: Schema.Types.ObjectId;
  message: string;
  createdAt: Date;
  // Add any other fields you need here
}

export type FeedbackModel = Model<IFeedback, Record<string, unknown>>;
