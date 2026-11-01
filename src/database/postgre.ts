import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class Postgre implements OnModuleInit, OnModuleDestroy {
  private _pool: Pool;

  onModuleInit() {
    this._pool = new Pool();
  }

  async onModuleDestroy() {
    await this._pool.end();
  }

  pool(): Pool {
    return this._pool;
  }
}
