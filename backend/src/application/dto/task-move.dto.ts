import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TaskMoveDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'newColumnId is required' })
  newColumnId: string;
}
