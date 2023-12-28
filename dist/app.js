"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const app = (0, express_1.default)();
// Configure CORS
const allowedOrigins = ['http://localhost:3000', 'https://craftsmenpro-frontend-git-sujon.vercel.app']; // Update this with your frontend's URL(s)
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Check if the origin is in the allowed list or is undefined (for same-origin requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials (cookies)
}));
app.use((0, cookie_parser_1.default)());
//  parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// application routes
app.use('/api/v1/', routes_1.default);
// global Error Handler
app.use(globalErrorHandler_1.default);
// api not found Error handler
app.use((req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'NOT FOUND',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API NOT FOUND',
            },
        ],
    });
});
exports.default = app;
