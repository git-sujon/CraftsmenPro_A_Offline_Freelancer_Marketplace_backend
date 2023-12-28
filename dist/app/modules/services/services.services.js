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
exports.ServiceServices = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const services_constants_1 = require("./services.constants");
const services_model_1 = require("./services.model");
const user_model_1 = require("../user/user.model");
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const createIntoDatabase = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiErrors_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized access');
    }
    const verifyToken = jwtHelpers_1.jwtHelpers.verifiedToken(token, config_1.default.jwt.secret);
    const user = yield user_model_1.User.findOne({ email: verifyToken === null || verifyToken === void 0 ? void 0 : verifyToken.email });
    payload.servicesProvider = user === null || user === void 0 ? void 0 : user._id;
    const result = yield services_model_1.Service.create(payload);
    return result;
});
const getSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_model_1.Service.findOne({ _id: id }).populate('servicesProvider');
    return result;
});
const getAllFromDatabase = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: services_constants_1.serviceSearchAbleFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield services_model_1.Service.find(whereConditions)
        .populate('servicesProvider')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield services_model_1.Service.countDocuments(whereConditions);
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
    const result = yield services_model_1.Service.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteSingleData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield services_model_1.Service.deleteOne({ _id: id });
    return result;
});
exports.ServiceServices = {
    createIntoDatabase,
    getSingleData,
    getAllFromDatabase,
    updateSingleData,
    deleteSingleData,
};
