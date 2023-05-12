"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = __importDefault(require("./config/main"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
(0, db_1.default)();
app_1.default.listen(main_1.default.PORT, () => {
    console.log(`Server listening on port ${main_1.default.PORT}`);
});
