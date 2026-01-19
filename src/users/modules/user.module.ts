import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from '../controller/user.controller';
@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
