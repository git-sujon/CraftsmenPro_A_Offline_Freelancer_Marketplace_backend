import { Document, Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';
// User Schema
const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
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

UserSchema.statics.isUserExist = async function (
  email: string,
): Promise<IUser | null> {
  return await User.findOne(
    {
      email,
    },
    {
      email: 1,
      password: 1,
      role: 1,
    },
  );
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  const comparePassword = await bcrypt.compare(givenPassword, savedPassword);

  return comparePassword;
};

// User.create() / user.save()
UserSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_rounds),
  );

  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
