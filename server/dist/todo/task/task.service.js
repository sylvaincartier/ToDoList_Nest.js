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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("../entity/task.entity");
const typeorm_2 = require("typeorm");
const todo_entity_1 = require("../entity/todo.entity");
const task_dto_1 = require("../dto/task.dto");
const mapper_1 = require("../../shared/mapper");
const taskCreate_dto_1 = require("../dto/taskCreate.dto");
let TaskService = class TaskService {
    constructor(taskRepo, todoRepo) {
        this.taskRepo = taskRepo;
        this.todoRepo = todoRepo;
    }
    getTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepo.findOne({ where: { id } });
            if (!task) {
                throw new common_1.HttpException(`Task doesn't exist`, common_1.HttpStatus.BAD_REQUEST);
            }
            return mapper_1.toTaskDto(task);
        });
    }
    getTaskByTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.taskRepo.find({
                where: { todo: { id } },
                relations: ['todo']
            });
            return tasks.map(task => mapper_1.toTaskDto(task));
        });
    }
    createTask(todoId, taskDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = taskDto;
            const todo = yield this.todoRepo.findOne({
                where: { id: todoId },
                relations: ['tasks']
            });
            const task = yield this.taskRepo.create({ name, todo });
            yield this.taskRepo.save(task);
            return mapper_1.toTaskDto(task);
        });
    }
    destroyTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskRepo.findOne({ where: { id } });
            if (!task) {
                throw new common_1.HttpException(`Task doesn't exist`, common_1.HttpStatus.BAD_REQUEST);
            }
            yield this.taskRepo.delete({ id });
            return mapper_1.toTaskDto(task);
        });
    }
};
TaskService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(task_entity_1.TaskEntity)),
    __param(1, typeorm_1.InjectRepository(todo_entity_1.TodoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map