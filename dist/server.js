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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const port = config_1.default.port;
process.on('uncaughtException', error => {
    console.log('Error', error);
    process.exit(1);
});
let server;
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(`${config_1.default.database_url}`);
            console.log('Database Connection Successfully');
            server = app_1.default.listen(port, () => {
                console.log(`listening on port ${port}`);
            });
        }
        catch (error) {
            console.error('Database connection Error:', error);
        }
        process.on('unhandledRejection', error => {
            console.log('unhandledRejection , Server is closed...');
            if (server) {
                server.close(() => {
                    console.log('Error', error);
                });
            }
        });
    });
}
connectToMongoDB().catch(err => console.error(err));
process.on('SIGTERM', () => {
    console.log('SIGTERM is received');
    if (server) {
        server.close();
    }
});
