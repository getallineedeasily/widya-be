import { Injectable } from '@nestjs/common';
import { Postgre } from '../database/postgre.js';
import {
  CreateItemRequestDto,
  GetItemsResponseDto,
  UpdateItemRequestDto,
} from './items.dto.js';
import { NotFoundError, ServerError } from '../exception/exception.js';

@Injectable()
export class ItemRepository {
  constructor(private readonly postgre: Postgre) {}

  async create(items: CreateItemRequestDto): Promise<number> {
    const result = await this.postgre.pool().query<{ id: number }>(
      `insert into items (name, description, stock, price)
        values ($1, $2, $3, $4)
        returning id`,
      [items.name, items.description, items.stock, items.price],
    );

    if (result.rows.length === 0) {
      throw new ServerError();
    }

    return result.rows[0].id;
  }

  async get(keyword?: string, cursor?: number): Promise<GetItemsResponseDto[]> {
    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (cursor !== undefined) {
      params.push(cursor);
      conditions.push(`id < $${params.length}`);
    }

    if (keyword) {
      params.push(`%${keyword.toLowerCase()}%`);
      conditions.push(`lower(name) like $${params.length}`);
    }

    let query = `
    select id, name, description, stock, price
    from items
  `;

    if (conditions.length > 0) {
      query += ` where ${conditions.join(' and ')}`;
    }

    query += ` order by id desc limit 11`;

    const result = await this.postgre
      .pool()
      .query<GetItemsResponseDto>(query, params);

    return result.rows;
  }

  async update(id: number, items: UpdateItemRequestDto): Promise<number> {
    const result = await this.postgre.pool().query<{ id: number }>(
      `
        update items
        set name=$1, description=$2, stock=$3, price=$4
        where id=$5
        returning id`,
      [items.name, items.description, items.stock, items.price, id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundError();
    }

    return result.rows[0].id;
  }

  async delete(id: number): Promise<number> {
    const result = await this.postgre.pool().query<{ id: number }>(
      `
      delete from items
      where id=$1
      returning id`,
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundError();
    }

    return result.rows[0].id;
  }
}
