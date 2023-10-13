import { Schema, model } from 'mongoose';
import { IService, ServiceModel } from './services.interface';

const locationSchema = new Schema({
  areaName: { type: String, required: true },
  cityName: { type: String, required: true },
  division: { type: String, required: true },
});

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
});

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: locationSchema, required: true },
    contact: { type: contactSchema, required: true },
    averageRating: { type: Number },
    reviews: [{ type: Schema.Types.ObjectId }],
    availableTimeSlots: [{ type: String, required: true }],
    bookedTimeSlots: [{ type: String }],
    duration: { type: Number, required: true },
    searchEngineOptimizationTags: [{ type: String }],
    features: [{ type: String }],
    faqs: [{ type: String }],
  },

);

export const Service = model<IService, ServiceModel>('Service', ServiceSchema);
