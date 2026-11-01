import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { createUserSchema, loginUserSchema } from '../users/users.validator.js';
import type {
  CreateUserRequestDto,
  LoginUserRequestDto,
} from '../users/users.dto.js';
import type { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register user' })
  async register(
    @Body({ schema: createUserSchema }) payload: CreateUserRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id, token } = await this.authService.create(payload);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1_000,
    });
    return { message: 'Register success!', data: { id } };
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user' })
  async login(
    @Body({ schema: loginUserSchema }) payload: LoginUserRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { id, token } = await this.authService.login(payload);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1_000,
    });
    return { message: 'Login success!', data: { id } };
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOperation({ summary: 'Logout user' })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('token', '', {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 0,
    });
    return { message: 'Logout success!' };
  }
}
