import { Model, Schema } from 'mongoose';

export interface IService {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  location: {
    areaName: string;
    cityName: string;
    division: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  averageRating?: number;
  reviews?: Schema.Types.ObjectId[];
  availableTimeSlots: string[];
  bookedTimeSlots?: string[];
  duration: number;
  searchEngineOptimizationTags?: string[];
  features?: string[];
  faqs?: string[];
}

export type ServiceModel = Model<IService, Record<string, unknown>>;

export interface IServiceFilters {
  searchTerm?: string;
  category?: string;
  subcategory?: string;
}
