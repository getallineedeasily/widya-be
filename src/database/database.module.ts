import { Module } from '@nestjs/common';
import { Postgre } from './postgre.js';

@Module({
  providers: [Postgre],
  exports: [Postgre],
})
export class DatabaseModule {}
