import { Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service.js';
import { DatabaseModule } from '../database/database.module.js';
import { UserModule } from '../users/users.module.js';
import { AuthController } from './auth.controller.js';
import { JoseService } from './jose.service.js';
import { AuthService } from './auth.service.js';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AuthController],
  providers: [BcryptService, JoseService, AuthService],
  exports: [BcryptService, JoseService, AuthService],
})
export class AuthModule {}
