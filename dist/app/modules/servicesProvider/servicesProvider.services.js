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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProviderServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const servicesProvider_constants_1 = require("./servicesProvider.constants");
const servicesProvider_model_1 = require("./servicesProvider.model");
const user_model_1 = require("../user/user.model");
const user_1 = require("../../../enums/user");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const createIntoDatabase = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = payload.user;
    const isExist = yield user_model_1.User.findById(_id);
    if (!isExist)
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User not found !');
    if (isExist && isExist.role === user_1.ENUM_USER_ROLE.SERVICES_PROVIDER)
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'User already exist as Service Provider !');
    if (isExist && isExist.role === user_1.ENUM_USER_ROLE.ADMIN)
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'User already exist as Admin !');
    if (isExist && isExist.role === user_1.ENUM_USER_ROLE.SUPER_ADMIN)
        throw new ApiErrors_1.default(http_status_1.default.BAD_REQUEST, 'User already exist as Super Admin !');
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const userUpdate = yield user_model_1.User.findByIdAndUpdate({ _id: isExist._id }, {
            role: user_1.ENUM_USER_ROLE.SERVICES_PROVIDER,
            isServiceProvider: true,
        });
        const result = yield servicesProvider_model_1.ServiceProvider.create(payload);
        session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        session.abortTransaction();
        throw error;
    }
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield servicesProvider_model_1.ServiceProvider.findOne({ _id: id }).populate('user');
    return result;
});
const getAllFromDatabase = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract searchTerm to implement search query
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    // Search needs $or for searching in specified fields
    if (searchTerm) {
        andConditions.push({
            $or: servicesProvider_constants_1.serviceProviderSearchAbleFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to full-fill all the conditions
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Dynamic  Sort needs  field to  do sorting
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield servicesProvider_model_1.ServiceProvider.find(whereConditions)
        .populate('user')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield servicesProvider_model_1.ServiceProvider.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateSingleData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield servicesProvider_model_1.ServiceProvider.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield servicesProvider_model_1.ServiceProvider.deleteOne({ _id: id });
    return result;
});
exports.ServiceProviderServices = {
    createIntoDatabase,
    getSingleData,
    getAllFromDatabase,
    updateSingleData,
    deleteSingleData,
};
