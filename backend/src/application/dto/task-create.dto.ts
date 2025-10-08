import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class TaskCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'columnId is required' })
  columnId: string;

  @ApiProperty()
  @IsOptional()
  assignedToId?: string;
}
