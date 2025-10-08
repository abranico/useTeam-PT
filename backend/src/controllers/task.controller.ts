import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TaskCreateDto } from 'src/application/dto/task-create.dto';
import { TaskMoveDto } from 'src/application/dto/task-move.dto';
import { ITaskService } from 'src/application/interfaces/task-service.interface';
import { Task } from 'src/domain/entities/task';
import { JwtAuthGuard } from 'src/infrastructure/services/auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(
    @Inject('ITaskService')
    private readonly _taskService: ITaskService,
  ) {}

  @Post()
  async create(@Body() dto: TaskCreateDto): Promise<Task> {
    return await this._taskService.create(
      dto.title,
      dto.columnId,
      dto.description,
      dto.assignedToId,
    );
  }

  @Get('column/:columnId')
  async getByColumn(@Param('columnId') columnId: string): Promise<Task[]> {
    return this._taskService.getByColumn(columnId);
  }

  @Patch(':id/move')
  async moveTask(
    @Param('id') taskId: string,
    @Body() dto: TaskMoveDto,
  ): Promise<void> {
    await this._taskService.moveTask(taskId, dto.newColumnId);
  }
}
