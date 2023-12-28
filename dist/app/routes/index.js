"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const servicesProvider_route_1 = require("../modules/servicesProvider/servicesProvider.route");
const services_route_1 = require("../modules/services/services.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth/',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users/',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/services-provider/',
        route: servicesProvider_route_1.ServiceProviderRoutes,
    },
    {
        path: '/services/',
        route: services_route_1.ServiceRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
