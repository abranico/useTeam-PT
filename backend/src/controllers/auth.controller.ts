import { Controller, Post, Body, Inject, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from 'src/application/dto/login.dto';
import { RegisterDto } from 'src/application/dto/register.dto';
import { UserPayload } from 'src/application/dto/user-payload.dto';
import { IAuthService } from 'src/application/interfaces/auth-service.interface';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/infrastructure/services/auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly _authService: IAuthService,
  ) {}

  @ApiBearerAuth()
  @Get('ping')
  @UseGuards(JwtAuthGuard)
  ping(@User() user: UserPayload) {
    return user;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this._authService.register(registerDto);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this._authService.login(loginDto);
  }
}
