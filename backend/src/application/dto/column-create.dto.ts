import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ColumnCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'title is required' })
  title: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'title is required' })
  boardId: string;
}
