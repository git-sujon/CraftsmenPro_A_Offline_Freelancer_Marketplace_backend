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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewServices = void 0;
const review_model_1 = require("./review.model");
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.create(data);
    return result;
});
const getReviewById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findOne({ _id: id });
    return result;
});
const getReviewsForService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield review_model_1.Review.find({ service: serviceId });
    return results;
});
const updateReview = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.findByIdAndUpdate(id, data, { new: true });
    return result;
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield review_model_1.Review.findByIdAndRemove(id);
});
exports.ReviewServices = {
    createReview,
    getReviewById,
    getReviewsForService,
    updateReview,
    deleteReview,
};
