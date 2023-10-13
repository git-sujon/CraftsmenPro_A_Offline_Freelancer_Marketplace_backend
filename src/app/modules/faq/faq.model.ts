import { Schema, model } from 'mongoose';
import { IFaq, FaqModel } from './faq.interface';

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    // Add any other fields you need here
  },
  // Additional schema options if necessary
);

export const Faq = model<IFaq, FaqModel>('Faq', FaqSchema);
