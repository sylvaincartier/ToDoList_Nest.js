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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const typeorm_2 = require("typeorm");
const mapper_1 = require("../shared/mapper");
const utils_1 = require("../shared/utils");
let UsersService = class UsersService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    findOne(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOne(options);
            return mapper_1.toUserDto(user);
        });
    }
    findByLogin({ username, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOne({ where: { username } });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.UNAUTHORIZED);
            }
            const areEqual = yield utils_1.comparePasswords(user.password, password);
            if (!areEqual) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
            }
            return mapper_1.toUserDto(user);
        });
    }
    findByPayload({ username }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({
                where: { username }
            });
        });
    }
    create(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, email } = userDto;
            const userInDb = yield this.userRepo.findOne({ where: { username } });
            if (userInDb) {
                throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
            }
            const user = yield this.userRepo.create({ username, password, email });
            yield this.userRepo.save(user);
            return mapper_1.toUserDto(user);
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map