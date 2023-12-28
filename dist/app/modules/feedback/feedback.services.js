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
exports.FeedbackServices = void 0;
const feedback_model_1 = require("./feedback.model");
const createFeedback = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.Feedback.create(data);
    return result;
});
const getAllFeedback = () => __awaiter(void 0, void 0, void 0, function* () {
    const feedback = yield feedback_model_1.Feedback.find();
    return feedback;
});
exports.FeedbackServices = {
    createFeedback,
    getAllFeedback,
};
