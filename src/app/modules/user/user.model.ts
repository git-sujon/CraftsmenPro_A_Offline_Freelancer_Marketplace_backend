import { Document, Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

// User Schema
const UserSchema = new Schema<IUser, UserModel>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    location: {
      city: { type: String, required: true },
      division: { type: String, required: true },
    },
    role: { type: String, required: true },
    isServiceProvider: { type: Boolean, default: false },
    profilePicture: { type: String },
    lastLogin: { type: Date },
    servicesBooked: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    isVerified: { type: Boolean },
    forgotPasswordToken: { type: String },
    forgotPasswordTokenExpiry: { type: Date },
    verifyToken: { type: String },
    verifyTokenExpiryDate: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const User = model<IUser, UserModel>('User', UserSchema);
