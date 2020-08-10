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
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.runDbMigrations = exports.getDbConnection = exports.getDbConnectionOptions = exports.toPromise = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
exports.toPromise = (data) => {
    return new Promise(resolve => {
        resolve(data);
    });
};
exports.getDbConnectionOptions = (connectionName = 'default') => __awaiter(void 0, void 0, void 0, function* () {
    const options = yield typeorm_1.getConnectionOptions(process.env.NODE_ENV || 'development');
    return Object.assign(Object.assign({}, options), { name: connectionName });
});
exports.getDbConnection = (connectionName = 'default') => __awaiter(void 0, void 0, void 0, function* () {
    return yield typeorm_1.getConnection(connectionName);
});
exports.runDbMigrations = (connectionName = 'default') => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield exports.getDbConnection(connectionName);
    yield conn.runMigrations();
});
exports.comparePasswords = (userPassword, currentPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt.compare(currentPassword, userPassword);
});
//# sourceMappingURL=utils.js.map