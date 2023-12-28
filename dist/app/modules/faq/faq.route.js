"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqRoutes = void 0;
const express_1 = __importDefault(require("express"));
const faq_controller_1 = require("./faq.controller");
const router = express_1.default.Router();
router.post('/', faq_controller_1.FaqController.createFaq);
router.get('/', faq_controller_1.FaqController.getAllFaqs);
exports.FaqRoutes = router;
