import { Module } from '@nestjs/common';
import { ItemService } from './items.service.js';
import { ItemRepository } from './items.repository.js';
import { DatabaseModule } from '../database/database.module.js';
import { ItemController } from './items.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
  exports: [ItemService, ItemRepository],
})
export class ItemModule {}
