"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProviderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const servicesProvider_controller_1 = require("./servicesProvider.controller");
const router = express_1.default.Router();
router.post('/', 
// validationRequest(ServiceProviderValidation.createServiceProviderSchema),
servicesProvider_controller_1.ServiceProviderController.createIntoDatabase);
router.get('/', servicesProvider_controller_1.ServiceProviderController.getAllFromDatabase);
router.get('/:id', servicesProvider_controller_1.ServiceProviderController.getSingleData);
router.patch('/:id', servicesProvider_controller_1.ServiceProviderController.updateSingleData);
router.delete('/:id', servicesProvider_controller_1.ServiceProviderController.deleteSingleData);
exports.ServiceProviderRoutes = router;
