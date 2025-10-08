import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';
import { IUserRepository } from 'src/domain/interfaces/iuser.repository';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/domain/entities/user';
import { LoginDto } from '../dto/login.dto';
import { IAuthService } from '../interfaces/auth-service.interface';
import { config } from 'src/config';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly _userRepository: IUserRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const { name, email, password } = registerDto;
    console.log({ password });
    const userExists = await this._userRepository.findByEmail(email);
    if (userExists) throw new ConflictException('Email already exists');
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = hashedPassword;
    await this._userRepository.create(user);
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { email, password } = loginDto;
    const user = await this._userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return this.generateToken(user.id, user.name);
  }

  private generateToken(userId: string, name: string): string {
    return this._jwtService.sign(
      {
        sub: userId,
        name,
      },
      { secret: config.JWT_SECRET },
    );
  }
}
