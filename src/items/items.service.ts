import { Injectable } from '@nestjs/common';
import { ItemRepository } from './items.repository.js';
import { CreateItemRequestDto, UpdateItemRequestDto } from './items.dto.js';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async create(items: CreateItemRequestDto) {
    const id = await this.itemRepository.create(items);
    return { id };
  }

  async get(keyword?: string, cursor?: number) {
    const items = await this.itemRepository.get(keyword, cursor);

    const hasMore = items.length > 10;
    const data = items.slice(0, 10);

    const nextCursor = hasMore ? data[data.length - 1].id : null;

    return {
      data,
      pagination: {
        nextCursor,
        hasMore,
      },
    };
  }

  async update(id: number, items: UpdateItemRequestDto) {
    const result = await this.itemRepository.update(id, items);
    return { id: result };
  }

  async delete(id: number) {
    const result = await this.itemRepository.delete(id);
    return { id: result };
  }
}
