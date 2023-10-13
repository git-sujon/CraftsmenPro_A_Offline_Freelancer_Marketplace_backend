import { Model, Schema } from 'mongoose';
// ServiceProvider interface
export interface IServiceProvider {
  user: Schema.Types.ObjectId;
  companyName: string;
  serviceCategory: string;
  serviceType: String;
  description: string;
  serviceAreas: {
    areaName: string;
    cityName: string;
    division: string;
  }[];
  servicesOffered: string[];
  isVerified: boolean;
  isAvailable: boolean;
  averageRating?: number;
  totalRatings?: number;
  companyProfileImages?: {
    imageName: string;
    imageUrl: string;
  }[];
  insurance?: boolean;
  licenses?: string[];
  certifications?: string[];
  serviceTags?: string[];
  businessHours?: {
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
  };
}

export type ServiceProviderModel = Model<
  IServiceProvider,
  Record<string, unknown>
>;

export interface IServiceProviderFilters {
  searchTerm?: string;
  companyName?: string;
  serviceCategory?: string;
  serviceType?: String;
  isVerified?: boolean;
  isAvailable?: boolean;
}
