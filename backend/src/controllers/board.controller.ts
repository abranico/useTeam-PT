import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/services/auth/jwt-auth.guard';
import { IBoardService } from 'src/application/interfaces/board-service.interface';
import { BoardCreateDto } from 'src/application/dto/board-create.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardController {
  constructor(
    @Inject('IBoardService')
    private readonly _boardService: IBoardService,
  ) {}

  @Post()
  async createBoard(@Body() dto: BoardCreateDto, @Request() req) {
    const user = req.user;
    const board = await this._boardService.create(dto.title, user.id);
    return board;
  }

  @Get()
  async getBoards(@Request() req) {
    const userId = req.user.id;
    return await this._boardService.getBoardsByUser(userId);
  }

  @Get(':id')
  async getBoardById(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    const board = await this._boardService.getBoardById(id);

    const isOwner = board.owner.id === userId;
    const isCollaborator = board.collaborators.some((c) => c.id === userId);

    if (!isOwner && !isCollaborator) {
      throw new ForbiddenException('You do not have access to this board');
    }

    return board;
  }

  @Post(':id/collaborators/:userId')
  async addCollaborator(
    @Param('id') boardId: string,
    @Param('userId') userId: string,
    @Request() req,
  ) {
    const requesterId = req.user.id;
    await this._boardService.addCollaborator(requesterId, boardId, userId);
  }
}
