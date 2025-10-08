import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { LoginDto } from 'src/application/dto/login.dto';
import { RegisterDto } from 'src/application/dto/register.dto';
import { IAuthService } from 'src/application/interfaces/auth-service.interface';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly _authService: IAuthService,
  ) {}

  @Get('ping')
  ping() {
    return 'pong';
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
