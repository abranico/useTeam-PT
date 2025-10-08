import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BoardCreateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'title is required' })
  title: string;
}
