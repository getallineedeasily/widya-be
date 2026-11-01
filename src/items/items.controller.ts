import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './items.service.js';
import {
  createItemSchema,
  idSchema,
  querySchema,
  type QuerySchema,
  updateItemSchema,
} from './items.validator.js';
import type {
  CreateItemRequestDto,
  UpdateItemRequestDto,
} from './items.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { ApiOperation } from '@nestjs/swagger';

@Controller('items')
@UseGuards(AuthGuard)
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create item' })
  async create(
    @Body({ schema: createItemSchema }) payload: CreateItemRequestDto,
  ) {
    const result = await this.itemService.create(payload);
    return { message: 'Item created!', data: result };
  }

  @Get()
  @ApiOperation({ summary: 'Get item' })
  async get(@Query({ schema: querySchema }) query: QuerySchema) {
    const { cursor, keyword } = query;
    const result = await this.itemService.get(keyword, cursor);
    return { message: 'Item retrieved!', data: result };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update item' })
  async update(
    @Param('id', { schema: idSchema }) id: number,
    @Body({ schema: updateItemSchema }) payload: UpdateItemRequestDto,
  ) {
    const result = await this.itemService.update(id, payload);
    return { message: 'Item updated!', data: result };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete item' })
  async delete(@Param('id', { schema: idSchema }) id: number) {
    const result = await this.itemService.delete(id);
    return { message: 'Item deleted!', data: result };
  }
}
