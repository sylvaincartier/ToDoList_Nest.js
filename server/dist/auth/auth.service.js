"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const createUser_dto_1 = require("../users/dto/createUser.dto");
const loginUser_dto_1 = require("../users/dto/loginUser.dto");
const user_dto_1 = require("../users/dto/user.dto");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    register(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let status = {
                success: true,
                message: 'user registered'
            };
            try {
                yield this.userService.create(userDto);
            }
            catch (err) {
                status = {
                    success: false,
                    message: err,
                };
            }
            return status;
        });
    }
    login(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('token');
            const user = yield this.userService.findByLogin(loginUserDto);
            const token = this._createToken(user);
            return Object.assign(Object.assign({}, token), { username: user.username });
        });
    }
    _createToken({ username }) {
        const expiresIn = process.env.EXPIRESIN;
        const user = { username };
        const accessToken = this.jwtService.sign(user);
        return { expiresIn, accessToken };
    }
    validateUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findByPayload(payload);
            if (!user) {
                throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
            }
            return user;
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map