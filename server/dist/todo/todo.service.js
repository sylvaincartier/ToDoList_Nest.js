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
exports.TodoService = void 0;
const todos_mock_1 = require("../mock/todos.mock");
const common_1 = require("@nestjs/common");
const todo_entity_1 = require("./entity/todo.entity");
const mapper_1 = require("../shared/mapper");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_dto_1 = require("../users/dto/user.dto");
const users_service_1 = require("../users/users.service");
let TodoService = class TodoService {
    constructor(todoRepo, usersService) {
        this.todoRepo = todoRepo;
        this.usersService = usersService;
    }
    getAllTodo() {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield this.todoRepo.find();
            return todos.map(todo => mapper_1.toTodoDto(todo));
        });
    }
    getOneTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.todoRepo.findOne({ where: { id } });
            if (!todo) {
                throw new common_1.HttpException(`Todo item doesn't exist`, common_1.HttpStatus.BAD_REQUEST);
            }
            return mapper_1.toTodoDto(todo);
        });
    }
    createTodo({ username }, createTodoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description } = createTodoDto;
            const owner = yield this.usersService.findOne({ where: { username } });
            const todo = yield this.todoRepo.create({ name, description, owner });
            yield this.todoRepo.save(todo);
            return mapper_1.toTodoDto(todo);
        });
    }
    updateTodo(id, todoDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description } = todoDto;
            let todo = yield this.todoRepo.findOne({ where: { id } });
            if (!todo) {
                throw new common_1.HttpException(`Todo list doesn't exist`, common_1.HttpStatus.BAD_REQUEST);
            }
            todo = {
                id,
                name,
                description,
            };
            yield this.todoRepo.update({ id }, todo);
            todo = yield this.todoRepo.findOne({
                where: { id },
                relations: ['tasks', 'owner'],
            });
            return mapper_1.toTodoDto(todo);
        });
    }
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.todoRepo.findOne({
                where: { id },
                relations: ['tasks', 'owner'],
            });
            if (!todo) {
                throw new common_1.HttpException(`Todo list doesn't exist`, common_1.HttpStatus.BAD_REQUEST);
            }
            if (todo.tasks && todo.tasks.length > 0) {
                throw new common_1.HttpException(`Cannot delete this Todo list, it has existing tasks`, common_1.HttpStatus.FORBIDDEN);
            }
            yield this.todoRepo.delete({ id });
            return mapper_1.toTodoDto(todo);
        });
    }
};
TodoService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(todo_entity_1.TodoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map