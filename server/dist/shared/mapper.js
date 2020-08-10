"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserDto = exports.toTaskDto = exports.toTodoDto = void 0;
const todo_dto_1 = require("../todo/dto/todo.dto");
const todo_entity_1 = require("../todo/entity/todo.entity");
const task_entity_1 = require("../todo/entity/task.entity");
const task_dto_1 = require("../todo/dto/task.dto");
const user_entity_1 = require("../users/entity/user.entity");
const user_dto_1 = require("../users/dto/user.dto");
exports.toTodoDto = (data) => {
    const { id, name, description, tasks } = data;
    let todoDto = { id, name, description, tasks };
    if (tasks) {
        todoDto = Object.assign(Object.assign({}, todoDto), { tasks: tasks.map((task) => exports.toTaskDto(task)) });
    }
    return todoDto;
};
exports.toTaskDto = (data) => {
    const { id, name } = data;
    let taskDto = {
        id,
        name,
    };
    return taskDto;
};
exports.toUserDto = (data) => {
    const { id, username, email } = data;
    let userDto = { id, username, email };
    return userDto;
};
//# sourceMappingURL=mapper.js.map