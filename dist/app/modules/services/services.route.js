"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const services_controller_1 = require("./services.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/', 
// validationRequest(ServiceValidation.serviceSchema),
(0, auth_1.default)(user_1.ENUM_USER_ROLE.SERVICES_PROVIDER), services_controller_1.ServiceController.createIntoDatabase);
router.get('/', services_controller_1.ServiceController.getAllFromDatabase);
router.get('/:id', services_controller_1.ServiceController.getSingleData);
router.patch('/:id', services_controller_1.ServiceController.updateSingleData);
router.delete('/:id', services_controller_1.ServiceController.deleteSingleData);
exports.ServiceRoutes = router;
