import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiProperty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
