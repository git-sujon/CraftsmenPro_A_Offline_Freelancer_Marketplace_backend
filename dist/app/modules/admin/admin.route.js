"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const validationRequest_1 = __importDefault(require("../../middleware/validationRequest"));
const router = express_1.default.Router();
router.post('/', (0, validationRequest_1.default)(admin_validation_1.AdminValidation.createAdminSchema), admin_controller_1.AdminController.createAdmin);
router.get('/:username', admin_controller_1.AdminController.getAdmin);
exports.AdminRoutes = router;
