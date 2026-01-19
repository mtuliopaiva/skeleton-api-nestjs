import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { AuthLoginHandler } from '../domain/commands/login.handler';

import { PrismaModule } from '../../core/database/prisma.module';
import { RegisterHandler } from '../domain/commands/register.handler';

@Module({
  imports: [CqrsModule, PassportModule, JwtModule.register({}), PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, AuthLoginHandler, RegisterHandler],
})
export class AuthModule {}
