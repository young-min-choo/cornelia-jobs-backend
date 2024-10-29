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
exports.dbPromise = void 0;
const express_1 = __importDefault(require("express"));
const jobs_1 = __importDefault(require("./routes/jobs"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const cors_1 = __importDefault(require("cors"));
const dbPromise = (0, sqlite_1.open)({
    filename: './mydatabase.db', // Specify the database file
    driver: sqlite3_1.default.Database,
});
exports.dbPromise = dbPromise;
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/jobs', jobs_1.default);
const PORT = 3000;
const setup = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield dbPromise;
    yield db.migrate();
    app.listen(PORT, () => {
        console.log(`running on localhost:${PORT}`);
    });
});
setup();
