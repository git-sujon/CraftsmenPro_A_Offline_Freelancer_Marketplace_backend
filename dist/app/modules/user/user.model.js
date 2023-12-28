"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const constants_1 = require("../../../interfaces/constants");
// User Schema
const UserSchema = new mongoose_1.Schema({
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
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    phoneNumber: { type: String, required: true, unique: true },
    gender: {
        type: String,
        enum: constants_1.genderConstants,
        required: true,
    },
    location: {
        city: { type: String, required: true },
        division: { type: String, required: true },
    },
    role: { type: String, required: true, default: 'user' },
    isServiceProvider: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    profilePicture: { type: String },
    lastLogin: { type: Date },
    servicesBooked: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Service' }],
    reviews: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Review' }],
    isVerified: { type: Boolean },
    forgotPasswordToken: { type: String },
    forgotPasswordTokenExpiry: { type: Date },
    verifyToken: { type: String },
    verifyTokenExpiryDate: { type: Date },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
UserSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({
            email,
        }, {
            email: 1,
            password: 1,
            role: 1,
        });
    });
};
UserSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const comparePassword = yield bcrypt_1.default.compare(givenPassword, savedPassword);
        return comparePassword;
    });
};
// User.create() / user.save()
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hashing user password
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bycrypt_salt_rounds));
        next();
    });
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
