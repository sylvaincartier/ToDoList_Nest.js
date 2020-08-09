import { todos } from 'src/mock/todos.mock';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TodoEntity } from '@todo/entity/todo.entity';
import { TodoDto } from './dto/todo.dto';
import { toPromise } from 'src/shared/utils';
import { toTodoDto } from 'src/shared/mapper';
import { TodoCreateDto } from './dto/todoCreate.dto';
import { v4 as uuidV4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>,
    private readonly usersService: UsersService
  ) {}

  async getAllTodo(): Promise<TodoDto[]> {
    const todos = await this.todoRepo.find();
    return todos.map(todo => toTodoDto(todo));
  }

  async getOneTodo(id: string): Promise<TodoDto> {
    const todo = await this.todoRepo.findOne({where: { id }});
    if (!todo) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return toTodoDto(todo);
  }

  async createTodo({ username }: UserDto, createTodoDto: TodoCreateDto): Promise<TodoDto> {
    const { name, description } = createTodoDto;

    const owner = await this.usersService.findOne({ where: { username } });
    const todo: TodoEntity = await this.todoRepo.create({ name, description, owner });

    await this.todoRepo.save(todo);

    return toTodoDto(todo);
  }

  async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    let todo: TodoEntity = await this.todoRepo.findOne({ where: { id } });

    if (!todo) {
      throw new HttpException(
        `Todo list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    todo = {
      id,
      name,
      description,
    };

    await this.todoRepo.update({ id }, todo); // update

    todo = await this.todoRepo.findOne({
      where: { id },
      relations: ['tasks', 'owner'],
    }); // re-query

    return toTodoDto(todo);
  }



}
