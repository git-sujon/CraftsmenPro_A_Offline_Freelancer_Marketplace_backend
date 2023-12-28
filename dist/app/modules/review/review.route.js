"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
router.post('/', (0, validationRequest_1.default)(review_validation_1.ReviewValidation.createReviewSchema), review_controller_1.ReviewController.createReview);
router.get('/:id', review_controller_1.ReviewController.getReviewById);
router.get('/service/:serviceId', review_controller_1.ReviewController.getReviewsForService);
router.patch('/:id', review_controller_1.ReviewController.updateReview);
router.delete('/:id', review_controller_1.ReviewController.deleteReview);
exports.ReviewRoutes = router;
