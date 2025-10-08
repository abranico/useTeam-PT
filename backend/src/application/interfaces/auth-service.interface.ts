import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

export interface IAuthService {
  register(registerDto: RegisterDto): Promise<void>;
  login(loginDto: LoginDto): Promise<string>;
}
