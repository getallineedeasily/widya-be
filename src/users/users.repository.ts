import { Injectable } from '@nestjs/common';
import { Postgre } from '../database/postgre.js';
import { CreateUserRequestDto } from './users.dto.js';
import {
  NotFoundError,
  ServerError,
  UserError,
} from '../exception/exception.js';

@Injectable()
export class UserRepository {
  constructor(private readonly postgre: Postgre) {}

  async create(user: CreateUserRequestDto): Promise<number> {
    try {
      const result = await this.postgre.pool().query<{ id: number }>(
        `
        insert into users (name, password, email)
        values ($1, $2, lower($3))
        returning id`,
        [user.name, user.password, user.email],
      );

      if (result.rows.length === 0) {
        throw new ServerError();
      }

      return result.rows[0].id;
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new UserError("Can't use this email!");
      }
      throw error;
    }
  }

  async login(email: string) {
    const result = await this.postgre
      .pool()
      .query<{ id: number; email: string; password: string }>(
        `
        select id, email, password
        from users
        where lower(email)=lower($1)`,
        [email],
      );

    if (result.rows.length === 0) {
      throw new NotFoundError();
    }

    return result.rows[0];
  }
}
