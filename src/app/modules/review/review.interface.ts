import { Model, Schema } from 'mongoose';

export interface IReview {
  user: Schema.Types.ObjectId;
  service: Schema.Types.ObjectId;
  rating: number;
  comment: string;
  date: Date;
}

export type ReviewModel = Model<IReview, Record<string, unknown>>;
