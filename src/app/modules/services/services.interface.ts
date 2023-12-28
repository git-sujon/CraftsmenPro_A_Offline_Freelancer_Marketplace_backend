import { Types } from 'mongoose';
import { Model, Schema } from 'mongoose';

export interface IService {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  serviceBanner: string;
  servicesImages?: string[];
  location: {
    areaName: string[];
    cityName: string;
    division: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  servicesProvider: Types.ObjectId;
  averageRating?: number;
  totalRatings: number;
  availableTimeSlots: Array<{ date: Date; time: string }>;
  bookedTimeSlots?: Array<{ date: Date; time: string }>;
  duration: number;
  searchEngineOptimizationTags?: string[];
  features?: string[];
  faqs?: {
    key: string;
    label: string;
    children: string;
  }[];
  isPopular?: boolean;
}

export type ServiceModel = Model<IService, Record<string, unknown>>;

export interface IServiceFilters {
  searchTerm?: string;
  category?: string;
  subcategory?: string;
  isPopular?: boolean;
  duration?: number;
  areaName?: string;
  cityName?: string;
  division?: string;
}
