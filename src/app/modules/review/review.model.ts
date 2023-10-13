import { Schema, model } from 'mongoose';
import { IReview, ReviewModel } from './review.interface';

const ReviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    service: { type: Schema.Types.ObjectId, required: true, ref: 'Service' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, required: true },
    // Add any other fields you need here
  },
  // Additional schema options if necessary
);

export const Review = model<IReview, ReviewModel>('Review', ReviewSchema);
