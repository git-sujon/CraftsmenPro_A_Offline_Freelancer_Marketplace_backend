import { Schema, model } from 'mongoose';
import {
  IServiceProvider,
  ServiceProviderModel,
} from './servicesProvider.interface';

const serviceAreaSchema = new Schema({
  areaName: { type: String, required: true },
  cityName: { type: String, required: true },
  division: { type: String, required: true },
});

const ServiceProviderSchema = new Schema<
  IServiceProvider,
  ServiceProviderModel
>({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' , unique:true},
  companyName: { type: String, required: true},
  serviceCategory: { type: String, required: true },
  serviceType: { type: String, required: true },
  description: { type: String, required: true },
  serviceAreas: {
    type: [serviceAreaSchema],
    required: true,
  },
  servicesOffered: [{ type: String }],
  isVerified: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  averageRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  companyProfileImages: {
    type: [
      {
        imageName: { type: String },
        imageUrl: { type: String },
      },
    ],
  },
  insurance: { type: Boolean },
  licenses: [{ type: String }],
  certifications: [{ type: String }],
  serviceTags: [{ type: String }],
  businessHours: {
    sunday: { type: String },
    monday: { type: String },
    tuesday: { type: String },
    wednesday: { type: String },
    thursday: { type: String },
    friday: { type: String, default: 'Off' },
    saturday: { type: String },
  },
});

export const ServiceProvider = model<IServiceProvider, ServiceProviderModel>(
  'ServiceProvider',
  ServiceProviderSchema,
);
