import { Schema, model } from 'mongoose';
import { IAdmin, AdminModel } from './admin.interface';

const AdminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add any other fields you need here
  },
  // Additional schema options if necessary
);

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
