import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JoseService } from './jose.service.js';
import {
  AuthenticationError,
  AuthorizationError,
} from '../exception/exception.js';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jose: JoseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = (request.cookies as Record<string, string>)?.token;

    if (!token) {
      throw new AuthenticationError();
    }

    const result = await this.jose.verifyAccessToken(token);

    if (!result.isValid) {
      throw new AuthorizationError();
    }

    return result.isValid;
  }
}
