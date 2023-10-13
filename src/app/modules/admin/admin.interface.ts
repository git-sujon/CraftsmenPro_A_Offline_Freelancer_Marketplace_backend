import { Model, Document } from 'mongoose';

export interface IAdmin extends Document {
  username: string;
  password: string;
  // Add any other fields you need here
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
