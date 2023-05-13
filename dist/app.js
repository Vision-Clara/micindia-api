"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const root_router_1 = __importDefault(require("./routers/root.router"));
const expressApp = (0, express_1.default)();
expressApp.use(express_1.default.json());
expressApp.use(express_1.default.urlencoded({ extended: true }));
expressApp.use((0, cookie_parser_1.default)());
expressApp.use((0, cors_1.default)());
expressApp.use("/api/v1", root_router_1.default);
exports.default = expressApp;
