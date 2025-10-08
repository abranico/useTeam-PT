import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ColumnCreateDto } from 'src/application/dto/column-create.dto';
import { IColumnService } from 'src/application/interfaces/column-service.interface';
import { Column } from 'src/domain/entities/column';
import { JwtAuthGuard } from 'src/infrastructure/services/auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnController {
  constructor(
    @Inject('IColumnService')
    private readonly _columnService: IColumnService,
  ) {}

  @Post()
  async create(@Body() dto: ColumnCreateDto): Promise<void> {
    await this._columnService.create(dto.title, dto.boardId);
  }

  @Get('board/:boardId')
  async getByBoard(@Param('boardId') boardId: string): Promise<Column[]> {
    return this._columnService.getByBoard(boardId);
  }
}
