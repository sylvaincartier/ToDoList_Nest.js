import { Controller, Param, Get, Post, Body, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from '@todo/dto/task.dto';
import { TaskListDto } from '@todo/dto/taskList.dto';
import { CreateTaskDto } from '@todo/dto/taskCreate.dto';

@Controller('api/tasks')
export class TaskController {
    constructor(private taskService: TaskService) {}
    
    @Get(':id')
    async findOneTask(@Param('id') id: string): Promise<TaskDto> {
        return await this.taskService.getTask(id);
    }

    @Get('todo/:id')
    async findTaskByTodo(@Param('id') id: string): Promise<TaskListDto> {
        const tasks = await this.taskService.getTaskByTodo(id);
        return { tasks };
    }

    @Post('todo/:id')
    async create(@Param('id') todo: string, @Body() createTaskDto: CreateTaskDto): Promise<TaskDto> {
        return await this.taskService.createTask(todo, createTaskDto);
    }

    @Delete(':id')
    async destroy(@Param('id') id: string): Promise<TaskDto> {
        return await this.taskService.destroyTask(id);
    }

}
