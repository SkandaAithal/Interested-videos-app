import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const { name, email, password } = createUserDto;
      const hashedPassword = await this.hashPassword(password);
      const user = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505' && error.detail.includes('email')) {
        return { success: false, message: 'Email address is already in use' };
      } else {
        return { success: false, message: 'Internal server error' };
      }
    }
  }

  async login(loginUserDto: LoginUserDto) {
    if (!loginUserDto || !loginUserDto.email || !loginUserDto.password) {
      throw new BadRequestException('Invalid authentication credentials');
    }
    const { name, email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const jwtPayload = { name };
    const jwtToken = await this.jwtService.signAsync(jwtPayload, {
      expiresIn: '1d',
      algorithm: 'HS512',
    });

    return `Welcome, ${user.name} Login Sucessful \n Token : ${jwtToken}`;
  }
}