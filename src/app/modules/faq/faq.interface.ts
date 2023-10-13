import { Model, Document } from 'mongoose';

export interface IFaq extends Document {
  question: string;
  answer: string;
  // Add any other fields you need here
}

export type FaqModel = Model<IFaq, Record<string, unknown>>;
