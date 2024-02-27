import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    private hashPassword;
    register(createUserDto: CreateUserDto): Promise<User | {
        success: boolean;
        message: string;
    }>;
    login(loginUserDto: LoginUserDto): Promise<string>;
}
