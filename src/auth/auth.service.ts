import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/users.repository.js';
import {
  CreateUserRequestDto,
  LoginUserRequestDto,
} from '../users/users.dto.js';
import { BcryptService } from './bcrypt.service.js';
import { UserError } from '../exception/exception.js';
import { JoseService } from './jose.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcrypt: BcryptService,
    private readonly jose: JoseService,
  ) {}

  async create(user: CreateUserRequestDto) {
    const hashed = await this.bcrypt.hash(user.password);
    const payload: CreateUserRequestDto = {
      email: user.email.toLowerCase(),
      name: user.name,
      password: hashed,
    };
    const result = await this.userRepository.create(payload);
    const token = await this.jose.createAccessToken(result);
    return { id: result, token };
  }

  async login({ email, password }: LoginUserRequestDto) {
    const user = await this.userRepository.login(email.toLowerCase());
    const result = await this.bcrypt.check(password, user.password);
    if (!result) {
      throw new UserError();
    }
    const token = await this.jose.createAccessToken(user.id);
    return { id: user.id, token };
  }
}
