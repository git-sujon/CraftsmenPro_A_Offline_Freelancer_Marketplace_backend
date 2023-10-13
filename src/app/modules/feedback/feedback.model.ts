import { Schema, model } from 'mongoose';
import { IFeedback, FeedbackModel } from './feedback.interface';

const FeedbackSchema = new Schema<IFeedback>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    message: { type: String, required: true },
    createdAt: { type: Date, required: true },
    // Add any other fields you need here
  },
  // Additional schema options if necessary
);

export const Feedback = model<IFeedback, FeedbackModel>('Feedback', FeedbackSchema);
