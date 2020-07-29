import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Body,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { TodoCreateDto } from './dto/todoCreate.dto';
import { toPromise } from 'src/shared/utils';
import { TodoListDto } from './dto/todoList.dto';
import { TodoService } from './todo.service';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<TodoListDto> {
    const todos = await this.todoService.getAllTodo();
    return toPromise({ todos });
  }

  @Get(':id') async findOne(@Param('id') id: string): Promise<TodoDto> {
    return await this.todoService.getOneTodo(id);
  }


  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() todoCreateDto: TodoCreateDto): Promise<TodoDto> {
    return await this.todoService.createTodo(todoCreateDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() todoDto: TodoDto,
  ): Promise<TodoDto> {
    return await this.todoService.updateTodo(id, todoDto);
  }
}
