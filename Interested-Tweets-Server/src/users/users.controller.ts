import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOkResponse({ description: 'User successfully registered' })
  @ApiBadRequestResponse({
    description: 'Bad request. Please check your input data.',
  })
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const result = await this.usersService.register(createUserDto);
      return res.status(HttpStatus.OK).json({ success: true, data: result });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
    }
  }

  @Post('login')
  @ApiOkResponse({ description: 'User successfully logged in' })
  @ApiBadRequestResponse({
    description: 'Bad request. Please check your input data.',
  })
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const result = await this.usersService.login(loginUserDto);
      return res.status(HttpStatus.OK).json({ success: true, data: result });
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: error.message });
    }
  }
}
