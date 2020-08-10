"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModule = void 0;
const common_1 = require("@nestjs/common");
const todo_controller_1 = require("./todo.controller");
const todo_service_1 = require("./todo.service");
const todo_entity_1 = require("./entity/todo.entity");
const task_entity_1 = require("./entity/task.entity");
const typeorm_1 = require("@nestjs/typeorm");
const task_controller_1 = require("./task/task.controller");
const task_service_1 = require("./task/task.service");
const user_module_1 = require("../users/user.module");
const auth_module_1 = require("../auth/auth.module");
let TodoModule = class TodoModule {
};
TodoModule = __decorate([
    common_1.Module({
        imports: [user_module_1.UserModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([todo_entity_1.TodoEntity, task_entity_1.TaskEntity])],
        controllers: [todo_controller_1.TodoController, task_controller_1.TaskController],
        providers: [todo_service_1.TodoService, task_service_1.TaskService],
    })
], TodoModule);
exports.TodoModule = TodoModule;
//# sourceMappingURL=todo.module.js.map