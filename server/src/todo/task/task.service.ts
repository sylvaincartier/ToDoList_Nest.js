import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '@todo/entity/task.entity';
import { Repository } from 'typeorm';
import { TodoEntity } from '@todo/entity/todo.entity';
import { TaskDto } from '@todo/dto/task.dto';
import { toTaskDto } from '@shared/mapper';
import { CreateTaskDto } from '@todo/dto/taskCreate.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepo: Repository<TaskEntity>,
        @InjectRepository(TodoEntity)
        private readonly todoRepo: Repository<TodoEntity>        
    ){}

    async getTask(id: string): Promise<TaskDto> {
        const task: TaskEntity = await this.taskRepo.findOne({where: { id }}); 

        if(!task) {
            throw new HttpException(`Task doesn't exist`, HttpStatus.BAD_REQUEST);
        }

        return toTaskDto(task);
    }

    async getTaskByTodo(id: string): Promise<TaskDto[]> {
        const tasks: TaskEntity[] = await this.taskRepo.find({
            where: { todo : { id }},
            relations: ['todo']
        });

        return tasks.map(task => toTaskDto(task));
    }

    async createTask(todoId: string, taskDto: CreateTaskDto): Promise<TaskDto> {
        const { name } = taskDto;

        const todo: TodoEntity = await this.todoRepo.findOne({
            where: { id: todoId },
            relations: ['tasks']
        });

        const task: TaskEntity = await this.taskRepo.create({ name, todo });

        await this.taskRepo.save(task);

        return toTaskDto(task);
    }
    
    async destroyTask(id: string): Promise<TaskDto> {
        const task: TaskEntity = await this.taskRepo.findOne({ where: { id }});

        if(!task) {
            throw new HttpException(`Task doesn't exist`, HttpStatus.BAD_REQUEST);
        }

        await this.taskRepo.delete({id});
        return toTaskDto(task);
    }
    

}
