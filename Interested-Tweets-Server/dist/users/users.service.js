"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
    async register(createUserDto) {
        try {
            const { name, email, password } = createUserDto;
            const hashedPassword = await this.hashPassword(password);
            const user = this.userRepository.create({
                name,
                email,
                password: hashedPassword,
            });
            return await this.userRepository.save(user);
        }
        catch (error) {
            if (error.code === '23505' && error.detail.includes('email')) {
                return { success: false, message: 'Email address is already in use' };
            }
            else {
                return { success: false, message: 'Internal server error' };
            }
        }
    }
    async login(loginUserDto) {
        if (!loginUserDto || !loginUserDto.email || !loginUserDto.password) {
            throw new common_1.BadRequestException('Invalid authentication credentials');
        }
        const { name, email, password } = loginUserDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const jwtPayload = { name };
        const jwtToken = await this.jwtService.signAsync(jwtPayload, {
            expiresIn: '1d',
            algorithm: 'HS512',
        });
        return `Welcome, ${user.name} Login Sucessful \n Token : ${jwtToken}`;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map