import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Get('health')
  health() {
    return { module: 'users', ok: true };
  }
}
