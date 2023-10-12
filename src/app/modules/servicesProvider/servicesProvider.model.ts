import { Schema, model } from "mongoose";
import { IServiceProvider, ServiceProviderModel } from "./servicesProvider.interface";

const ServiceProviderSchema = new Schema<IServiceProvider>(
    {
      user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
      companyName: { type: String, required: true },
      serviceCategory: { type: String, required: true },
      serviceType: { type: String, required: true },
      description: { type: String, required: true },
      serviceAreas: [{ type: String }],
      servicesOffered: [{ type: String }],
      isVerified: { type: Boolean, default: false },
      isAvailable: { type: Boolean, default: true },
      averageRating: { type: Number, default: 0 },
      totalRatings: { type: Number, default: 0 },
      companyProfileImages: [
        {
          imageName: { type: String },
          imageUrl: { type: String },
        },
      ],
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
    },
    // Additional schema options if necessary
  );
  
  export const ServiceProvider = model<IServiceProvider, ServiceProviderModel>(
    'ServiceProvider',
    ServiceProviderSchema
  );