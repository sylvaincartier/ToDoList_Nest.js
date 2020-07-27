
import { todos } from 'src/mock/todos.mock';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TodoEntity } from './entity/todo.entity';
import { TodoDto } from './dto/todo.dto';
import { toPromise } from 'src/shared/utils';
import { toTodoDto } from 'src/shared/mapper';
import { TodoCreateDto } from './dto/todoCreate.dto';
import { v4 as uuidV4 } from 'uuid';


@Injectable()export class TodoService {  
    todos: TodoEntity[] = todos;
  
  async getAllTodo(): Promise<TodoDto[]> {
        const todos = await this.todos;
        return todos.map(todo => toTodoDto(todo));
      }

  async getOneTodo(id: string): Promise<TodoDto> {    
      const todo = this.todos.find(todo => todo.id === id);
    if (!todo) {      
        throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);    }
        return toPromise(toTodoDto(todo));  }
  
  async createTodo(todoDto: TodoCreateDto): Promise<TodoDto>{    
    const { name, description } = todoDto;
    const todo: TodoEntity = {      id: uuidV4(),      name,      description,    };
    this.todos.push(todo);
    return toPromise(toTodoDto(todo));  }  
}
