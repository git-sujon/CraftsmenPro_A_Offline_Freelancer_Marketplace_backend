"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const booking_validation_1 = require("./booking.validation");
const router = express_1.default.Router();
router.post('/', (0, validationRequest_1.default)(booking_validation_1.BookingValidation.createBookingSchema), booking_controller_1.BookingController.createBooking);
router.get('/:id', booking_controller_1.BookingController.getBookingById);
// Add more routes as needed
exports.BookingRoutes = router;
