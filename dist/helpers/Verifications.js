"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verifications = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../errors/ApiErrors"));
const jwtHelpers_1 = require("./jwtHelpers");
const config_1 = __importDefault(require("../config"));
const verifiedUser = (token) => {
    if (!token) {
        throw new ApiErrors_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized access');
    }
    const verifyToken = jwtHelpers_1.jwtHelpers.verifiedToken(token, config_1.default.jwt.secret);
    return verifyToken;
};
exports.Verifications = {
    verifiedUser
};
