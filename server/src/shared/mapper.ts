import { TodoDto } from "src/todo/dto/todo.dto";
import { TodoEntity } from "@todo/entity/todo.entity";
import { TaskEntity } from "@todo/entity/task.entity";
import { TaskDto } from "@todo/dto/task.dto";
import { UserEntity } from "src/users/entity/user.entity";
import { UserDto } from "src/users/dto/user.dto";

export const toTodoDto = (data: TodoEntity): TodoDto => {
    const { id, name, description, tasks } = data;
    let todoDto: TodoDto = { id, name, description, tasks };

    if(tasks) {
        todoDto = {
            ...todoDto, tasks: tasks.map((task: TaskEntity) => toTaskDto(task))
        }
    }


    return todoDto;
}

export const toTaskDto = (data: TaskEntity): TaskDto => {
    const { id, name } = data;
  
    let taskDto: TaskDto = {
      id,
      name,
    };
  
    return taskDto;
  };

export const toUserDto = (data: UserEntity): UserDto => {
    const { id, username, email } = data;
    let userDto = { id, username, email };
    return userDto;
}