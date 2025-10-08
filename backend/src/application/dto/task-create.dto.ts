import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TaskCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'title is required' })
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'columnId is required' })
  columnId: string;
  @ApiProperty()
  assignedToId: string;
}
